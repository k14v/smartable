// Core
import { useForceUpdate } from '@react-spring/shared';
import React, { createContext, useContext, useEffect, useMemo, useRef } from 'react';
// Hooks
import { useMeasure } from 'react-use';
// @ts-ignore
import raft from 'raf-throttle';
// Theming
import styled from 'styled-components';


export class SmarTableCellMeasurerCache {
  viewportWidth: number = 1455 ?? 0;
  viewportHeight: number = 0;
  staticColumnWidths: number[] = [];
  measuredColumnSizes: number[] = [];
  measuredRowSizes: number[] = [];
  options: { defaultHeight: number, defaultWidth: number } = { defaultHeight: 0, defaultWidth: 0 };

  constructor(staticColumnWidths: number[], opts: { defaultHeight: number, defaultWidth: number }) {
    this.options = { ...this.options, ...opts }
    this.staticColumnWidths = staticColumnWidths;
  }

  updateViewportSize(width: number, height: number) {
    this.viewportWidth = width;
    this.viewportHeight = height;
  }

  setMeasured(rowIndex: number, columnIndex: number, width: number, height: number) {
    this.measuredRowSizes[rowIndex] = Math.max(this.measuredRowSizes[rowIndex] ?? 0, height);
    this.measuredColumnSizes[columnIndex] = Math.max(rowIndex === 0 ? 0 : this.measuredColumnSizes[columnIndex] ?? 0, width);
  }

  setColumn(columnIndex: number, width: number) {
    this.measuredColumnSizes[columnIndex] = Math.max(this.measuredColumnSizes[columnIndex] ?? 0, width);
  }

  getRowHeight = (rowIndex: number) => {
    return Math.ceil(Math.max(this.measuredRowSizes[rowIndex] ?? 0, this.options.defaultHeight))
  }

  getColumnWidth = (columnIndex: number) => {
    // https://www.w3.org/TR/CSS21/tables.html#width-layout
    const fixedColumnsIdx: number[] = [];
    const autoColumnsIdx: number[] = [];

    if (this.staticColumnWidths[columnIndex] !== Infinity) {
      return this.staticColumnWidths[columnIndex];
    }

    this.staticColumnWidths.forEach((width, idx) => {
      if (width === Infinity) {
        autoColumnsIdx.push(idx);
      } else {
        fixedColumnsIdx.push(idx);
      }
    });

    const totalStaticWidth = fixedColumnsIdx.reduce((acc, idx) => acc + this.staticColumnWidths[idx], 0);
    const totalAutoMeasuredWidth = autoColumnsIdx.reduce((acc, idx) => acc + (this.measuredColumnSizes[idx] ?? 0), 0);
    const availableViewportSpace = this.viewportWidth - totalStaticWidth;

    if (totalAutoMeasuredWidth < availableViewportSpace && this.measuredColumnSizes[columnIndex]) {
      return Math.ceil(Math.max(
        this.measuredColumnSizes[columnIndex],
        this.measuredColumnSizes[columnIndex] / totalAutoMeasuredWidth * availableViewportSpace)
      );
    }

    return Math.ceil(this.measuredColumnSizes[columnIndex] ?? 0);
  }
}

export type SmarTableCellMeasurerOrientation = 'horizontal' | 'vertical';

export type SmarTableCellMeasurerContextType = {
  update: () => void;
  cache: SmarTableCellMeasurerCache;
  subscribe: (listener: () => void) => void
}

export const SmarTableCellMeasurerContext = createContext<SmarTableCellMeasurerContextType>({
  cache: new SmarTableCellMeasurerCache([], {
    defaultHeight: 35,
    defaultWidth: 50,
  }),
  subscribe: () => {},
  update() {
  
  },
});

export const useSmarTableMeasurer = () => {
  const ctx = useContext(SmarTableCellMeasurerContext);
  const forceUpdate = useForceUpdate();

  useEffect(() => ctx?.subscribe(forceUpdate), [ctx]);

  if (!ctx) {
    console.warn('Missing measurer context');
  }

  return ctx;
}

export const useSmarTableCellMeasurer = <TElement extends HTMLElement>(rowIndex: number, columnIndex: number, id: string) => {

  const ctx = useContext(SmarTableCellMeasurerContext);

  if (!ctx) {
    console.warn('Missing measurer context');
    return 
  }

  const { cache, update } = ctx;

  const cellRef = useRef<TElement>(null);

  useEffect(() => {
    if (cellRef.current) {
      const prevWidth = cellRef.current.style.width;
      const prevHeight = cellRef.current.style.height;
      cellRef.current.style.width = '0px';
      cellRef.current.style.height = '0px';
      const rect = cellRef.current
        ? {
          width: Math.ceil(cellRef.current.scrollWidth),
          height: Math.ceil(cellRef.current.scrollHeight)
        }
        : { width: 0, height: 0 };
      cache.setMeasured(rowIndex, columnIndex, rect.width, rect.height);
      cellRef.current.style.width = prevWidth;
      cellRef.current.style.height = prevHeight;
      update();
    }
  }, [cellRef.current, cache, rowIndex, columnIndex, id]);

  return cellRef;
}

export type SmarTableCellMeasurerProviderProps = {
  containerRef: React.RefObject<Element>;
  columns: { width?: number }[];
}

export const SmarTableCellMeasurerProvider: React.FC<SmarTableCellMeasurerProviderProps> = ({
  containerRef,
  columns,
  children
}) => {
  const [setElement, { width, height }] = useMeasure();

  const columnWidths = useMemo(() => columns.map(({ width }) => width ?? Infinity), [columns]);

  useEffect(() => {
    if (containerRef.current) {
      setElement(containerRef.current)
    }
  }, [containerRef.current]);

  const value = useMemo(() => {
    const listeners: (() => void)[] = [];

    return ({
      update: raft(() => {
        listeners.forEach((listener) => {
          listener();
        });
      }),
      cache: new SmarTableCellMeasurerCache(columnWidths, {
        defaultHeight: 35,
        defaultWidth: 50,
      }),
      subscribe: (listener: () => void) => {
        listeners.push(listener);
        return () => {
          const index = listeners.findIndex(listener);
          if (index !== -1) {
            listeners.splice(index, 1);
          }
        }
      },
    })
  }, [columnWidths]);


  useEffect(() => {
    value.cache.updateViewportSize(width, height);
    value.update();
  }, [width, height, value]);

  return (
    <SmarTableCellMeasurerContext.Provider value={value}>
      {children}
    </SmarTableCellMeasurerContext.Provider>
  )
}

export type SmarTableCellMeasurerProps =
  & React.HTMLAttributes<HTMLDivElement>
  & Omit<SmarTableCellMeasurerProviderProps, 'containerRef'>

export const SmarTableCellMeasurer: React.FC<SmarTableCellMeasurerProps> = ({
  children,
  columns,
  ...restProps
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} {...restProps}>
      <SmarTableCellMeasurerProvider
        columns={columns}
        containerRef={containerRef}
      >
        {children}
      </SmarTableCellMeasurerProvider>
    </div>
  )
}

export default styled(SmarTableCellMeasurer)`
  position: absolute;
  inset: 0;
`;
