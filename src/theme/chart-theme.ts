import type ApexCharts from "apexcharts";
import type { ApexOptions } from "apexcharts";
import "./chart-resize.css";

let installed = false;
const liveCharts = new Set<ApexCharts>();

export const cssVar = (name: string, fallback = ""): string => {
    const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    return value || fallback;
};

const currentMode = (): "light" | "dark" => (document.documentElement.getAttribute("data-bs-theme") === "dark" ? "dark" : "light");

const buildThemePatch = (): ApexOptions => {
    const mode = currentMode();
    const foreColor = cssVar("--bs-secondary-color", mode === "dark" ? "#adb5bd" : "#6c757d");
    const fontFamily = cssVar("--bs-body-font-family", "inherit");
    const gridColor = `rgba(${cssVar("--bs-emphasis-color-rgb", mode === "dark" ? "255, 255, 255" : "0, 0, 0")}, 0.08)`;

    return {
        theme: { mode },
        chart: {
            background: "transparent",
            foreColor,
            fontFamily
        },
        grid: {
            borderColor: gridColor
        },
        tooltip: {
            theme: mode
        }
    };
};

export function mergeChartTheme(options: ApexOptions): ApexOptions {
    const patch = buildThemePatch();
    return {
        ...options,
        theme: {
            ...patch.theme,
            ...options.theme
        },
        chart: {
            toolbar: { show: false },
            ...patch.chart,
            ...options.chart
        },
        grid: {
            ...patch.grid,
            ...options.grid
        },
        tooltip: {
            ...patch.tooltip,
            ...options.tooltip
        }
    };
}

const refresh = (): void => {
    const patch = buildThemePatch();
    for (const chart of liveCharts) {
        void chart.updateOptions(patch, false, false);
    }
};

const SIDEBAR_WIDTH_PROPS = new Set(["min-width", "max-width", "margin-left", "margin-right"]);

let sidebarRedrawQueued = false;

/** One redraw for the burst of transitionend events (one per eased property). */
const redrawAfterSidebar = (): void => {
    sidebarRedrawQueued = false;
    for (const chart of liveCharts) {
        void chart.updateOptions({}, true, false);
    }
};

const onSidebarTransitionEnd = (event: TransitionEvent): void => {
    const target = event.target;
    if (!(target instanceof HTMLElement) || !target.classList.contains("app-sidebar")) return;
    if (!SIDEBAR_WIDTH_PROPS.has(event.propertyName)) return;
    if (sidebarRedrawQueued) return;
    sidebarRedrawQueued = true;
    queueMicrotask(redrawAfterSidebar);
};

const install = (): void => {
    if (installed) return;
    installed = true;
    new MutationObserver(refresh).observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["data-bs-theme", "dir"]
    });
    document.fonts?.addEventListener("loadingdone", refresh);
    document.addEventListener("transitionend", onSidebarTransitionEnd);
};

export function registerChartTheme(chart: ApexCharts): { dispose(): void } {
    install();
    liveCharts.add(chart);
    return {
        dispose() {
            liveCharts.delete(chart);
        }
    };
}
