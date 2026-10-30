# NOTES.md — phase diff record (MIGRATION-PLAN §7)

Status: **Phase 0–2 complete (2026-10-29). Package manager: pnpm (see Phase 0 addendum).**

## Phase 0 — Scaffold, tooling, vendored AdminLTE, theming, fonts/icons

| Step | What was done | Diff / notes |
|---|---|---|
| Scaffold | `npm create vite@latest admin-lte-react -- --template react-ts` per plan §2. Template v9 → Vite 8, React 19.3, TS ~7, oxlint. | `strict` + `noUncheckedIndexedAccess` added to `tsconfig.app.json` (plan §5 TypeScript gate). |
| Dependencies | `react-router`, `overlayscrollbars`, `bootstrap`, `bootstrap-icons`, `@fontsource/source-sans-3` — CDN pins → npm packages (README §4.2). | `bootstrap` is JS-only (dropdowns); Bootstrap CSS ships compiled inside the vendored `adminlte.css`. `react-bootstrap` intentionally NOT added (§6). |
| Vendor copy | `css/adminlte.css`, `css/adminlte-colors.css`, `js/adminlte.esm.js`, `js/types/*.d.ts`, 5 `assets/img` files → `src/lib/adminlte/` + `src/assets/img/`. | Fingerprint in `src/lib/adminlte/VENDOR.md` (4.10.1 local vs npm 4.10.0, README §4.1). Source tree untouched. |
| ESM typing | `adminlte.esm.d.ts` re-exports the vendored `types/adminlte.d.ts`; `store.ts` is the only importer (§3). | Build toolchain resolves `./xxx.js` → `xxx.d.ts`. |
| Head snippet | Inline no-flash script kept **verbatim** at top of `index.html` `<head>` (README §4.4) + meta tags from source pages. | Body classes moved to `useShellBootstrap` (framework owns `<body>` via root render). |
| Style import order | `@fontsource/source-sans-3` → `overlayscrollbars` CSS → `bootstrap-icons` → vendored `adminlte.css` (plan §2). | In `src/main.tsx`. |
| Docs dropped | `./docs/**` links + links to `./index.html` "Live preview" dropped per README §2. | Noted in AppHeader comments. |

## Phase 1 — Shell (header, sidebar, footer, OverlayScrollbars, theme toggle)

| Area | What was done | Notes |
|---|---|---|
| Shell | `AdminLayout` renders `app-wrapper` (header/sidebar/main/footer) and wraps `<Outlet/>`; mounts once, never re-inits on route change (§3.1/README §3). | `useShellBootstrap` calls `initialize()` + `initAccessibility()` once, StrictMode-guarded by a module-scoped flag. |
| Header | `starter.html` header ported verbatim (JSX conversions of §1.2). | Dropdowns via bootstrap data attributes; sidebar/fullscreen toggles via AdminLTE delegation; color-mode dropdown synced by the ColorMode module. |
| Sidebar | `NAV_ITEMS` typed data (single conversion point of the nav HTML, §4.1), generic treeview recursion `SidebarNav`. | Active state computed from `useLocation`; subtree auto-`menu-open`. Multi-level example and labels included verbatim. |
| OverlayScrollbars | `useOverlayScrollbars` hook on `.sidebar-wrapper`, defaults ported from the shipped snippet, ≤ 992 px mobile guard ported, dispose-on-cleanup (instance `destroy()` wrapped as `dispose`). | Single location, not per-page (§4.5). |
| Theme | `theme/color-mode.tsx`: `ColorModeProvider`/`useColorMode` - reads/writes through the imported ColorMode module, subscribes to `changed.lte.color-mode` + OS preference changes. | The head script is the validator: nothing flips `data-bs-theme` on load. |
| Hooks shipped | `useAdminlteComponent` (WeakMap registry), `useCardWidget`, `usePushMenu`, `useFullScreen`, `useOverlayScrollbars`, `useShellBootstrap`. | DirectChat/Treeview/SidebarSearch: delegation-covered, no hooks — documented in file headers. |
| Routes | `/` → Starter (smoke test); catch-all → `StubPage` keeps every `NAV_ITEMS` href honestly routable until its batch lands (Phases 2–8). | `StubPage` cards show delegation- vs instance-hook-driven card behavior; decisions in `pages/README.md`. |

