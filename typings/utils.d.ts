// Picks the array item type
type ElementType<T extends ReadonlyArray<unknown>> = T extends ReadonlyArray<
  infer ElementType
>
  ? ElementType
  : never


/**
 * Picks a prop extracting the type even if is optional
 */
type PickProp<T, K extends keyof T> = Exclude<T[K], undefined>