import { Dispatch, SetStateAction, useEffect, useState } from "react";

export function useSessionState<T>(
  key: string,
  initialValue: T
): [T, Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState<T>(
    () => JSON.parse(sessionStorage.getItem(key) as string) ?? initialValue
  );
  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);
  return [state, setState];
}
