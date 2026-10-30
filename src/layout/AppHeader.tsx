import { useNavigate } from "react-router";
import user2 from "../assets/img/user2-160x160.jpg";
import { ThemeToggler } from "../components/ThemeToggler";
import { STORAGE_KEYS } from "../utils/keys";

export function AppHeader() {
    const navigate = useNavigate();
    function logout() {
        localStorage.removeItem(STORAGE_KEYS.webToken);
        navigate("/login", { replace: true });
    }

    return (
        <nav className="app-header navbar navbar-expand bg-body">
            <div className="container-fluid">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" data-lte-toggle="sidebar" href="#" role="button" aria-label="Toggle sidebar">
                            <i className="bi bi-list"></i>
                        </a>
                    </li>
                </ul>
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item dropdown">
                        <a
                            className="nav-link"
                            href="#"
                            id="language-menu"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            aria-label="Change language, current language English"
                        >
                            <i className="bi bi-translate" aria-hidden="true"></i>
                        </a>
                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="language-menu">
                            <li>
                                <a className="dropdown-item active" href="#" hrefLang="en" aria-current="true">
                                    English
                                    <i className="bi bi-check-lg ms-2" aria-hidden="true"></i>
                                </a>
                            </li>
                            <li>
                                <a className="dropdown-item" href="#" hrefLang="es">
                                    Español
                                </a>
                            </li>
                            <li>
                                <a className="dropdown-item" href="#" hrefLang="fr">
                                    Français
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#" data-lte-toggle="fullscreen" aria-label="Toggle fullscreen">
                            <i data-lte-icon="maximize" className="bi bi-arrows-fullscreen"></i>
                            <i data-lte-icon="minimize" className="bi bi-fullscreen-exit d-none"></i>
                        </a>
                    </li>
                    <ThemeToggler />

                    <li className="nav-item dropdown user-menu">
                        <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                            <img src={user2} className="user-image rounded-circle shadow" alt="" />
                            <span className="d-none d-xl-inline">Hacker</span>
                        </a>
                        <ul className="dropdown-menu dropdown-menu-lg dropdown-menu-end">
                            <li className="user-header text-bg-secondary">
                                <img src={user2} className="rounded-circle shadow" alt="" />
                                <p>Hacker - Web Developer</p>
                            </li>
                            <li className="user-footer">
                                <button className="btn btn-outline-danger float-end" onClick={logout}>
                                    Sign out
                                </button>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
