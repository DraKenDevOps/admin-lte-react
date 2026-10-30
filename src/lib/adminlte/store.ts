// lib/adminlte/store.ts — the ONLY module importing the vendored AdminLTE ESM.
// Application code must import from the barrel (`src/lib/adminlte`) only
// (MIGRATION-PLAN §3 / VENDOR.md).

import {
    CardWidget,
    ColorMode,
    DirectChat,
    FullScreen,
    Layout,
    PushMenu,
    SidebarSearch,
    Treeview,
    initAccessibility,
    initialize,
    teardown
} from "./adminlte.esm.js";
import type {
    CardWidget as CardWidgetType,
    ColorMode as ColorModeType,
    DirectChat as DirectChatType,
    FullScreen as FullScreenType,
    Layout as LayoutType,
    PushMenu as PushMenuType,
    SidebarSearch as SidebarSearchType,
    Treeview as TreeviewType
} from "./types/adminlte.js";

export { CardWidget, ColorMode, DirectChat, FullScreen, Layout, PushMenu, SidebarSearch, Treeview, initAccessibility, initialize, teardown };

export type { CardWidgetType, ColorModeType, DirectChatType, FullScreenType, LayoutType, PushMenuType, SidebarSearchType, TreeviewType };

/**
 * Document-level event dispatched by ColorMode.setTheme() with
 * `{ theme, resolved }` in `CustomEvent.detail`.
 * (Kept as a literal: it is not part of the shipped `.d.ts` surface.)
 */
export const COLOR_MODE_CHANGED_EVENT = "changed.lte.color-mode";

/**
 * Fresh reader/writer over the color-mode module. ColorMode is a stateless
 * strategy class in the bundle (the delegated `click` handler instantiates
 * one per click), so a throwaway instance is the intended usage pattern and
 * keeps one source of truth for precedence: stored → markup → OS.
 */
export const colorModeApi = (): ColorModeType => new ColorMode();
