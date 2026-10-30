/**
 * localStorage key registry.
 *
 * App-owned keys are read/written by src/ code.
 */
const STORAGE_KEYS = {
    webToken: "webToken",
    appSidebarState: "appSidebarState",
    appTheme: "appTheme",
    appLayout: "appLayout"
} as const;

const THEMES = ["light", "dark", "auto"] as const;

export type Theme = (typeof THEMES)[number];
export type TStorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];

export { STORAGE_KEYS, THEMES };
