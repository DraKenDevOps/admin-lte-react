import { createBrowserRouter } from "react-router";
import AdminLayout from "./layout/AdminLayout";
import PublicLayout from "./layout/PublicLayout";
import { requireWebToken } from "./middleware/require-web-token";
import { unknownPath } from "./middleware/unknown-path";
import DashboardPage from "./pages/DashboardPage";
import AppSettingsPage from "./pages/AppSettingsPage";
import ApexChartsPage from "./pages/charts/ApexChartsPage";
import ElementsPage from "./pages/forms/ElementsPage";
import LayoutPage from "./pages/forms/LayoutPage";
import ValidationPage from "./pages/forms/ValidationPage";
import WizardPage from "./pages/forms/WizardPage";
import AdvancedPage from "./pages/forms/AdvancedPage";
import EditorsPage from "./pages/forms/EditorsPage";
import ProfilePage from "./pages/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage";
import ServerErrorPage from "./pages/ServerErrorPage";
import MaintenancePage from "./pages/MaintenancePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import LockscreenPage from "./pages/LockscreenPage";

export const router = createBrowserRouter([
    {
        Component: AdminLayout,
        middleware: [requireWebToken],
        children: [
            { index: true, Component: DashboardPage },
            { path: "charts/apexcharts", Component: ApexChartsPage },
            { path: "forms/elements", Component: ElementsPage },
            { path: "forms/layout", Component: LayoutPage },
            { path: "forms/validation", Component: ValidationPage },
            { path: "forms/wizard", Component: WizardPage },
            { path: "forms/advanced", Component: AdvancedPage },
            { path: "forms/editors", Component: EditorsPage },
            { path: "settings", Component: AppSettingsPage },
            { path: "profile", Component: ProfilePage },
            { path: "404", Component: NotFoundPage },
            { path: "500", Component: ServerErrorPage },
            { path: "maintenance", Component: MaintenancePage }
        ]
    },
    {
        Component: PublicLayout,
        children: [
            { path: "login", Component: LoginPage },
            { path: "register", Component: RegisterPage },
            { path: "forgot-password", Component: ForgotPasswordPage },
            { path: "lockscreen", Component: LockscreenPage }
        ]
    },
    { path: "*", middleware: [unknownPath] }
]);
