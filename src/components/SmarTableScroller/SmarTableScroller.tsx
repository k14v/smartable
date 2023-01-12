// Core
import React, {
  useRef,
  createContext,
  useMemo,
  useContext,
  useEffect,
  useState,
} from 'react';
// Utils
import raft from 'raf-throttle';
// Theming
import styled from 'styled-components';


export type DataTableScrollerOrientation = 'horizontal' | 'vertical';

export type DataTableScrollerMetadata = {
  x: number;
  y: number;
}

export type DataTableScrollerContextType = {
  orientation?: DataTableScrollerOrientation;
  parent: DataTableScrollerContextType | null;
  useSubscription: () => DataTableScrollerMetadata | null
}

export const DataTableScrollerContext = createContext<DataTableScrollerContextType | null>(null);

/**
 * Consumes the closest context scroller context by orientation if defined
 * @returns 
 */
export const useDataTableScroller = ({
  skip,
  orientation,
}: {
  skip: boolean;
  orientation?: DataTableScrollerOrientation
}) => {
  const ctx = useContext(DataTableScrollerContext);

  if (!ctx && !skip) {
    throw new Error('Missing scrolling context');
  }

  const targetCtx = useMemo(() => {
    let target = ctx
    for (; ;) {
      if (target === null) {
        return null
      }

      if (!orientation || target?.orientation === orientation) {
        return target;
      }
      target = target.parent;

    }
  }, [ctx, orientation]);


  return useMemo(() => ({
    orientation: targetCtx?.orientation,
    parent: targetCtx?.parent,
    useSubscription: targetCtx?.useSubscription ?? (() => null)
  }), [targetCtx]);
}

/**
 * Creates a useSubscription hook base on the containerRef
 */
export const bindUseSubscription = (containerRef: React.RefObject<Element>) => () => {
  const [value, setValue] = useState<DataTableScrollerMetadata | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      const setValueRaft = raft(() => {
        setValue({
          x: containerRef.current!.scrollLeft,
          y: containerRef.current!.scrollTop
        });
      });

      const listener: EventListenerOrEventListenerObject = (evt) => {
        evt.stopImmediatePropagation();
        return setValueRaft();
      };

      containerRef.current.addEventListener('scroll', listener);

      return () => {
        setValueRaft.cancel();
        containerRef.current!.removeEventListener('scroll', listener);
      }
    }
  }, [containerRef.current]);

  return value;
}

export type DataTableScrollerProviderProps = {
  containerRef: React.RefObject<Element>;
  orientation?: DataTableScrollerOrientation;
  children: React.ReactNode;
}

export const DataTableScrollerProvider: React.FC<DataTableScrollerProviderProps> = ({
  orientation,
  children,
  containerRef
}) => {
  const ctx = useContext(DataTableScrollerContext);

  const useSubscription = useMemo(() => bindUseSubscription(containerRef), [containerRef]);

  const value = useMemo<DataTableScrollerContextType>(() => ({
    parent: ctx,
    orientation,
    useSubscription,
  }), [ctx, orientation, useSubscription]);

  return (
    <DataTableScrollerContext.Provider value={value}>
      {children}
    </DataTableScrollerContext.Provider>
  )
}

export type DataTableScrollerProps =
  & Omit<DataTableScrollerProviderProps, 'containerRef'>
  & {
    className?: string;
  }

export const DataTableScroller: React.FC<DataTableScrollerProps> = ({
  orientation,
  children,
  ...restProps
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} {...restProps}>
      <DataTableScrollerProvider
        containerRef={containerRef}
        orientation={orientation}
      >
        {children}
      </DataTableScrollerProvider>
    </div>
  )
}

export default styled(DataTableScroller)`
  position: relative;
  overflow: scroll;
  height: 100%;
  /**
   * prevent swipe navigation
   * https://stackoverflow.com/questions/17474930/disable-chrome-two-fingers-back-forward-swipe
   */
  overscroll-behavior-x: none;
  ${({ orientation }) => orientation === 'horizontal'
    ? `
    max-width: 0;
    min-width: 100%;
    height: 100%;
    overflow: inherit;
    overflow-x: scroll;
    overflow-y: hidden;
` : ''}
  ${({ orientation }) => orientation === 'vertical'
    ? `
    min-width: min-content;
    overflow: inherit;
    overflow-x: hidden;
    overflow-y: scroll;
  ` : ''} 
`;
