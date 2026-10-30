// colors-demo.ts — TS port of the inline demo script of UI/colors.html
// (skin switcher, primary/contrast pickers, palette switch, brand-colour
// checker). Bodies stay verbatim from the source script (MIGRATION-PLAN §1.1);
// changes are: palette JSON from the typed module (PALETTE_TEXT_LOOKUP), the
// swappable <link> created/removed by the init lifecycle, strict-mode type
// annotations, non-null fallbacks only where the source's parser guarantees
// elements, and a cleanup that hands the shell back exactly as <AdminLayout />
// rendered it.
import type { PaletteSet, Role, SkinState } from "./colors-demo.types";
import { PALETTE_TEXT } from "../../lib/palette-text";

/** Auto text colour per palette set: ['designed' | 'v3' → mode → colour → text]. */
const PALETTE_TEXT_LOOKUP = PALETTE_TEXT as Record<string, Record<"default" | "aa", Record<string, string>>>;

/** Ensures the swappable last-in-head override link tag the palette switcher
 * owns. Defaults to the designed sheet, same as the source page's head markup
 * (link id="palette-stylesheet", data-css-dir, href=../css/adminlte-colors.css). */
const ensurePaletteLink = (): HTMLLinkElement => {
    let link = document.querySelector<HTMLLinkElement>("#palette-stylesheet");
    if (!link) {
        link = document.createElement("link");
        link.id = "palette-stylesheet";
        link.rel = "stylesheet";
        link.dataset.cssDir = "/css/";
        // The palette sheets live under /css/ in this app (copied to public/css/).
        link.href = link.dataset.cssDir + "adminlte-colors.css";
        document.head.appendChild(link);
    }
    return link;
};

