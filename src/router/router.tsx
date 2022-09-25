import { ReactNode, useEffect, useState, isValidElement } from "react";
import { setGuardCallback } from "../hooks/useGuards";
import { RouterGuards, RouterPaths } from "./router.types";
import { useInnerRouteParams } from "../hooks/useRouterParams";
import { useInnerQueryParams } from "../hooks/useQueryParams";

const Router = ({
  paths,
  guards,
}: {
  paths: RouterPaths;
  guards?: RouterGuards;
}) => {
  const { setRouterParams, resetRouterParams } = useInnerRouteParams();
  const { setQueryParams, resetQueryParams } = useInnerQueryParams();
  const [path, setPath] = useState<string>(window.location.pathname);
  const [currentGuards, setGuards] = useState<RouterGuards>(guards || {});

  useEffect(() => {
    const onLocationChange = (): void => {
      resetRouterParams();
      resetQueryParams();
      setPath(window.location.pathname);
    };

    window.addEventListener("popstate", onLocationChange);
    return () => window.removeEventListener("popstate", onLocationChange);
  }, []);

  useEffect(() => {
    const manageGuards = (state: [string, boolean]) => {
      const newGuardsState = { ...currentGuards };
      const currentGuard = newGuardsState[state[0]];
      if (Array.isArray(currentGuard)) {
        currentGuard[0] = state[1];
      } else {
        newGuardsState[state[0]] = state[1];
      }
      setGuards(newGuardsState);
    };
    setGuardCallback(manageGuards);
  }, [currentGuards]);

  const getCurrentRoute = () => {
    if (window.location.search) setQueryParams();
    return (basicPath() || pathBreaker() || notFound()) as ReactNode;
  };

  const basicPath = () => {
    const currentPath = paths[path];
    if (isValidElement(currentPath)) return currentPath;
    else if (Array.isArray(currentPath)) return checkGuard(currentPath);
    return;
  };

  const pathBreaker = () => {
    const nestedLevels = path.split("/");
    let currentStage = paths;
    for (let i = 1; i < nestedLevels.length; i++) {
      const currentPath = `/${nestedLevels[i]}`;
      if (currentStage[currentPath]) {
        currentStage = setNextNestedStage(currentStage, currentPath);
      } else {
        const firstPath = grabFirstPath(currentStage);
        if (firstPath && firstPath.slice(0, 2) === "/:") {
          setRouterParams(firstPath, nestedLevels[i]);
          currentStage = setNextNestedStage(currentStage, firstPath);
        } else currentStage = currentStage["/*"] as RouterPaths;
      }
    }

    if (!currentStage) return;
    return (
      (isValidElement(currentStage["/"])
        ? currentStage["/"]
        : Array.isArray(currentStage["/"]) && checkGuard(currentStage["/"])) ||
      (isValidElement(currentStage)
        ? currentStage
        : Array.isArray(currentStage) &&
          checkGuard(
            currentStage as RouterPaths[keyof RouterPaths] as [
              ReactNode,
              string
            ]
          ))
    );
  };

  const setNextNestedStage = (currentStage: RouterPaths, currentPath: string) =>
    currentStage[currentPath] as RouterPaths;

  const grabFirstPath = (currentStage: RouterPaths) => {
    for (const path in currentStage) {
      return path;
    }
    return;
  };

  const checkGuard = (currentPath: [ReactNode, string]) => {
    const currentGuard = currentGuards[currentPath[1]];
    if (Array.isArray(currentGuard)) {
      return currentGuard[0] ? currentPath[0] : currentGuard[1];
    } else if (currentGuard) return currentPath[0];
    return;
  };

  const notFound = () => paths["404"];

  return <div>{getCurrentRoute()}</div>;
};

export default Router;
