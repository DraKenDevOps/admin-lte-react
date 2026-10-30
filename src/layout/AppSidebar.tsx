// AppSidebar — port of the `<aside class="app-sidebar">` block of
// `starter.html`. SidebarSearch and Treeview are delegation-covered
// (README §4.3.1): no React handlers on their markup. OverlayScrollbars gets
// an instance through the shipped hook, with the ≤ 992 px mobile guard.

import { useOverlayScrollbars, usePushMenu } from "../lib/adminlte";
import { useLayoutSettings } from "../settings/layout-settings";
import { SidebarNav } from "./SidebarNav";
import logo from "../assets/img/AdminLTELogo.png";

export function AppSidebar() {
    const sidebarRef = usePushMenu();
    const wrapperRef = useOverlayScrollbars();
    const { filterMenu } = useLayoutSettings();

    return (
        <aside ref={sidebarRef} className="app-sidebar bg-body-secondary shadow" data-bs-theme="dark">
            <div className="sidebar-brand">
                <a href="/" className="brand-link">
                    <img src={logo} alt="AdminLTE Logo" className="brand-image opacity-75 shadow" />
                    <span className="brand-text fw-light">AdminLTE 4</span>
                </a>
            </div>
            {filterMenu ? (
                <div className="sidebar-search" role="search">
                    <label htmlFor="sidebar-search-input" className="visually-hidden">
                        Filter menu
                    </label>
                    <input
                        type="search"
                        id="sidebar-search-input"
                        className="form-control form-control-sm"
                        placeholder="Filter menu…"
                        autoComplete="off"
                        data-lte-toggle="sidebar-search"
                        data-lte-target="#navigation"
                    />
                    <p className="fs-7 text-secondary mt-2 mb-0" data-lte-search-empty role="status" hidden>
                        No matching pages.
                    </p>
                </div>
            ) : null}
            <div className="sidebar-wrapper" ref={wrapperRef}>
                <nav className="mt-2" aria-label="Main navigation">
                    <SidebarNav />
                </nav>
            </div>
        </aside>
    );
}
