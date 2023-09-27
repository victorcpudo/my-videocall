import {
  AsyncTaskRunner,
  MaybePromise,
  createAsyncTaskRunner,
} from "@/utils/utils";
import { RefObject, useEffect, useRef } from "react";

export function useAsyncEffect(
  effect: () => MaybePromise<void | (() => MaybePromise<void>)>,
  deps?: ReadonlyArray<unknown>
): void {
  const runnerRef = useRef<AsyncTaskRunner | undefined>();

  useEffect(() => {
    const { run, dispose } = (runnerRef.current ||= createAsyncTaskRunner());

    run(effect);

    return dispose;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export function useIsUnmounted(): RefObject<boolean> {
  const isUnmountRef = useRef(false);

  useEffect(() => {
    isUnmountRef.current = false;

    return () => {
      isUnmountRef.current = true;
    };
  }, []);

  return isUnmountRef;
}
