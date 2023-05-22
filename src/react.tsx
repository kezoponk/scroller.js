import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import { ScrollerHandle, ScrollerProps } from './types';
import Scroller from './scroller';

const ScrollerComponent = React.forwardRef<
  ScrollerHandle, 
  ScrollerProps
>(
  ({ children, ...config }, forwardedRef) => {
    const [scrollerInstance, setScrollerInstance] = useState<Scroller>();

    const ref = useRef<HTMLDivElement>(null);

    useImperativeHandle(forwardedRef, () => ({
      ...scrollerInstance,
      container: ref.current,
    }));

    useEffect(() => {
      if (ref.current) {
        const scroller = new Scroller(ref.current, config);
        setScrollerInstance(scroller);
      }
    }, [ref]);

    useEffect(() => {
      scrollerInstance?.restore();
      if (ref.current) {
        const newScroller = new Scroller(ref.current, config);
        setScrollerInstance(newScroller);
      }
    }, [config, children]);

    return (
      <div ref={ref}> 
        {children}
      </div>
    )
  }
);

export default ScrollerComponent;