### Addendum — package manager switch (2026-10-29)

- Switched npm → **pnpm 12.15.0**: `package-lock.json`/`node_modules` removed, `packageManager: "pnpm@12.15.0"` set, `pnpm-lock.yaml` committed. Reasons and commands identical to shared README tooling; install verified.

## Phase 2 — UI primitives + `UI/*` pages

| Area | What was done | Notes |
|---|---|---|
| Codemod | `scripts/html2jsx.mjs` (parse5-based): carves `<main class="app-main">…</main>`, `class→className`, `for→htmlFor`, style→object, void elements self-closed, begin/end comments → JSX comments, strips dist-only `data-astro-cid-*`, docs links dropped, `*.html` hrefs → app routes. | Mechanical pass per React-plan §1.2. Guard rails: refuses `on*` attributes (delegation invariants). Regenerates `src/pages/ui/{General,Colors,Icons,Ribbons,Timeline}.tsx` — **generated files are hand-off** (port effects into the `*Page` wrappers, never edit them). |
| Codemod-verified issues | `<code><button></code>` raw markup samples inside `<code>` pre-escaped to literal text (JSX cannot nest closing-less tags); `--bs-*` inline custom props emitted as string keys with `as CSSProperties` cast; boolean attrs (`disabled=""` → `disabled`), numeric attrs (`tabIndex`, `colSpan`, `aria-valuenow`) typed; `spellCheck/renderSkip` mappings added. | All caught by the same `tsc -b` gate; converter iterated until `EXIT=0` (1631/3931/81/330/202 lines per page). |
| Colors page data | `scripts/extract-colors-assets.mjs`: inline `<script type="application/json" id="palette-text">` → typed `src/lib/palette-text.ts`; both palette sheets copied to `public/css/` (`adminlte-colors.css` + `adminlte-colors-v3.css`). | Palette stays dynamic exactly like the source: only `colors.html`/`theme.html` load it in the dist, so the app loads it through the swappable `#palette-stylesheet` `<link>` (owned by the Colors page effect) instead of static import. |
| Colors demo port | `scripts/gen-colors-demo.mjs` + `scripts/colors-demo.raw.js` (exact original inline script bytes): unwraps the IIFE, keeps bodies verbatim, applies a small reviewable replacement list (strict-mode annotations, `PALETTE_TEXT` from the typed module, Event→Element casts, non-null fallbacks only where the source guarantees elements, `querySelectorAll<HTMLElement>` for `hidden`). Emits `src/pages/ui/colors-demo.ts` exporting `initColorsDemo(): () => void`. | Teardown restores the shell to exactly the state `AdminLayout` rendered: removes the palette `<link>`, strips `data-lte-primary/-contrast`, resets skin classes on `.app-sidebar`/`.app-header` — required because the demo skins the *shell* chrome, not the page markup. |
| Page wrappers | `GeneralPage` (tooltip init `new Tooltip(el)` per trigger + `data-bs-toggle="toast"` triggers via `Toast.getOrCreateInstance(...).show()`, both disposed on cleanup), `ColorsPage` (`initColorsDemo` lifecycle), `IconsPage`/`RibbonsPage`/`TimelinePage` (no page-local scripts — the source pages' only inline script is the shell scrollbar snippet). | The sidebar-wrapper OverlayScrollbars inline script of the source pages is shell-level: lives once in `AppSidebar` (Phase 1), not repeated per page. |
| Primitives | `src/components/AdminCard.tsx` (`collapsible`/`maximizable`/`closable`/`tools` slots; verbatim `btn btn-tool` + `data-lte-toggle` pairs from `widgets/cards.html`, incl. `data-lte-icon="expand|collapse|maximize|minimize"` icon pairs), `SmallBox.tsx` (from `widgets/small-box.html`: svg/bi icon slot, `.inner`, footer link classes), `InfoBox.tsx` (from `widgets/info-box.html` + optional progress row per the old home-widget shape), `Timeline.tsx` (`Timeline`/`Timeline.Label`/`Timeline.Item` from `UI/timeline.html`, `timeline-icon`/`time-label` verbatim). | Plan §4.2 note: `AdminCard` passes `singleton` (default) → delegation only; dynamic cards use the `useCardWidget` ref. Decisions recorded in `pages/README.md`. |
| Routes | `/ui/general`, `/ui/colors`, `/ui/icons`, `/ui/ribbons`, `/ui/timeline` under `AdminLayout` in `src/router.tsx`; sidebar `NAV_ITEMS` hrefs (`/ui/*`) now resolve to real pages. | `@types/bootstrap` dev-dep added for the typed `Tooltip`/`Toast` imports. |

### Phase 2 conventions (keep for later phases)

- Generated page files (`src/pages/ui/*.tsx`, `colors-demo.ts`) are regenerable by the scripts and must stay byte-stable to their generators — hand-written lifecycle code goes in the thin `*Page.tsx` wrappers.
- Select2/jQuery demo note from README §4.5: not applicable to this batch (no forms).
- Bundle-size budget recording + route churn/disposal checks started this phase (below).

### Pending (later phases)

- Phases 3–10 per README §4.5 (dashboards, charts, tables, forms, feature pages, auth, layout-variant props).
- `layout/*.html` variant flags (`AdminLayout` props surface) — Phase 9.
- Playwright disposal audit automation (§5) — still manual today.
- React Router title management per page (source `<title>` pattern) — trivial add-on per batch.

## Phase 2 verification record (§4.6 checklist, executed in-browser 2026-10-29)

- ✅ `npx tsc -b` strict gate clean; `pnpm run build`: JS **690.7 kB / 180.4 kB gz**, CSS **403.1 kB / 59.6 kB gz** (single main chunk; page-chunk splitting/lazy loading deferred to Phases 3–7 where heavier deps land — chart.js etc. is when `React.lazy` matters).
- ✅ All five routes render verbatim markup compared against the sources: `/ui/general` (1631 lines), `/ui/colors` (3934), `/ui/icons`, `/ui/ribbons`, `/ui/timeline` — h1 + `.app-content` byte counts match expectations.
- ✅ `GeneralPage` effects: 4 tooltips created (`new Tooltip`, aria-describedby set on hover), 9 toast triggers (`Toast.getOrCreateInstance(...).show()` → `.show` class); both disposed on route teardown.
- ✅ Colors demo (StrictMode double-mount included): palette `<link>` owned by the page, `data-palette-switch` v3 ⇄ designed swaps `href` to `/css/adminlte-colors-v3.css` and back; sidebar skin picker applies `text-bg-orange` + `data-bs-theme="dark"` to the *shell* sidebar and live-updates `<code id="skin-markup">`; `<code id="primary-markup">`/`brand-snippet` targets all live.
- ✅ Teardown on navigation away from `/ui/colors`: palette link removed, `data-lte-primary/-contrast` stripped, sidebar/header classes restored to exactly the shell-rendered state (`app-sidebar bg-body-secondary shadow` / `app-header navbar navbar-expand bg-body`).
- ✅ Codemod React-semantics fixes found during verification: `<option selected>` → select `defaultValue` pass; `checked` → `defaultChecked`; static input `value` → `defaultValue` (checkbox/radio keep `value`); live-target `<code id="skin-markup">` nodes inside `<pre>` no longer escaped into literal text (restored as real elements the demo writes into).
- ✅ Console: zero errors on all five pages, before and after interactions; route churn (15 rapid navigations) — no listener pile-up, reset state clean between visits.
- ✅ Network: zero CDN requests; the two palette sheets served from `public/css/` on demand; documented helper `scripts/survey-samples.mjs` surveys code/pre sample shapes used by the codemod.

## Phase 0–1 verification record (§4.6 checklist, executed in-browser 2026-10-29)

- ✅ `npx tsc -b` strict gate clean; `npm run build` + chunk sizes: JS **157.3 kB gz**, CSS **59.6 kB gz** (shell only — well inside the dashboard < 400 kB gz target; page chunks < 150 kB target starts Phase 2).
- ✅ Dev StrictMode double-mount sweep: 9 rapid navigations (`/` ⇄ stubs and back); zero console errors, no duplicated-instrumentation warnings.
- ✅ Dark mode default from OS preference; head no-flash script present verbatim; toggle dropdown persists via `lte-theme`; Auto resolves correctly (`data-bs-theme` + `colorScheme` observed).
- ✅ Sidebar: collapse/expand toggles body `sidebar-collapse` (PushMenu), hover CSS classes in place; treeview opens/closes via delegation (`menu-open`, submenu visible); SidebarSearch accepts input events (empty-state element connected).
- ✅ Cards: collapse tool flips `collapsing-card` → `collapsed-card` after the 500 ms animation, remove/maximize tools wired through the same delegation; instance-hooked card on StubPage verified.
- ✅ Skip links rendered by `initAccessibility()`; ARIA labels preserved through JSX conversion.
- ✅ Console: zero errors; network: **zero CDN requests** — fonts, icons, OverlayScrollbars and AdminLTE all bundled/vendored.
- ✅ React hydration nesting error found during verification (`<li><li>` in treeview recursion) — fixed in `SidebarNav.tsx` before sign-off.

## Settings change record (2026-10-29) â "Layout Options" menu folded into a Settings component

| Change | What was done | Diff / notes |
|---|---|---|
| Settings component | `src/pages/SettingsPage.tsx` (route `/pages/settings`): `pages/settings.html` main region ported by hand (list-group pill nav + tab panes; **pills run via Bootstrap data-api**, no React state). A NEW first tab "Layout" (active by default) hosts the former Layout Options configuration. | React adaptations: forms get `onSubmit` preventDefault (`src/pages/settings-form.ts`), seeded inputs uncontrolled (`defaultValue`/`defaultChecked`), docs links out of scope. Page is hand-off style but app-specific Layout tab is hand-written. |
| Layout settings store | `src/settings/layout-settings.tsx`: `LayoutSettingsProvider` owns the body-class layout state (`layout-fixed`, `fixed-header`, `fixed-footer`, `sidebar-mini`, `sidebar-without-hover`), persisted in `localStorage:lte-layout`, merged over `DEFAULT_LAYOUT_SETTINGS` (dist starter: fixedSidebar=true). Base classes `sidebar-expand-lg` + `bg-body-tertiary` always applied. Effect is idempotent and StrictMode-safe (no module flag). Provider wraps everything inside `AdminLayout` (inside `ColorModeProvider`'s sibling, above all shell children). | `useShellBootstrap` no longer adds layout body classes (comment updated) Ã¢ body-class ownership moved to the provider. |
| Layout tab card | `src/components/LayoutSettings.tsx`: `SwitchRow` (`form-check form-switch`) per variant + "Reset to starter layout" button. | The "Sidebar collapsed" switch does NOT go through the store: `sidebar-collapse` stays owned/persisted by the PushMenu instance (enablePersistence). The switch reads live state via MutationObserver on `body.class` and toggles through `PushMenu.getOrCreateInstance(.app-sidebar)` Ã¢ resolved from the shell element because the card does not own the sidebar ref (`usePushMenu` needs element attachment). |
| Sidebar menu | "Layout Options" treeview removed from `NAV_ITEMS` (`src/data/nav-items.ts`) with a pointer comment to Settings Ã¢ Layout. `badge`/`sub` doc comments de-staled. | Markup variants (top-nav, custom header area, logo switch) and RTL (needs the `adminlte.rtl.css` stylesheet swap Ã¢ `adminlte.css` has **0** `[dir=rtl]` selectors, 17 loose mentions) stay deferred to Phase 9. |
| Route | `{ path: 'pages/settings', Component: SettingsPage }` under `AdminLayout` in `src/router.tsx`. | Sidebar "Pages Ã¢Ã¢ Settings" leaf now resolves to the real page. |
| Gate | `npx tsc -b --force` clean; `pnpm run build`: JS **705.1 kB / 182.9 kB gz**, CSS 403.1 kB / 59.6 kB gz. Dev server left running on :5173 Ã¢ **no browser preview/verification per user instruction**. | Scratch conversion `src/pages/scratch-Settings.tsx` deleted. |
