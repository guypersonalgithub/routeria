import { ReactNode } from "react";

export type RouterPaths = {
  [key: string]: ReactNode | RouterPaths | [ReactNode, string];
};

export type RouterGuards = Record<string, boolean | [boolean, ReactNode]>;
