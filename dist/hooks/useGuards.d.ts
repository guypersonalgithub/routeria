export declare const setGuardCallback: (callback: (state: [string, boolean]) => void) => (state: [string, boolean]) => void;
export declare const useGuards: () => {
    setGuardState: (guard: string, state: boolean) => void;
};
