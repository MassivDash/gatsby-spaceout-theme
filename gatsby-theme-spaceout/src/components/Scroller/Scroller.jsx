import React, { useCallback, useMemo, useState, useContext } from "react";
import ReactScrollbarsCustom, {
    ScrollbarContext
  } from 'react-scrollbars-custom';

export function ScrollManager({ ...props }) {
  const [isScrolling, setIsScrolling] = useState(false);
  const [isMouseOver, setIsMouseOver] = useState(false);
  const isShow = isScrolling || isMouseOver;
  const isDark = props.isDark

  const onScrollStart = useCallback(() => {
    setIsScrolling(true);
  }, []);
  const onScrollStop = useCallback(() => {
    setIsScrolling(false);
  }, []);
  const onMouseEnter = useCallback(() => {
    setIsMouseOver(true);
  }, []);
  const onMouseLeave = useCallback(() => {
    setIsMouseOver(false);
  }, []);

  const trackProps = useMemo(() => ({
    renderer: ({ elementRef, style, ...restProps }) => (
      <span
        {...restProps}
        ref={elementRef}
        style={{ ...style, opacity: isShow ? 1 : 0, transition: "opacity 0.4s ease-in-out", }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />
    )
  }), [isShow, onMouseEnter, onMouseLeave]);

  const thumbYProps = useMemo(() => ({
    renderer: ({ elementRef, style, ...restProps }) => (
      <span
        {...restProps}
        ref={elementRef}
        style={{ ...style,
            position: "absolute",
            touchAction: "none",
            cursor: "pointer",
            borderRadius: "4px",
            background: isDark ? "rgb(250, 250, 250)" : "rgba(124, 124, 124, 0.5)",
            width: "100%",
            opacity: isShow ? 1 : 0, transition: "opacity 0.4s ease-in-out", }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />
    )
  }), [isShow, onMouseEnter, onMouseLeave]);

  const trackYProps = useMemo(() => ({
    renderer: ({ elementRef, style, ...restProps }) => (
      <span
        {...restProps}
        ref={elementRef}
        style={{ ...style, position: "absolute",
            overflow: "hidden",
            borderRadius: "4px",
            background: isDark ? "rgb(17, 18, 22)" : "rgb(250, 250, 250)",
            userSelect: "none",
            width: "6px",
            height: "calc(100% - 20px)",
            top: "10px",
            right: "0px",
            opacity: isShow ? 1 : 0, transition: "opacity 0.4s ease-in-out", }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />
    )
  }), [isShow, onMouseEnter, onMouseLeave]);

  return (
    <ReactScrollbarsCustom
      {...props}
      wrapperProps={{
        renderer: ({ elementRef, style, ...restProps }) => (
          <div {...restProps} ref={elementRef} 
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          style={{ ...style, right: 0 }} />
        ),
      }}
      createContext={true}
      trackXProps={trackProps}
      trackYProps={trackYProps}
      thumbYProps={thumbYProps}
      onScrollStart={onScrollStart}
      onScrollStop={onScrollStop}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      scrollDetectionThreshold={500} // ms
    >
      {props.children}
    </ReactScrollbarsCustom>
  );
}

export const useScrollManager = () => {
    return useContext(ScrollbarContext).parentScrollbar;
  };

export default ScrollManager;