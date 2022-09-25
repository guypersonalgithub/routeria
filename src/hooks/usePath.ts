export const usePath = () => {
  const moveTo = (pathname: string): void => {
    if (pathname === window.location.pathname) {
      return;
    }
    window.history.pushState({ path: pathname }, "", pathname);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  return {
    moveTo,
  };
};
