/**
 * @author Albin Eriksson https://github.com/kezoponk
 * @license MIT https://opensource.org/licenses/MIT
 */
interface Options {
    speed: number;
    direction: 'left' | 'right';
    animation: string;
    delayBetweenAnimationsMS: number;
    finishAnimationBeforePause: boolean;
}
declare class Scroller {
    private options;
    private targetElement;
    private initialMovingPart;
    private movingPart?;
    private nextAnimationResetTimeout?;
    private targetResizeObserver;
    private prevTargetWidthPx;
    private resetAnimation;
    private makeAnimation;
    pause(): void;
    unpause(): void;
    /**
     * Restore target element to state before scroller
     * Can't be started again once restored without creating a new instance
     */
    restore(): void;
    private init;
    constructor(target: HTMLElement, options: {
        [key in keyof Options]?: Options[key];
    });
    private callAfterDomUpdate;
}
export default Scroller;
