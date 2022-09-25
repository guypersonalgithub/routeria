export declare const useRouteParams: () => Record<string, string | number>;
export declare const useInnerRouteParams: () => {
    setRouterParams: (path: string, nestedLevel: string) => void;
    resetRouterParams: () => {};
};
