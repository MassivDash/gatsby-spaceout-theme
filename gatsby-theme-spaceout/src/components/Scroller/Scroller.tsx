import React, {
  useCallback,
  useMemo,
  useState,
  useContext,
  useRef,
  useEffect,
} from 'react';
import ReactScrollbarsCustom, {ScrollbarContext} from 'react-scrollbars-custom';
import styled from '@emotion/styled';

import mediaqueries from '@styles/media';

interface Props {
  isDark?: boolean;
  sideMenu?: boolean;
  children?: any;
  style?: any;
}

export const ScrollManager = React.forwardRef((props: Props, ref: any) => {
  const [isScrolling, setIsScrolling] = useState(false);
  const [isMouseOver, setIsMouseOver] = useState(false);
  const isShow = isScrolling || isMouseOver;
  const infoScreenRef = useRef(null);

  const {isDark, sideMenu, children, ...rest} = props;

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

  useEffect(() => {
    if (!sideMenu) {
      infoScreenRef && infoScreenRef.current && infoScreenRef.current.focus();
    }
  }, [sideMenu, isShow, onMouseEnter, onMouseLeave, isDark]);

  const trackProps = useMemo(
    () => ({
      renderer: ({elementRef, style, ...restProps}) => (
        <span
          {...restProps}
          ref={elementRef}
          style={{
            ...style,
            opacity: isShow ? 1 : 0,
            transition:
              'opacity 0.25s var(--ease-in-out-quad),color 0.25s var(--ease-in-out-quad)',
          }}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        />
      ),
    }),
    [isShow, onMouseEnter, onMouseLeave],
  );

  const thumbYProps = useMemo(
    () => ({
      renderer: ({elementRef, style, ...restProps}) => (
        <span
          {...restProps}
          ref={elementRef}
          style={{
            ...style,
            position: 'absolute',
            touchAction: 'none',
            cursor: 'pointer',
            borderRadius: '4px',
            background: isDark
              ? 'rgb(250, 250, 250)'
              : 'rgba(124, 124, 124, 0.5)',
            width: '100%',
            opacity: isShow ? 1 : 0,
            transition:
              'opacity 0.25s var(--ease-in-out-quad),color 0.25s var(--ease-in-out-quad)',
          }}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        />
      ),
    }),
    [isShow, onMouseEnter, onMouseLeave, isDark],
  );

  const trackYProps = useMemo(
    () => ({
      renderer: ({elementRef, style, ...restProps}) => (
        <span
          {...restProps}
          ref={elementRef}
          style={{
            ...style,
            position: 'absolute',
            overflow: 'hidden',
            borderRadius: '4px',
            background: isDark ? 'rgb(17, 18, 22)' : 'rgb(250, 250, 250)',
            userSelect: 'none',
            width: '6px',
            height: 'calc(100% - 20px)',
            top: '10px',
            right: '0px',
            opacity: isShow ? 1 : 0,
            transition:
              'opacity 0.25s var(--ease-in-out-quad),color 0.25s var(--ease-in-out-quad)',
          }}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        />
      ),
    }),
    [isShow, onMouseEnter, onMouseLeave, isDark],
  );

  return (
    <ReactScrollbarsCustom
      style={{minHeight: '100vh'}}
      ref={ref}
      {...rest}
      noScrollX={true}
      createContext={true}
      trackXProps={trackProps as any}
      trackYProps={trackYProps as any}
      thumbYProps={thumbYProps as any}
      onScrollStart={onScrollStart}
      onScrollStop={onScrollStop}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      scrollDetectionThreshold={500} // ms
    >
      <TabIndex tabIndex={0} ref={infoScreenRef}>
        {children}
      </TabIndex>
    </ReactScrollbarsCustom>
  );
});

const TabIndex = styled.div`
  outline: none;
  margin-top: 0px;

  ${mediaqueries.desktop`margin-top: -30px`}
`;

export function useScrollManager() {
  return useContext(ScrollbarContext).parentScrollbar;
}

export default ScrollManager;
