import { ScrollerConfig } from './types';

/**
 * @author Albin Eriksson https://github.com/kezoponk
 * @license MIT https://opensource.org/licenses/MIT
 */
class Scroller {
  private config: ScrollerConfig;
  private targetElement: HTMLElement;
  private initialMovingPart: HTMLDivElement;
  private movingPart?: HTMLDivElement;
  private nextAnimationResetTimeout?: number;
  private targetResizeObserver: ResizeObserver;
  private prevTargetWidthPx: number;

  private resetAnimation() {
    if (!this.movingPart) {
      return;
    }

    const { children: movingPartChildren } = this.movingPart;

    if (this.config.direction === 'left') {
      const elementOutsideView = movingPartChildren[0];
      this.movingPart.appendChild(elementOutsideView.cloneNode(true));
      this.movingPart.removeChild(elementOutsideView);

    } else {
      const elementOutsideView = movingPartChildren[movingPartChildren.length - 1];
      this.movingPart.prepend(elementOutsideView.cloneNode(true));
      this.movingPart.removeChild(elementOutsideView);
    }

    this.makeAnimation();
  }

  private makeAnimation (startValue?: number) {
    if (!this.movingPart) {
      return;
    }

    const { offsetWidth: firstElementWidth } = this.movingPart.children[0] as HTMLElement;

    const startPx = startValue ?? (this.config.direction === 'left' ? 0 : 0 - firstElementWidth);
    const endPx = this.config.direction === 'left' ? 0 - firstElementWidth : 0;

    // Use left instead of translateX to make pause posssible
    this.movingPart.style.left = `${startPx}px`;
    this.movingPart.style.transition = 'none';

    const animationDuration = 1000 * Math.abs(endPx - startPx) / this.config.speed;
    
    this.callAfterDomUpdate(() => {
      if (!this.movingPart) {
        return;
      }
      
      this.movingPart.style.left = `${endPx}px`;
      this.movingPart.style.transition = `left ${animationDuration}ms ${this.config.animation}`;

      // When animation is finished: move element to the end of the line (which end depends on direction) & reset animation
      this.nextAnimationResetTimeout = window.setTimeout(
        () => this.resetAnimation(), 
        animationDuration + this.config.delayBetweenAnimationsMS
      );
    });
  }
  
  public pause() {
    clearTimeout(this.nextAnimationResetTimeout);
    
    if (!this.config.finishAnimationBeforePause && this.movingPart) {
      this.movingPart.style.left = `${this.movingPart.offsetLeft}px`;
      this.movingPart.style.transition = 'none';
    }
  }
    
  public unpause() {
    const startPx = this.movingPart?.offsetLeft;
    this.makeAnimation(startPx);
  }

  /**
   * Restore target element to state before scroller 
   * Can't be started again once restored without creating a new instance
   */
  public restore() {
    clearTimeout(this.nextAnimationResetTimeout);
    this.targetResizeObserver.disconnect();

    Object.values(this.initialMovingPart.children).forEach(
      (item) => this.targetElement.appendChild(item)
    );

    if (this.movingPart) {
      this.targetElement.removeChild(this.movingPart);
    }
  }

  private init(initialTotalWidthPx: number, largestElementPx: number) {
    if (this.movingPart) {
      clearTimeout(this.nextAnimationResetTimeout);
      this.targetElement.removeChild(this.movingPart);
    }

    this.movingPart = this.initialMovingPart.cloneNode(true) as HTMLDivElement;
    this.movingPart.style.cssText = 'left:unset;transition:none;position:relative;white-space:nowrap';

    this.targetElement.appendChild(this.movingPart);

    /**
     * If the total width of all items in movingPart div is less than parent div
     * then append clones of items until div is filled
     */
    let elementsTotalWidthPx = initialTotalWidthPx;
    for (
      let index = 0; 
      elementsTotalWidthPx <= this.targetElement.offsetWidth + largestElementPx; 
      index++
    ) {
      const element = this.movingPart.children[index] as HTMLElement;

      const clone = element.cloneNode(true);
      this.movingPart.appendChild(clone);

      elementsTotalWidthPx += element.offsetWidth;
    }

    this.callAfterDomUpdate(() => this.makeAnimation());
  }

  constructor(target: HTMLElement, config: { [key in keyof ScrollerConfig]?: ScrollerConfig[key] }) {
    if (!target.children.length) {
      throw new Error('Target element empty');
    }

    this.targetElement = target;
    this.targetElement.style.overflow = 'hidden';

    this.config = {
      direction: 'left',
      animation: 'linear',
      delayBetweenAnimationsMS: 0,
      speed: 20,
      finishAnimationBeforePause: false,
      ...config
    }

    /**
     * Move elements from target element to initialMovingPart & get initialTotalWidthPx and largestElementPx
     * used when initalizing to calculate how many elements are required to fill target element width
     */
    this.initialMovingPart = document.createElement('div');
    let initialTotalWidthPx = 0, largestElementPx = 0;
    Object.values(this.targetElement.children).forEach((element) => {
      const { offsetWidth: currentElementWidthPx } = element as HTMLElement;
      
      if (currentElementWidthPx > largestElementPx) {
        largestElementPx = currentElementWidthPx;
      }

      const clone = element.cloneNode(true);
      this.initialMovingPart.appendChild(clone);
      this.targetElement.removeChild(element);
      
      initialTotalWidthPx += currentElementWidthPx;
    });

    this.callAfterDomUpdate(() => this.init(initialTotalWidthPx, largestElementPx));

    // Re-initalize on target element *width* change
    this.prevTargetWidthPx = this.targetElement.offsetWidth;
    let resizeThrottleTimeout: number;
    this.targetResizeObserver = new ResizeObserver(() => {
      const { offsetWidth: targetWidthPx } = this.targetElement;

      if (this.prevTargetWidthPx !== targetWidthPx) {
        this.prevTargetWidthPx = targetWidthPx;

        clearTimeout(resizeThrottleTimeout);

        resizeThrottleTimeout = window.setTimeout(
          () => this.init(initialTotalWidthPx, largestElementPx)
          , 250
        );
      }
    });
    this.targetResizeObserver.observe(this.targetElement);

    // Pause movement when mouse is over
    this.targetElement.addEventListener('mouseover', 
      () => this.pause()
    );
    this.targetElement.addEventListener('mouseleave', 
      () => this.unpause()
    );
  }

  private callAfterDomUpdate(fn: FrameRequestCallback) {
    const intermediate = () => window.requestAnimationFrame(fn);
    window.requestAnimationFrame(intermediate)
  }
}

export default Scroller;