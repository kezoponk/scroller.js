/**
 * @author Albin Eriksson https://github.com/kezoponk
 * @license MIT https://opensource.org/licenses/MIT
 */
class Scroller {
    resetAnimation() {
        if (!this.movingPart) {
            return;
        }
        const { children: movingPartChildren } = this.movingPart;
        if (this.options.direction === 'left') {
            const elementOutsideView = movingPartChildren[0];
            this.movingPart.appendChild(elementOutsideView.cloneNode(true));
            this.movingPart.removeChild(elementOutsideView);
        }
        else {
            const elementOutsideView = movingPartChildren[movingPartChildren.length - 1];
            this.movingPart.prepend(elementOutsideView.cloneNode(true));
            this.movingPart.removeChild(elementOutsideView);
        }
        this.makeAnimation();
    }
    makeAnimation(startValue) {
        if (!this.movingPart) {
            return;
        }
        const { offsetWidth: firstElementWidth } = this.movingPart.children[0];
        const startPx = startValue !== null && startValue !== void 0 ? startValue : (this.options.direction === 'left' ? 0 : 0 - firstElementWidth);
        const endPx = this.options.direction === 'left' ? 0 - firstElementWidth : 0;
        this.movingPart.style.left = `${startPx}px`;
        this.movingPart.style.transition = 'none';
        const animationDuration = 1000 * Math.abs(endPx - startPx) / this.options.speed;
        this.callAfterDomUpdate(() => {
            if (!this.movingPart) {
                return;
            }
            this.movingPart.style.left = `${endPx}px`;
            this.movingPart.style.transition = `left ${animationDuration}ms ${this.options.animation}`;
            // When animation is finished: move element to the end of the line (which end depends on direction) & reset animation
            this.nextAnimationResetTimeout = window.setTimeout(() => this.resetAnimation(), animationDuration + this.options.delayBetweenAnimationsMS);
        });
    }
    pause() {
        clearTimeout(this.nextAnimationResetTimeout);
        if (!this.options.finishAnimationBeforePause && this.movingPart) {
            this.movingPart.style.left = `${this.movingPart.offsetLeft}px`;
            this.movingPart.style.transition = 'none';
        }
    }
    unpause() {
        var _a;
        const startPx = (_a = this.movingPart) === null || _a === void 0 ? void 0 : _a.offsetLeft;
        this.makeAnimation(startPx);
    }
    /**
     * Restore target element to state before scroller
     * Can't be started again once restored without creating a new instance
     */
    restore() {
        clearTimeout(this.nextAnimationResetTimeout);
        this.targetResizeObserver.disconnect();
        Object.values(this.initialMovingPart.children).forEach((item) => this.targetElement.appendChild(item));
        if (this.movingPart) {
            this.targetElement.removeChild(this.movingPart);
        }
    }
    init(initialTotalWidthPx, largestElementPx) {
        if (this.movingPart) {
            clearTimeout(this.nextAnimationResetTimeout);
            this.targetElement.removeChild(this.movingPart);
        }
        this.movingPart = this.initialMovingPart.cloneNode(true);
        this.movingPart.style.cssText = 'left:unset;transition:none;position:relative;white-space:nowrap';
        this.targetElement.appendChild(this.movingPart);
        /**
         * If the total width of all items in movingPart div is less than parent div
         * then append clones of items until div is filled
         */
        let elementsTotalWidthPx = initialTotalWidthPx;
        for (let index = 0; elementsTotalWidthPx <= this.targetElement.offsetWidth + largestElementPx; index++) {
            const element = this.movingPart.children[index];
            const clone = element.cloneNode(true);
            this.movingPart.appendChild(clone);
            elementsTotalWidthPx += element.offsetWidth;
        }
        this.callAfterDomUpdate(() => this.makeAnimation());
    }
    constructor(target, options) {
        if (!target.children.length) {
            throw new Error('Target element empty');
        }
        this.targetElement = target;
        this.targetElement.style.overflow = 'hidden';
        this.options = Object.assign({ direction: 'left', animation: 'linear', delayBetweenAnimationsMS: 0, speed: 20, finishAnimationBeforePause: false }, options);
        /**
         * Move elements from target element to initialMovingPart & get initialTotalWidthPx and largestElementPx
         * used when initalizing to calculate how many elements are required to fill target element width
         */
        this.initialMovingPart = document.createElement('div');
        let initialTotalWidthPx = 0, largestElementPx = 0;
        Object.values(this.targetElement.children).forEach((element) => {
            const { offsetWidth: currentElementWidthPx } = element;
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
        let resizeThrottleTimeout;
        this.targetResizeObserver = new ResizeObserver(() => {
            const { offsetWidth: targetWidthPx } = this.targetElement;
            if (this.prevTargetWidthPx !== targetWidthPx) {
                this.prevTargetWidthPx = targetWidthPx;
                clearTimeout(resizeThrottleTimeout);
                resizeThrottleTimeout = window.setTimeout(() => this.init(initialTotalWidthPx, largestElementPx), 250);
            }
        });
        this.targetResizeObserver.observe(this.targetElement);
        // Pause movement when mouse is over
        this.targetElement.addEventListener('mouseover', () => this.pause());
        this.targetElement.addEventListener('mouseleave', () => this.unpause());
    }
    callAfterDomUpdate(fn) {
        const intermediate = () => window.requestAnimationFrame(fn);
        window.requestAnimationFrame(intermediate);
    }
}
export default Scroller;
