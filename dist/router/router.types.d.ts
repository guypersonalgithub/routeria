import { ReactNode } from "react";
export declare type RouterPaths = {
    [key: string]: ReactNode | RouterPaths | [ReactNode, string];
};
export declare type RouterGuards = Record<string, boolean | [boolean, ReactNode]>;
