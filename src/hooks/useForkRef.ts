// Stolen from https://github.com/imbhargav5/rooks/blob/535f788bbd1196fed4ae88cfd2afea36f85a0c53/src/hooks/useForkRef.ts
import { useMemo, Ref, MutableRefObject, RefCallback } from 'react';

/**
 * Credit to material-ui for this snippet
 */

export const setRef = <T>(ref: RefCallback<T> | MutableRefObject<T> | null, value: T) => {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
}

/**
 * useForkRef
 * Joins refs together and returns a combination of the two as a new ref
 *
 * @param refA
 * @param refB
 */
export const useForkRef = <T>(refA?: Ref<T>, refB?: Ref<T>): Ref<T> => {
  /**
   * This will create a new function if the ref props change and are defined.
   * This means react will call the old forkRef with `null` and the new forkRef
   * with the ref. Cleanup naturally emerges from this behavior
   */
  return useMemo(() => {
    if (!refA && !refB) {
      return null;
    }

    return (refValue: T) => {
        refA && setRef(refA, refValue);
        refB && setRef(refB, refValue);
    };
  }, [refA, refB]);
}

export default useForkRef;
