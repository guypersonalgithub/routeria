/// <reference types="react" />
import { RouterGuards, RouterPaths } from "./router.types";
declare const Router: ({ paths, guards, }: {
    paths: RouterPaths;
    guards?: RouterGuards | undefined;
}) => JSX.Element;
export default Router;
