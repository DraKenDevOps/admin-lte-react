// Concrete wrappers shipped in Phase 1 (MIGRATION-PLAN §3.2).
// Every hook is idempotent, StrictMode-safe, and cleans up correctly.

import { useEffect, useRef } from "react";
import { OverlayScrollbars } from "overlayscrollbars";
import type { PartialOptions } from "overlayscrollbars";
import ApexCharts from "apexcharts";
import type { ApexOptions } from "apexcharts";
import { mergeChartTheme, registerChartTheme } from "../../theme/chart-theme";
import { CardWidget, FullScreen, PushMenu, initAccessibility, initialize } from "./store";
import { useAdminlteComponent } from "./useAdminlteComponent";
import type { RefObject } from "react";
import type { Disposable } from "./useAdminlteComponent";

// ---------------------------------------------------------------------------
// Shell bootstrap
// ---------------------------------------------------------------------------

/**
 * Module-scoped StrictMode guard: in dev, effects run twice. `initialize()`
 * has internal replay guards, but the hook stays defensive so a double invoke
 * can never double-init shell widget instances (MIGRATION-PLAN §3.1).
 */
let shellBootstrapped = false;

/**
 * Run once in <AdminLayout /> after the shell DOM is attached:
 * re-runs the DOMContentLoaded initializers against the live shell DOM and
 * installs accessibility features (skip links, `data-lte-contrast`).
 *
 * initialize() replays every plugin init with `getOrCreateInstance`, so
 * re-running is safe. Route changes never re-run this — the hook lives in
 * AdminLayout only, which mounts exactly once for the app's lifetime.
 */
export function useShellBootstrap(): void {
    useEffect(() => {
        // Note: body layout classes (`layout-fixed`, `fixed-header`, …) are NOT
        // set here — the <LayoutSettingsProvider> owns them (src/settings).

        if (shellBootstrapped) {
            return undefined;
        }
        shellBootstrapped = true;

        initialize(); // re-run DOMContentLoaded initializers against shell DOM (getOrCreateInstance => safe)
        initAccessibility();

        // No teardown: the shell lives for the app's lifetime.
        return undefined;
    }, []);
}

// ---------------------------------------------------------------------------
// Instance hooks
// ---------------------------------------------------------------------------

/**
 * CardWidget instance for the bordered `.card` element.
 *
 * Only needed for cards that mount dynamically (`items.map(…)`); static cards
 * can rely on the document-level delegation alone — the delegated handler
 * creates a widget on demand the first time a tool button is clicked.
 */
export const useCardWidget = (config?: { animationSpeed?: number }): RefObject<HTMLDivElement | null> =>
    useAdminlteComponent((el, cfg) => CardWidget.getOrCreateInstance(el, cfg as never), {
        config,
        disposeOnCleanup: true
    }) as RefObject<HTMLDivElement | null>;

/**
 * PushMenu instance for the `.app-sidebar` element. Shell `initialize()`
 * already creates it; this hook is for app code that needs control (e.g. the
 * Phase-9 layout variants driving collapse/expand programmatically).
 */
export const usePushMenu = (config?: { sidebarBreakpoint?: number; enablePersistence?: boolean }) =>
    useAdminlteComponent((el, cfg) => PushMenu.getOrCreateInstance(el, cfg as never), {
        config,
        disposeOnCleanup: false
    });

/**
 * FullScreen instance. **Delegation-covered** (`data-lte-toggle="fullscreen"`
 * buttons create the instance on first click) — shipped only so app code can
 * toggle fullscreen programmatically outside the toggle markup.
 */
export const useFullScreen = (): RefObject<HTMLElement | null> => useAdminlteComponent((el) => FullScreen.getOrCreateInstance(el), { disposeOnCleanup: false });

// ---------------------------------------------------------------------------
// OverlayScrollbars
// ---------------------------------------------------------------------------

/**
 * Defaults ported verbatim from the shipped `<!--begin::OverlayScrollbars
 * Configure-->` snippet of the static pages.
 */
export const OVERLAY_SCROLLBARS_DEFAULTS: PartialOptions = {
    scrollbars: {
        theme: "os-theme-light",
        autoHide: "leave",
        clickScroll: true
    }
};

/**
 * Null-instance handed to the registry when the mobile guard wins, so the
 * surrounding hook contract stays uniform.
 */
const nullScrollbar = (): Disposable => ({ dispose: () => undefined });

/**
 * Sidebar wrapper scrollbar. Attach the ref to `.sidebar-wrapper`.
 *
 * OverlayScrollbars is disabled ≤ 992 px on purpose (touch interference) —
 * the isMobile guard is ported from the shipped snippet (README §5).
 * Must dispose on cleanup: OverlayScrollbars keep-alive leaks otherwise
 * (tested against route churn in Phase 1).
 */
export function useOverlayScrollbars(options?: PartialOptions): RefObject<HTMLDivElement | null> {
    return useAdminlteComponent(
        (el, cfg) => {
            if (window.innerWidth <= 992) {
                return nullScrollbar();
            }
            // OverlayScrollbars exposes `destroy()`; wrap it into the common `dispose` shape.
            const instance = OverlayScrollbars(el, (cfg as PartialOptions) ?? OVERLAY_SCROLLBARS_DEFAULTS);
            return {
                dispose: () => {
                    instance.destroy();
                }
            };
        },
        { config: options as Record<string, unknown> | undefined, disposeOnCleanup: true }
    ) as RefObject<HTMLDivElement | null>;
}

/** ApexCharts on a container `<div>`, destroyed with the node. Config objects must be stable. */
export function useApexChart(options: ApexOptions): RefObject<HTMLDivElement | null> {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const node = ref.current;
        if (node === null) return undefined;
        const instance = new ApexCharts(node, mergeChartTheme(options));
        void instance.render();
        const themeEffect = registerChartTheme(instance);
        return () => {
            themeEffect.dispose();
            instance.destroy();
        };
    }, [options]);
    return ref;
}
