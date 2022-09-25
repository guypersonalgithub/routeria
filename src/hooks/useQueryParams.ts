let queryParams: Record<string, string | number> = {};

export const useQueryParams = () => queryParams;

export const useInnerQueryParams = () => {
  const setQueryParams = () => {
    const splittedQueryString = window.location.search.slice(
      1,
      window.location.search.length - 1
    );
    const queryStringParams = splittedQueryString.split("&");
    queryStringParams.forEach((queryParam) => {
      const variableValueSplit = queryParam.split("=");
      queryParams[variableValueSplit[0]] = variableValueSplit[1];
    });
  };
  const resetQueryParams = () => (queryParams = {});

  return {
    setQueryParams,
    resetQueryParams,
  };
};
