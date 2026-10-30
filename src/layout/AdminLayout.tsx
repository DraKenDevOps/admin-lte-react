// AdminLayout — the persistent shell (README §3): `app-wrapper` → sidebar /
// header / main / footer. Mounts exactly once for the app's lifetime;
// route content mounts inside `main.app-main` and may be discarded freely on
// navigation. Shell-only effects live here (MIGRATION-PLAN §3.1).
//
// Layout variants (`layout/*.html`) become props of this component in
// Phase 9; until then their body-class configuration moves behind
// <LayoutSettingsProvider> (Settings → Layout), which owns the layout classes.

import { Outlet } from "react-router";
import { useShellBootstrap } from "../lib/adminlte";
import { ColorModeProvider } from "../theme/color-mode";
import { LayoutSettingsProvider, useLayoutSettings } from "../settings/layout-settings";
import { AppHeader } from "./AppHeader";
import { AppSidebar } from "./AppSidebar";
import { AppFooter } from "./AppFooter";

function ShellFrame() {
    const { topNav, customArea } = useLayoutSettings();

    return (
        <div className="app-wrapper">
            <AppHeader />
            {topNav ? null : <AppSidebar />}
            <main className="app-main">
                <Outlet />
                {customArea ? (
                    <div className="app-content-bottom-area">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-6">
                                    <div>App Content Bottom Area</div>
                                </div>
                                <div className="col-md-6 text-end">
                                    <button type="submit" className="btn btn-secondary" name="save" value="create">
                                        Refresh
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null}
            </main>
            <AppFooter />
        </div>
    );
}

export default function AdminLayout() {
    useShellBootstrap();

    return (
        <LayoutSettingsProvider>
            <ColorModeProvider>
                <ShellFrame />
            </ColorModeProvider>
        </LayoutSettingsProvider>
    );
}
