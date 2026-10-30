import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { COLOR_MODE_CHANGED_EVENT, colorModeApi } from "../lib/adminlte";

export type Mode = "light" | "dark" | "auto";
export type ResolvedMode = "light" | "dark";

export type ColorModeState = {
    mode: Mode;
    resolved: ResolvedMode;
    setMode: (mode: Mode) => void;
};

const ColorModeContext = createContext<ColorModeState | null>(null);

export function ColorModeProvider({ children }: { children: ReactNode }) {
    const api = useMemo(() => colorModeApi(), []);
    const [mode, setModeState] = useState<Mode>(() => api.getPreferredTheme());
    const [resolved, setResolved] = useState<ResolvedMode>(() => api.resolveTheme(api.getPreferredTheme()));

    useEffect(() => {
        const reread = () => {
            const m = api.getPreferredTheme();
            setModeState(m);
            setResolved(api.resolveTheme(m));
        };
        document.addEventListener(COLOR_MODE_CHANGED_EVENT, reread);
        const mediaQuery = globalThis.matchMedia("(prefers-color-scheme: dark)");
        mediaQuery.addEventListener("change", reread);

        return () => {
            document.removeEventListener(COLOR_MODE_CHANGED_EVENT, reread);
            mediaQuery.removeEventListener("change", reread);
        };
    }, [api]);

    const value = useMemo<ColorModeState>(
        () => ({
            mode,
            resolved,
            setMode: (m) => {
                api.setTheme(m);
            }
        }),
        [api, mode, resolved]
    );

    return <ColorModeContext.Provider value={value}>{children}</ColorModeContext.Provider>;
}

export function useColorMode(): ColorModeState {
    const state = useContext(ColorModeContext);
    if (!state) {
        throw new Error("useColorMode must be used inside <ColorModeProvider>");
    }
    return state;
}
