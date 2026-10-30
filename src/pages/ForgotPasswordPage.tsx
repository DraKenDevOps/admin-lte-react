import { useDocumentTitle } from "./use-document-title";

export default function ForgotPasswordPage() {
    useDocumentTitle("IT Shop | Forgot Password");
    return (
        <>
            <div className="login-page bg-body-secondary">
                <div className="login-box">
                    <h1 className="login-logo">
                        <a href="/">
                            <b>Admin</b>
                            LTE
                        </a>
                    </h1>
                    <div className="card">
                        <div className="card-body login-card-body">
                            <p className="login-box-msg">You forgot your password? Here you can easily retrieve a new password.</p>
                            <form action="/login" method="post">
                                <label className="visually-hidden" htmlFor="forgotEmail">
                                    Email
                                </label>
                                <div className="input-group mb-3">
                                    <input id="forgotEmail" type="email" className="form-control" placeholder="Email" />
                                    <div className="input-group-text">
                                        <span className="bi bi-envelope"></span>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="d-grid gap-2">
                                            <button type="submit" className="btn btn-primary">
                                                Request new password
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <p className="mt-3 mb-1">
                                <a href="/login">Login</a>
                            </p>
                            <p className="mb-0">
                                <a href="/register" className="text-center">
                                    Register a new membership
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
