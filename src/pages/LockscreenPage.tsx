import { useDocumentTitle } from "./use-document-title";

export default function LockscreenPage() {
    useDocumentTitle("IT Shop | Lockscreen");
    return (
        <>
            <div className="lockscreen bg-body-secondary min-vh-100 py-5">
                <div className="lockscreen-wrapper">
                    <h1 className="lockscreen-logo">
                        <a href="/">
                            <b>Admin</b>
                            LTE
                        </a>
                    </h1>
                    <div className="lockscreen-name">John Doe</div>
                    <div className="lockscreen-item">
                        <div className="lockscreen-image">
                            <img src="/img/user1-128x128.jpg" alt="John Doe" />
                        </div>
                        <form className="lockscreen-credentials">
                            <label className="visually-hidden" htmlFor="lockscreenPassword">
                                Password
                            </label>
                            <div className="input-group">
                                <input id="lockscreenPassword" type="password" className="form-control shadow-none" placeholder="password" />
                                <div className="input-group-text border-0 bg-transparent px-1">
                                    <button type="button" className="btn shadow-none" aria-label="Sign in">
                                        <i className="bi bi-box-arrow-right text-body-secondary"></i>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="help-block text-center">Enter your password to retrieve your session</div>
                    <div className="text-center">
                        <a href="/login" className="text-decoration-none">
                            Or sign in as a different user
                        </a>
                    </div>
                    <div className="lockscreen-footer text-center">
                        Copyright © 2014-2026
                        <b>
                            <a href="https://adminlte.io" className="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">
                                AdminLTE.io
                            </a>
                        </b>
                        <br />
                        All rights reserved
                    </div>
                </div>
            </div>
        </>
    );
}
