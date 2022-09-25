export declare const useQueryParams: () => Record<string, string | number>;
export declare const useInnerQueryParams: () => {
    setQueryParams: () => void;
    resetQueryParams: () => {};
};
