import { Outlet } from "react-router";
import { ThemeToggler } from "../components/ThemeToggler";
import { useShellBootstrap } from "../lib/adminlte";

export default function PublicLayout() {
    useShellBootstrap();

    return (
        <>
            <nav className="position-fixed top-0 end-0 p-2" style={{ zIndex: 1030 }} aria-label="Color scheme">
                <ul className="navbar-nav">
                    <ThemeToggler />
                </ul>
            </nav>
            <Outlet />
        </>
    );
}
