import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { STORAGE_KEYS } from "../utils/keys";

export type LayoutSettings = {
    fixedSidebar: boolean;
    fixedHeader: boolean;
    fixedFooter: boolean;
    sidebarMini: boolean;
    collapsed: boolean;
    withoutHover: boolean;
    topNav: boolean;
    customArea: boolean;
    /** Sidebar “Filter menu” search. Not a body class. */
    filterMenu: boolean;
};

export const DEFAULT_LAYOUT_SETTINGS: LayoutSettings = {
    fixedSidebar: true,
    fixedHeader: true,
    fixedFooter: false,
    sidebarMini: true,
    collapsed: false,
    withoutHover: false,
    topNav: false,
    customArea: false,
    filterMenu: true
};

const MANAGED_CLASSES = [
    "layout-fixed",
    "sidebar-expand-lg",
    "bg-body-tertiary",
    "fixed-header",
    "fixed-footer",
    "sidebar-mini",
    "sidebar-collapse",
    "sidebar-without-hover"
] as const;

export function layoutBodyClasses(l: LayoutSettings): string[] {
    if (l.topNav) return ["bg-body-tertiary"];
    const classes = ["sidebar-expand-lg", "bg-body-tertiary"];
    if (l.fixedSidebar) classes.push("layout-fixed");
    if (l.fixedHeader) classes.push("fixed-header");
    if (l.fixedFooter) classes.push("fixed-footer");
    if (l.sidebarMini || l.collapsed) classes.push("sidebar-mini");
    if (l.collapsed) classes.push("sidebar-collapse");
    if (l.withoutHover) classes.push("sidebar-without-hover");
    return classes;
}

function applyLayoutToBody(l: LayoutSettings): void {
    const next = new Set(layoutBodyClasses(l));
    for (const cls of MANAGED_CLASSES) {
        document.body.classList.toggle(cls, next.has(cls));
    }
}

function readStored(): LayoutSettings {
    try {
        const raw = localStorage.getItem(STORAGE_KEYS.appLayout);
        if (raw !== null) {
            const saved = JSON.parse(raw) as Partial<LayoutSettings>;
            const next = { ...DEFAULT_LAYOUT_SETTINGS };
            for (const key of Object.keys(DEFAULT_LAYOUT_SETTINGS) as (keyof LayoutSettings)[]) {
                if (typeof saved[key] === "boolean") next[key] = saved[key];
            }
            return next;
        }
    } catch {
        // Corrupt or unavailable storage — defaults stay in place.
    }
    return DEFAULT_LAYOUT_SETTINGS;
}

function withCoupling(prev: LayoutSettings, key: keyof LayoutSettings, value: boolean): LayoutSettings {
    const next = { ...prev, [key]: value };
    if (key === "collapsed" && value) next.sidebarMini = true;
    if (key === "topNav" && value) {
        next.fixedSidebar = false;
        next.sidebarMini = false;
        next.collapsed = false;
        next.withoutHover = false;
    }
    return next;
}

type LayoutSettingsContextValue = LayoutSettings & {
    update(setting: keyof LayoutSettings, value: boolean): void;
    reset(): void;
};

const LayoutSettingsContext = createContext<LayoutSettingsContextValue | null>(null);

export function LayoutSettingsProvider({ children }: { children: ReactNode }) {
    const [settings, setSettings] = useState<LayoutSettings>(readStored);

    useEffect(() => {
        applyLayoutToBody(settings);
        localStorage.setItem(STORAGE_KEYS.appLayout, JSON.stringify(settings));
    }, [settings]);

    const value = useMemo<LayoutSettingsContextValue>(
        () => ({
            ...settings,
            update: (setting, update) => setSettings((prev) => withCoupling(prev, setting, update)),
            reset: () => setSettings(DEFAULT_LAYOUT_SETTINGS)
        }),
        [settings]
    );

    return <LayoutSettingsContext.Provider value={value}>{children}</LayoutSettingsContext.Provider>;
}

export function useLayoutSettings(): LayoutSettingsContextValue {
    const ctx = useContext(LayoutSettingsContext);
    if (ctx === null) {
        throw new Error("useLayoutSettings must be used inside <LayoutSettingsProvider>");
    }
    return ctx;
}
