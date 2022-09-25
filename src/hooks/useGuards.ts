let guardsCallback: (state: [string, boolean]) => void;

export const setGuardCallback = (
  callback: (state: [string, boolean]) => void
) => (guardsCallback = callback);

export const useGuards = () => {
  const setGuardState = (guard: string, state: boolean) =>
    guardsCallback?.([guard, state]);

  return {
    setGuardState,
  };
};
