import { layoutBodyClasses, useLayoutSettings } from "../settings/layout-settings";
import { useDocumentTitle } from "./use-document-title";

export default function AppSettingsPage() {
    const settings = useLayoutSettings();
    const appliedClasses = layoutBodyClasses(settings).join(" ");
    const { fixedSidebar, fixedHeader, fixedFooter, sidebarMini, collapsed, withoutHover, topNav, customArea, filterMenu, update, reset } = settings;
    useDocumentTitle("IT Shop | Settings");
    return (
        <>
            {customArea ? (
                <div className="app-content-top-area">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-6">
                                <div>App Content Top Area</div>
                            </div>
                            <div className="col-md-6 text-end">
                                <span className="text-secondary">Shown from Layout settings (custom areas)</span>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
            <div className="app-content-header">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-6">
                            <h1 className="mb-0 fs-3">Settings</h1>
                        </div>
                        <div className="col-sm-6">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb float-sm-end">
                                    <li className="breadcrumb-item">
                                        <a href="/">Home</a>
                                    </li>
                                    <li className="breadcrumb-item active" aria-current="page">
                                        Settings
                                    </li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            {/*  svelte-ignore a11y_invalid_attribute */}
            <div className="app-content">
                <div className="container-fluid">
                    <div className="row g-3">
                        {/*  Left rail */}
                        <div className="col-md-3">
                            <div className="list-group list-group-flush nav nav-pills flex-column" id="settings-nav" role="tablist">
                                <a
                                    href="#account"
                                    className="list-group-item list-group-item-action active"
                                    data-bs-toggle="pill"
                                    role="tab"
                                    aria-selected="true"
                                >
                                    <i className="bi bi-person me-2" aria-hidden="true"></i>
                                    Account
                                </a>
                                <a href="#notifications" className="list-group-item list-group-item-action" data-bs-toggle="pill" role="tab">
                                    <i className="bi bi-bell me-2" aria-hidden="true"></i>
                                    Notifications
                                </a>
                                <a href="#security" className="list-group-item list-group-item-action" data-bs-toggle="pill" role="tab">
                                    <i className="bi bi-shield-lock me-2" aria-hidden="true"></i>
                                    Security
                                </a>
                                <a href="#billing" className="list-group-item list-group-item-action" data-bs-toggle="pill" role="tab">
                                    <i className="bi bi-credit-card me-2" aria-hidden="true"></i>
                                    Billing
                                </a>
                                <a href="#layout" className="list-group-item list-group-item-action" data-bs-toggle="pill" role="tab">
                                    <i className="bi bi-columns-gap me-2" aria-hidden="true"></i>
                                    Layout
                                </a>
                                <a href="#danger" className="list-group-item list-group-item-action text-danger-emphasis" data-bs-toggle="pill" role="tab">
                                    <i className="bi bi-exclamation-triangle me-2" aria-hidden="true"></i>
                                    Danger zone
                                </a>
                            </div>
                        </div>
                        {/*  Tab content */}
                        <div className="col-md-9">
                            <div className="tab-content">
                                {/*  Account */}
                                <div className="tab-pane fade show active" id="account" role="tabpanel">
                                    <div className="card">
                                        <div className="card-header">
                                            <h3 className="card-title">Account</h3>
                                        </div>
                                        <div className="card-body">
                                            <form className="row g-3">
                                                <div className="col-md-6">
                                                    <label className="form-label" htmlFor="settings-name">
                                                        Full name
                                                    </label>
                                                    <input type="text" className="form-control" id="settings-name" defaultValue="Jane Doe" />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label" htmlFor="settings-email">
                                                        Email
                                                    </label>
                                                    <input type="email" className="form-control" id="settings-email" defaultValue="jane@example.com" />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label" htmlFor="settings-tz">
                                                        Time zone
                                                    </label>
                                                    <select className="form-select" id="settings-tz" defaultValue="America/Los_Angeles">
                                                        <option>UTC</option>
                                                        <option>America/Los_Angeles</option>
                                                        <option>Europe/London</option>
                                                        <option>Asia/Tokyo</option>
                                                    </select>
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label" htmlFor="settings-lang">
                                                        Language
                                                    </label>
                                                    <select className="form-select" id="settings-lang" defaultValue="English">
                                                        <option>English</option>
                                                        <option>Español</option>
                                                        <option>Français</option>
                                                        <option>Deutsch</option>
                                                    </select>
                                                </div>
                                                <div className="col-12">
                                                    <button type="submit" className="btn btn-primary">
                                                        Save changes
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                {/*  Notifications */}
                                <div className="tab-pane fade" id="notifications" role="tabpanel">
                                    <div className="card">
                                        <div className="card-header">
                                            <h3 className="card-title">Notifications</h3>
                                        </div>
                                        <div className="card-body">
                                            <p className="text-secondary">Choose what to be notified about.</p>
                                            <div className="d-flex justify-content-between align-items-start py-2 border-bottom">
                                                <div>
                                                    <p className="mb-0 fw-semibold">Product updates</p>
                                                    <small className="text-secondary">Major releases and changelogs</small>
                                                </div>
                                                <div className="form-check form-switch mb-0">
                                                    <input className="form-check-input" type="checkbox" role="switch" id="notif-0" defaultChecked />
                                                    <label className="visually-hidden" htmlFor="notif-0">
                                                        Toggle Product updates
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-between align-items-start py-2 border-bottom">
                                                <div>
                                                    <p className="mb-0 fw-semibold">Security alerts</p>
                                                    <small className="text-secondary">Sign-in attempts and account changes</small>
                                                </div>
                                                <div className="form-check form-switch mb-0">
                                                    <input className="form-check-input" type="checkbox" role="switch" id="notif-1" defaultChecked />
                                                    <label className="visually-hidden" htmlFor="notif-1">
                                                        Toggle Security alerts
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-between align-items-start py-2 border-bottom">
                                                <div>
                                                    <p className="mb-0 fw-semibold">Weekly digest</p>
                                                    <small className="text-secondary">A summary of activity in your workspace</small>
                                                </div>
                                                <div className="form-check form-switch mb-0">
                                                    <input className="form-check-input" type="checkbox" role="switch" id="notif-2" />
                                                    <label className="visually-hidden" htmlFor="notif-2">
                                                        Toggle Weekly digest
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-between align-items-start py-2 border-bottom">
                                                <div>
                                                    <p className="mb-0 fw-semibold">Mentions</p>
                                                    <small className="text-secondary">When a teammate @mentions you</small>
                                                </div>
                                                <div className="form-check form-switch mb-0">
                                                    <input className="form-check-input" type="checkbox" role="switch" id="notif-3" />
                                                    <label className="visually-hidden" htmlFor="notif-3">
                                                        Toggle Mentions
                                                    </label>
                                                </div>
                                            </div>
                                            <button className="btn btn-primary mt-3">Save preferences</button>
                                        </div>
                                    </div>
                                </div>
                                {/*  Security */}
                                <div className="tab-pane fade" id="security" role="tabpanel">
                                    <div className="card">
                                        <div className="card-header">
                                            <h3 className="card-title">Password</h3>
                                        </div>
                                        <div className="card-body">
                                            <form className="row g-3">
                                                <div className="col-md-12">
                                                    <label className="form-label" htmlFor="pwd-current">
                                                        Current password
                                                    </label>
                                                    <input type="password" className="form-control" id="pwd-current" />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label" htmlFor="pwd-new">
                                                        New password
                                                    </label>
                                                    <input type="password" className="form-control" id="pwd-new" />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label" htmlFor="pwd-confirm">
                                                        Confirm new password
                                                    </label>
                                                    <input type="password" className="form-control" id="pwd-confirm" />
                                                </div>
                                                <div className="col-12">
                                                    <button type="submit" className="btn btn-primary">
                                                        Update password
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="card mt-3">
                                        <div className="card-header">
                                            <h3 className="card-title">Two-factor authentication</h3>
                                        </div>
                                        <div className="card-body d-flex justify-content-between align-items-center">
                                            <div>
                                                <p className="mb-0 fw-semibold">Authenticator app</p>
                                                <small className="text-secondary">Use an authenticator app such as 1Password or Authy.</small>
                                            </div>
                                            <button className="btn btn-outline-primary">Enable</button>
                                        </div>
                                    </div>
                                </div>
                                {/*  Billing */}
                                <div className="tab-pane fade" id="billing" role="tabpanel">
                                    <div className="card">
                                        <div className="card-header">
                                            <h3 className="card-title">Current plan</h3>
                                        </div>
                                        <div className="card-body">
                                            <div className="d-flex justify-content-between align-items-center mb-3">
                                                <div>
                                                    <p className="mb-0 fw-semibold">Pro plan</p>
                                                    <small className="text-secondary">$29 / month · Renews June 18, 2026</small>
                                                </div>
                                                <a href="#" className="btn btn-outline-primary btn-sm">
                                                    Change plan
                                                </a>
                                            </div>
                                            <hr />
                                            <p className="fw-semibold mb-2">Payment method</p>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div>
                                                    <i className="bi bi-credit-card-2-front me-2" aria-hidden="true"></i>
                                                    Visa ending in 4242
                                                </div>
                                                <a href="#" className="btn btn-link btn-sm">
                                                    Update
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/*  Layout */}
                                <div className="tab-pane fade" id="layout" role="tabpanel">
                                    <div className="card">
                                        <div className="card-header">
                                            <h3 className="card-title">Layout</h3>
                                        </div>
                                        <div className="card-body">
                                            <p className="text-secondary">
                                                The former
                                                <code>layout/*.html</code>
                                                pages, gathered as switches. Changes apply immediately on this page and persist in this browser via
                                                <code>localStorage</code>.
                                            </p>
                                            <p className="fw-semibold mb-2">Sidebar</p>
                                            <div className="d-flex justify-content-between align-items-start py-2 border-bottom">
                                                <div>
                                                    <p className="mb-0 fw-semibold">Fixed sidebar</p>
                                                    <small className="text-secondary">
                                                        Sidebar scrolls with the page when off (<code>layout-fixed</code>
                                                        on
                                                        <code>&lt;body&gt;</code>)
                                                    </small>
                                                </div>
                                                <div className="form-check form-switch mb-0">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        role="switch"
                                                        id="layout-sidebar-fixed"
                                                        checked={fixedSidebar}
                                                        disabled={topNav}
                                                        onChange={(event) => update("fixedSidebar", event.target.checked)}
                                                    />
                                                    <label className="visually-hidden" htmlFor="layout-sidebar-fixed">
                                                        Toggle fixed sidebar
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-between align-items-start py-2 border-bottom">
                                                <div>
                                                    <p className="mb-0 fw-semibold">Sidebar mini</p>
                                                    <small className="text-secondary">
                                                        Icon-only compact sidebar; the collapsed state below only applies with this on
                                                    </small>
                                                </div>
                                                <div className="form-check form-switch mb-0">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        role="switch"
                                                        id="layout-sidebar-mini"
                                                        checked={sidebarMini}
                                                        disabled={topNav}
                                                        onChange={(event) => update("sidebarMini", event.target.checked)}
                                                    />
                                                    <label className="visually-hidden" htmlFor="layout-sidebar-mini">
                                                        Toggle sidebar mini
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-between align-items-start py-2 border-bottom">
                                                <div>
                                                    <p className="mb-0 fw-semibold">Sidebar collapsed on load</p>
                                                    <small className="text-secondary">
                                                        Starts every visit collapsed (<code>sidebar-collapse</code>
                                                        ); implies Sidebar Mini
                                                    </small>
                                                </div>
                                                <div className="form-check form-switch mb-0">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        role="switch"
                                                        id="layout-sidebar-collapsed"
                                                        checked={collapsed}
                                                        disabled={topNav}
                                                        onChange={(event) => update("collapsed", event.target.checked)}
                                                    />
                                                    <label className="visually-hidden" htmlFor="layout-sidebar-collapsed">
                                                        Toggle sidebar collapsed on load
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-between align-items-start py-2 border-bottom">
                                                <div>
                                                    <p className="mb-0 fw-semibold">Hover expand</p>
                                                    <small className="text-secondary">
                                                        Hovering expands the collapsed mini sidebar; turning this off recreates the “Sidebar Mini + Collapsed +
                                                        No Hover” variant
                                                    </small>
                                                </div>
                                                <div className="form-check form-switch mb-0">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        role="switch"
                                                        id="layout-hover-expand"
                                                        checked={!withoutHover}
                                                        disabled={topNav}
                                                        onChange={(event) => update("withoutHover", !event.target.checked)}
                                                    />
                                                    <label className="visually-hidden" htmlFor="layout-hover-expand">
                                                        Toggle hover expand
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-between align-items-start py-2 border-bottom">
                                                <div>
                                                    <p className="mb-0 fw-semibold">Filter menu</p>
                                                    <small className="text-secondary">Shows the sidebar search that filters menu labels</small>
                                                </div>
                                                <div className="form-check form-switch mb-0">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        role="switch"
                                                        id="layout-filter-menu"
                                                        checked={filterMenu}
                                                        disabled={topNav}
                                                        onChange={(event) => update("filterMenu", event.target.checked)}
                                                    />
                                                    <label className="visually-hidden" htmlFor="layout-filter-menu">
                                                        Toggle filter menu
                                                    </label>
                                                </div>
                                            </div>
                                            <p className="fw-semibold mb-2 mt-3">Positioning</p>
                                            <div className="d-flex justify-content-between align-items-start py-2 border-bottom">
                                                <div>
                                                    <p className="mb-0 fw-semibold">Fixed header</p>
                                                    <small className="text-secondary">
                                                        Sticky app header (<code>fixed-header</code>; “Fixed Complete” = this + fixed footer)
                                                    </small>
                                                </div>
                                                <div className="form-check form-switch mb-0">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        role="switch"
                                                        id="layout-header-fixed"
                                                        checked={fixedHeader}
                                                        onChange={(event) => update("fixedHeader", event.target.checked)}
                                                    />
                                                    <label className="visually-hidden" htmlFor="layout-header-fixed">
                                                        Toggle fixed header
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-between align-items-start py-2">
                                                <div>
                                                    <p className="mb-0 fw-semibold">Fixed footer</p>
                                                    <small className="text-secondary">
                                                        Sticky app footer (<code>fixed-footer</code>)
                                                    </small>
                                                </div>
                                                <div className="form-check form-switch mb-0">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        role="switch"
                                                        id="layout-footer-fixed"
                                                        checked={fixedFooter}
                                                        onChange={(event) => update("fixedFooter", event.target.checked)}
                                                    />
                                                    <label className="visually-hidden" htmlFor="layout-footer-fixed">
                                                        Toggle fixed footer
                                                    </label>
                                                </div>
                                            </div>
                                            <p className="fw-semibold mb-2 mt-3">Header only & brand</p>
                                            <div className="d-flex justify-content-between align-items-start py-2 border-bottom">
                                                <div>
                                                    <p className="mb-0 fw-semibold">Top navigation</p>
                                                    <small className="text-secondary">
                                                        Header-only layout without the sidebar; primary navigation lives in the app header
                                                    </small>
                                                </div>
                                                <div className="form-check form-switch mb-0">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        role="switch"
                                                        id="layout-top-nav"
                                                        checked={topNav}
                                                        onChange={(event) => update("topNav", event.target.checked)}
                                                    />
                                                    <label className="visually-hidden" htmlFor="layout-top-nav">
                                                        Toggle top navigation
                                                    </label>
                                                </div>
                                            </div>
                                            <p className="fw-semibold mb-2 mt-3">Content areas</p>
                                            <div className="d-flex justify-content-between align-items-start py-2 border-bottom">
                                                <div>
                                                    <p className="mb-0 fw-semibold">Custom areas</p>
                                                    <small className="text-secondary">
                                                        Shows the top/bottom custom content areas (demo lives on this page)
                                                    </small>
                                                </div>
                                                <div className="form-check form-switch mb-0">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        role="switch"
                                                        id="layout-custom-areas"
                                                        checked={customArea}
                                                        onChange={(event) => update("customArea", event.target.checked)}
                                                    />
                                                    <label className="visually-hidden" htmlFor="layout-custom-areas">
                                                        Toggle custom areas
                                                    </label>
                                                </div>
                                            </div>
                                            <p className="fs-7 text-body-secondary mt-3 mb-2">
                                                Current body classes:
                                                <code>{appliedClasses}</code>
                                            </p>
                                            <button type="button" className="btn btn-outline-secondary btn-sm" id="layout-reset" onClick={reset}>
                                                <i className="bi bi-arrow-counterclockwise me-1" aria-hidden="true"></i>
                                                Reset to defaults
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                {/*  Danger zone */}
                                <div className="tab-pane fade" id="danger" role="tabpanel">
                                    <div className="card border-danger">
                                        <div className="card-header bg-danger-subtle">
                                            <h3 className="card-title text-danger-emphasis">Danger zone</h3>
                                        </div>
                                        <div className="card-body">
                                            <div className="d-flex justify-content-between align-items-start mb-3">
                                                <div>
                                                    <p className="mb-0 fw-semibold">Export account data</p>
                                                    <small className="text-secondary">Download a copy of all your data as a ZIP archive.</small>
                                                </div>
                                                <button className="btn btn-outline-secondary">Export</button>
                                            </div>
                                            <hr />
                                            <div className="d-flex justify-content-between align-items-start">
                                                <div>
                                                    <p className="mb-0 fw-semibold text-danger-emphasis">Delete account</p>
                                                    <small className="text-secondary">
                                                        This will permanently delete your account and all associated data. This cannot be undone.
                                                    </small>
                                                </div>
                                                <button className="btn btn-danger">Delete account</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
