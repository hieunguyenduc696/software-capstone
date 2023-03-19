import { DependencyList, EffectCallback, useEffect, useRef } from "react";

/**
 * Do not run on first render
 * @param callback like callback in `useEffect`
 * @param dependencies like dependencies in `useEffect`
 */
export default function useUpdateEffect(
  callback: EffectCallback,
  dependencies: DependencyList
) {
  const firstRenderRef = useRef(true);

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }
    return callback();
  }, dependencies);
}
