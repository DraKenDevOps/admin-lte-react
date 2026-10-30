// LayoutSettings — the "Layout" tab of the Settings component. Ports the
// settings patterns of `pages/settings.html` (list-group nav pills, cards with
// `form-check form-switch` rows) and exposes every body-class layout variant
// of the dist `layout/*.html` pages as a switch (MIGRATION-PLAN §4.6: layout
// variants become a typed flag surface, not separate pages/routes).
//
// Collapsed is a flag on the layout store (`sidebar-collapse`), same writer
// as the other switches. Top nav and the custom content areas live on
// `/settings`.

import type { ReactNode } from "react";
import { useLayoutSettings } from "../settings/layout-settings";

/** One `form-check form-switch` settings row (dist settings.html pattern). */
function SwitchRow({
    title,
    description,
    htmlFor,
    checked,
    onChange,
    disabled
}: {
    title: ReactNode;
    description: ReactNode;
    htmlFor: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    disabled?: boolean;
}) {
    return (
        <div className="d-flex justify-content-between align-items-start py-2 border-bottom">
            <div>
                <p className="mb-0 fw-semibold">{title}</p>
                <small className="text-secondary">{description}</small>
            </div>
            <div className="form-check form-switch mb-0 ps-0 pe-4">
                <label className="visually-hidden" htmlFor={htmlFor}>
                    Toggle {htmlFor}
                </label>
                <input
                    className="form-check-input ms-0"
                    type="checkbox"
                    role="switch"
                    id={htmlFor}
                    checked={checked}
                    disabled={disabled}
                    onChange={(event) => onChange(event.target.checked)}
                />
            </div>
        </div>
    );
}

export default function LayoutSettings() {
    const settings = useLayoutSettings();
    const { fixedSidebar, fixedHeader, fixedFooter, sidebarMini, collapsed, withoutHover, update, reset } = settings;

    return (
        <div className="tab-pane fade show active" id="layout" role="tabpanel">
            <div className="card">
                <div className="card-header">
                    <h3 className="card-title">Layout</h3>
                </div>
                {/* /.card-header */}
                <div className="card-body">
                    <p className="text-secondary">
                        These switches drive the same body classes as the classic
                        <code className="ms-1">layout/*.html</code> pages — every combination stays
                    </p>
                    <SwitchRow
                        title="Fixed sidebar"
                        description="Sidebar stays fixed while the content area scrolls (layout-fixed)."
                        htmlFor="layout-fixed-sidebar"
                        checked={fixedSidebar}
                        onChange={(checked) => update("fixedSidebar", checked)}
                    />
                    <SwitchRow
                        title="Fixed header"
                        description="Navbar stays pinned to the top of the viewport (fixed-header)."
                        htmlFor="layout-fixed-header"
                        checked={fixedHeader}
                        onChange={(checked) => update("fixedHeader", checked)}
                    />
                    <SwitchRow
                        title="Fixed footer"
                        description="Footer stays pinned to the bottom of the viewport (fixed-footer)."
                        htmlFor="layout-fixed-footer"
                        checked={fixedFooter}
                        onChange={(checked) => update("fixedFooter", checked)}
                    />
                    <SwitchRow
                        title="Mini sidebar"
                        description="Icons-only sidebar that expands on hover (sidebar-mini)."
                        htmlFor="layout-sidebar-mini"
                        checked={sidebarMini}
                        onChange={(checked) => update("sidebarMini", checked)}
                    />
                    <SwitchRow
                        title="Sidebar collapsed"
                        description="Start with the sidebar collapsed (sidebar-collapse). Turning this on also turns on the mini sidebar."
                        htmlFor="layout-sidebar-collapsed"
                        checked={collapsed}
                        onChange={(checked) => update("collapsed", checked)}
                    />
                    <SwitchRow
                        title="Mini sidebar without hover expansion"
                        description="While mini, keep the sidebar collapsed under the cursor (sidebar-without-hover)."
                        htmlFor="layout-without-hover"
                        checked={withoutHover}
                        onChange={(checked) => update("withoutHover", checked)}
                    />
                    <div className="d-flex align-items-center justify-content-between mt-3">
                        <small className="text-secondary">
                            Top-nav, custom header area, logo switch and RTL are layout markup variants and arrive with Phase&nbsp;9.
                        </small>
                        <button type="button" className="btn btn-outline-secondary" onClick={reset}>
                            Reset to starter layout
                        </button>
                    </div>
                </div>
                {/* /.card-body */}
            </div>
            {/* /.card */}
        </div>
    );
}