export function initColorsDemo(): () => void {
    "use strict";

    // ---- Skin switcher: recolours THIS page's sidebar and header ----------
    const sidebar = document.querySelector(".app-sidebar") as HTMLElement;
    const header = document.querySelector(".app-header") as HTMLElement;
    const markup = document.getElementById("skin-markup") as HTMLElement;
    const pickers = document.querySelectorAll("[data-skin-picker]");
    const primaryPickers = document.querySelectorAll("[data-primary-picker]");
    const contrastToggle = document.getElementById("contrast-aa") as HTMLInputElement | null;
    const primaryMarkup = document.getElementById("primary-markup") as HTMLElement;
    // Automatic text colour per palette (the v3 sheet gives some colours dark text)
    const PALETTE_TEXT = PALETTE_TEXT_LOOKUP;
    const stylesheet = ensurePaletteLink();
    let activeSet: PaletteSet = "designed";
    const state: {
        sidebar: SkinState;
        header: SkinState;
        primary: string;
        aa: boolean;
    } = {
        sidebar: { cls: "bg-body-secondary", theme: "dark" },
        header: { cls: "bg-body", theme: "light" },
        // `data-lte-primary` on <html>: "default" leaves the attribute off
        primary: "default",
        // `data-lte-contrast="aa"`: flips the text on colours that miss AA
        aa: false
    };
    const DEFAULTS: Record<Role, SkinState> = {
        sidebar: { cls: "bg-body-secondary", theme: "dark" },
        header: { cls: "bg-body", theme: "light" }
    };
    const isSkinClass = (c: string): boolean => /^(text-bg-|bg-body|bg-gradient-)/.test(c);
    // The automatic text colour for a palette colour, in the mode that is on:
    // a coloured sidebar or header pairs with data-bs-theme="dark" only while
    // its text is white.
    const textOf = (color: string): string => (PALETTE_TEXT[activeSet]![state.aa ? "aa" : "default"] as Record<string, string>)[color] ?? "white";

    const paint = (el: HTMLElement, role: Role) => {
        const stale = [...el.classList].filter((c) => isSkinClass(c));
        el.classList.remove(...stale);
        el.classList.add(...state[role].cls.split(" "));
        el.setAttribute("data-bs-theme", state[role].theme);
        el.style.removeProperty("background-color");
    };

    const render = () => {
        // Pair first, paint second: a colour whose text flipped to dark needs
        // the light colour mode on the region carrying it, so its nav links
        // follow the heading.
        for (const role of ["sidebar", "header"] as const) {
            const cls = state[role].cls;
            if (cls.startsWith("text-bg-") || cls.startsWith("bg-gradient-")) {
                state[role].theme = textOf(cls.replace(/^(text-bg-|bg-gradient-)/, "")) === "white" ? "dark" : "light";
            }
        }

        paint(sidebar, "sidebar");
        paint(header, "header");
        if (state.primary === "default") {
            document.documentElement.removeAttribute("data-lte-primary");
        } else {
            document.documentElement.setAttribute("data-lte-primary", state.primary);
        }
        if (state.aa) {
            document.documentElement.setAttribute("data-lte-contrast", "aa");
        } else {
            document.documentElement.removeAttribute("data-lte-contrast");
        }
        for (const picker of primaryPickers) {
            for (const chip of picker.querySelectorAll("[data-color]")) {
                chip.setAttribute("aria-pressed", String(chip.getAttribute("data-color") === state.primary));
            }
        }
        primaryMarkup.textContent =
            (state.aa && state.primary !== "default" ? '<!-- with data-lte-contrast="aa" the text on this colour flips -->\n' : "") +
            (state.primary === "default"
                ? '<html lang="en">   <!-- no attribute: Bootstrap\'s blue -->'
                : `<html lang="en" data-lte-primary="${state.primary}"${state.aa ? ' data-lte-contrast="aa"' : ""}>`);
        for (const picker of pickers) {
            const role = picker.getAttribute("data-skin-picker") as Role;
            const cls = state[role].cls;
            const current = cls.startsWith("text-bg-") ? cls.slice(8) : cls.startsWith("bg-body") ? "default" : "";
            for (const chip of picker.querySelectorAll("[data-color]")) {
                chip.setAttribute("aria-pressed", String(chip.getAttribute("data-color") === current));
            }
        }
        for (const button of document.querySelectorAll(".skin-presets [data-skin-sidebar]")) {
            const matches =
                button.getAttribute("data-skin-primary") === state.primary &&
                button.getAttribute("data-skin-sidebar") === state.sidebar.cls &&
                button.getAttribute("data-skin-sidebar-theme") === state.sidebar.theme &&
                button.getAttribute("data-skin-header") === state.header.cls &&
                button.getAttribute("data-skin-header-theme") === state.header.theme;
            button.setAttribute("aria-pressed", String(matches));
        }
        markup.textContent =
            (state.aa ? '<html lang="en" data-lte-contrast="aa">\n' : "") +
            `<nav class="app-header navbar navbar-expand ${state.header.cls}" data-bs-theme="${state.header.theme}">\n` +
            `<aside class="app-sidebar ${state.sidebar.cls} shadow" data-bs-theme="${state.sidebar.theme}">`;
    };

    for (const picker of pickers) {
        const role = picker.getAttribute("data-skin-picker") as Role;
        picker.addEventListener("click", (event) => {
            const chip = (event.target instanceof Element ? event.target : null)?.closest("[data-color]");
            if (!chip) {
                return;
            }
            const color = chip.getAttribute("data-color") ?? "";
            // A coloured sidebar or header pairs with data-bs-theme="dark" when the
            // colour takes white text (every designed colour; most v3 colours).
            const text = textOf(color);
            state[role] = color === "default" ? { ...DEFAULTS[role] } : { cls: `text-bg-${color}`, theme: text === "white" ? "dark" : "light" };
            render();
        });
    }

    for (const picker of primaryPickers) {
        picker.addEventListener("click", (event) => {
            const chip = (event.target instanceof Element ? event.target : null)?.closest("[data-color]");
            if (!chip) {
                return;
            }
            state.primary = chip.getAttribute("data-color") ?? "default";
            render();
        });
    }

    contrastToggle?.addEventListener("change", () => {
        state.aa = contrastToggle.checked;
        render();
    });

    for (const container of document.querySelectorAll(".skin-presets")) {
        container.addEventListener("click", (event) => {
            const button = (event.target instanceof Element ? event.target : null)?.closest("[data-skin-sidebar]");
            if (!button) {
                return;
            }
            state.sidebar = {
                cls: button.getAttribute("data-skin-sidebar") ?? "",
                theme: (button.getAttribute("data-skin-sidebar-theme") ?? "dark") as SkinState["theme"]
            };
            state.header = {
                cls: button.getAttribute("data-skin-header") ?? "",
                theme: (button.getAttribute("data-skin-header-theme") ?? "light") as SkinState["theme"]
            };
            state.primary = button.getAttribute("data-skin-primary") || "default";
            render();
        });
    }

    // ---- Palette switch: swap the stylesheet, show that palette's tiles/presets/chips ----
    for (const button of document.querySelectorAll("[data-palette-switch]")) {
        button.addEventListener("click", () => {
            activeSet = button.getAttribute("data-palette-switch") as PaletteSet;
            stylesheet.href =
                // the override sheet lives under /css/ in this app (copied to public/css/)
                stylesheet.getAttribute("data-css-dir")! + button.getAttribute("data-palette-file")!;
            for (const b of document.querySelectorAll("[data-palette-switch]")) {
                const on = b === button;
                b.classList.toggle("active", on);
                b.setAttribute("aria-pressed", String(on));
            }
            for (const el of document.querySelectorAll<HTMLElement>("[data-palette-set]")) {
                el.hidden = el.getAttribute("data-palette-set") !== activeSet;
            }
            state.sidebar = { ...DEFAULTS.sidebar };
            state.header = { ...DEFAULTS.header };
            state.primary = "default";
            render();
        });
    }

    render();

    // ---- Brand colour checker ------------------------------------------
    // OKLCH + WCAG maths; a copy of src/utils/palette.mjs — keep in step.
    const srgbToLinear = (c: number): number => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
    const linearToSrgb = (c: number): number => (c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055);
    const hexToRgb = (hex: string): [number, number, number] =>
        hex
            .replace("#", "")
            .match(/../g)!
            .map((h) => Number.parseInt(h, 16) / 255) as [number, number, number];
    const rgbToHex = (rgb: number[]): string =>
        "#" +
        rgb
            .map((v) =>
                Math.round(Math.min(1, Math.max(0, v)) * 255)
                    .toString(16)
                    .padStart(2, "0")
            )
            .join("");
    const luminance = (hex: string): number => {
        const [r, g, b] = hexToRgb(hex).map(srgbToLinear) as [number, number, number];
        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };
    const contrastWhite = (hex: string): number => 1.05 / (luminance(hex) + 0.05);
    const contrastBlack = (hex: string): number => (luminance(hex) + 0.05) / 0.05;
    const rgbToOklch = ([r, g, b]: number[]) => {
        const [lr, lg, lb] = [r ?? 0, g ?? 0, b ?? 0].map(srgbToLinear) as [number, number, number];
        const l = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
        const m = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
        const s = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);
        const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
        const a = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
        const bb = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
        let h = (Math.atan2(bb, a) * 180) / Math.PI;
        if (h < 0) h += 360;
        return { L, C: Math.hypot(a, bb), h };
    };
    const oklchToRgb = ({ L, C, h }: { L: number; C: number; h: number }) => {
        const a = C * Math.cos((h * Math.PI) / 180);
        const b = C * Math.sin((h * Math.PI) / 180);
        const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
        const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
        const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
        return [
            4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
            -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
            -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s
        ].map(linearToSrgb);
    };
    const inGamut = (rgb: number[]): boolean => rgb.every((v) => v >= -0.0005 && v <= 1.0005);
    const maxChroma = (L: number, h: number): number => {
        let lo = 0;
        let hi = 0.4;
        for (let i = 0; i < 30; i++) {
            const mid = (lo + hi) / 2;
            if (inGamut(oklchToRgb({ L, C: mid, h }))) lo = mid;
            else hi = mid;
        }
        return lo;
    };
    // Keep hue and chroma, lower lightness until white text reaches 4.6:1
    const fixForWhiteText = (hex: string): string | null => {
        const { L: start, C, h } = rgbToOklch(hexToRgb(hex));
        for (let L = start; L >= 0.2; L -= 0.0025) {
            const chroma = Math.min(C, maxChroma(L, h) * 0.98);
            const candidate = rgbToHex(oklchToRgb({ L, C: chroma, h }));
            if (contrastWhite(candidate) >= 4.6) return candidate;
        }
        return null;
    };
    const hueDistance = (a: number, b: number): number => {
        const d = Math.abs(a - b) % 360;
        return d > 180 ? 360 - d : d;
    };
    const byGap = (a: [string, number], b: [string, number]): number => a[1] - b[1];
    const PALETTE_HUES: [string, number][] = [
        ["orange", 42],
        ["amber", 67],
        ["olive", 126],
        ["teal", 190],
        ["sky", 237],
        ["indigo", 283],
        ["violet", 303],
        ["fuchsia", 324],
        ["pink", 350]
    ];
    const BOOTSTRAP_HUES: [string, number][] = [
        ["danger", 21],
        ["warning", 85],
        ["success", 157],
        ["info", 218],
        ["primary", 260]
    ];

    const picker = document.getElementById("brand-picker") as HTMLInputElement;
    const hexInput = document.getElementById("brand-hex") as HTMLInputElement;
    const verdict = document.getElementById("brand-verdict") as HTMLElement;
    const snippet = document.getElementById("brand-snippet") as HTMLElement;
    let currentHex = "#0f766e";

    const evaluate = (raw: string): void => {
        const hex = raw.trim().replace(/^#?/, "#").toLowerCase();
        if (!/^#[0-9a-f]{6}$/.test(hex)) {
            verdict.className = "callout callout-warning mb-0";
            verdict.textContent = "Enter a six-digit hex colour, like #0f766e.";
            snippet.textContent = "";
            return;
        }
        currentHex = hex;
        picker.value = hex;
        const lch = rgbToOklch(hexToRgb(hex));
        const white = contrastWhite(hex);
        const black = contrastBlack(hex);
        const passes = white >= 4.5;
        const fixed = passes ? null : fixForWhiteText(hex);
        const nearestPalette = PALETTE_HUES.map(([n, h]) => [n, hueDistance(h, lch.h)] as [string, number]).toSorted(byGap)[0] as [string, number];
        const nearestBootstrap = BOOTSTRAP_HUES.map(([n, h]) => [n, hueDistance(h, lch.h)] as [string, number]).toSorted(byGap)[0] as [string, number];
        const isNeutral = lch.C < 0.04;
        const overrideName = !isNeutral && nearestPalette[1] < 15 ? nearestPalette[0] : "brand";

        let advice;
        if (passes) {
            advice = `<p class="mb-0">Good to go: <code>.text-bg-${overrideName}</code>, small boxes, badges and a branded sidebar (<code>data-bs-theme="dark"</code>) all take white text.</p>`;
        } else if (fixed) {
            advice = `<p class="mb-0">Same hue and chroma, lightness lowered until white text passes: <button type="button" class="btn btn-sm btn-link p-0 align-baseline font-monospace" data-use-hex="${fixed}">${fixed}</button> (${contrastWhite(fixed).toFixed(2)}:1). Or keep the colour and use it with dark text — set <code>data-bs-theme="light"</code> on a sidebar or header that carries it.</p>`;
        } else {
            advice = `<p class="mb-0">No darker version of this hue reaches 4.5:1 with white text — use it with dark text (<code>data-bs-theme="light"</code>).</p>`;
        }
        const notes = [];
        if (!isNeutral && nearestPalette[1] < 15) {
            notes.push(
                `it is only ${nearestPalette[1].toFixed(0)}° from <strong>${nearestPalette[0]}</strong> — consider overriding that name instead of adding one`
            );
        }
        if (!isNeutral && nearestBootstrap[1] < 15) {
            notes.push(
                `it is only ${nearestBootstrap[1].toFixed(0)}° from Bootstrap's <strong>${nearestBootstrap[0]}</strong>, so the two may read as one colour`
            );
        }
        const lines = [
            `<p class="mb-2"><span class="badge me-2" style="background:${hex};color:${passes ? "#fff" : "#000"}">Aa</span><code>${hex}</code> · oklch(${lch.L.toFixed(2)} ${lch.C.toFixed(2)} ${lch.h.toFixed(0)})</p>`,
            `<p class="mb-2">White text <strong>${white.toFixed(2)}:1</strong> ${passes ? "✔ passes WCAG AA" : "✖ below 4.5:1"} · black text ${black.toFixed(2)}:1</p>`,
            advice,
            notes.length > 0 ? `<p class="mb-0 mt-2 small">Hue note: ${notes.join("; ")}.</p>` : ""
        ];
        verdict.className = `callout mb-0 ${passes ? "callout-success" : "callout-warning"}`;
        verdict.innerHTML = lines.join("");

        snippet.textContent =
            `// your-adminlte.scss — compile with your own Sass build\n` +
            `$lte-palette-custom: (\n  "${overrideName}": ${passes || !fixed ? hex : fixed}\n);\n` +
            `@import "admin-lte/src/scss/adminlte-colors";\n\n` +
            `<!-- then in your markup -->\n` +
            `<div class="small-box text-bg-${overrideName}">…</div>\n` +
            `<aside class="app-sidebar text-bg-${overrideName} shadow" data-bs-theme="${passes || fixed ? "dark" : "light"}">`;
    };

    verdict.addEventListener("click", (event) => {
        const use = (event.target instanceof Element ? event.target : null)?.closest("[data-use-hex]");
        if (use) {
            hexInput.value = use.getAttribute("data-use-hex") ?? "";
            evaluate(hexInput.value);
        }
    });
    picker.addEventListener("input", () => {
        hexInput.value = picker.value;
        evaluate(picker.value);
    });
    hexInput.addEventListener("input", () => evaluate(hexInput.value));

    // Preview the brand colour on the page chrome (inline style, so it works
    // without a compiled class); the skin switcher's next click clears it.
    const preview = (el: HTMLElement, role: Role) => {
        if (!/^#[0-9a-f]{6}$/.test(currentHex)) return;
        paint(el, role);
        el.style.setProperty("background-color", currentHex, "important");
        el.setAttribute("data-bs-theme", contrastWhite(currentHex) >= 3 ? "dark" : "light");
    };
    document.getElementById("brand-preview-sidebar")!.addEventListener("click", () => preview(sidebar, "sidebar"));
    document.getElementById("brand-preview-header")!.addEventListener("click", () => preview(header, "header"));
    document.getElementById("brand-preview-clear")!.addEventListener("click", render);

    evaluate(hexInput.value);

    // ---- teardown: the demo must hand the shell back exactly as the app rendered it -
    return () => {
        document.getElementById("palette-stylesheet")?.remove();
        document.documentElement.removeAttribute("data-lte-primary");
        document.documentElement.removeAttribute("data-lte-contrast");
        const sidebarEl = document.querySelector(".app-sidebar");
        if (sidebarEl instanceof HTMLElement) {
            sidebarEl.className = "app-sidebar bg-body-secondary shadow";
            sidebarEl.setAttribute("data-bs-theme", "dark");
            sidebarEl.style.removeProperty("background-color");
        }
        const headerEl = document.querySelector(".app-header");
        if (headerEl instanceof HTMLElement) {
            headerEl.className = "app-header navbar navbar-expand bg-body";
            headerEl.setAttribute("data-bs-theme", "light");
            headerEl.style.removeProperty("background-color");
        }
    };
}
