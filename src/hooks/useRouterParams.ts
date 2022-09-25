let routeParams: Record<string, string | number> = {};

export const useRouteParams = () => routeParams;

export const useInnerRouteParams = () => {
  const setRouterParams = (path: string, nestedLevel: string) => {
    const currentKey = path.slice(2, path.length);
    routeParams[currentKey] = nestedLevel;
  };
  const resetRouterParams = () => (routeParams = {});

  return {
    setRouterParams,
    resetRouterParams,
  };
};
