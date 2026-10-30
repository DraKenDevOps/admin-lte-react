import { useDocumentTitle } from "./use-document-title";

export default function RegisterPage() {
    useDocumentTitle("IT Shop | Register Page");
    return (
        <>
            <div className="register-page bg-body-secondary">
                <div className="register-box">
                    <h1 className="register-logo">
                        <a href="/">
                            <b>Admin</b>
                            LTE
                        </a>
                    </h1>
                    <div className="card">
                        <div className="card-body register-card-body">
                            <p className="register-box-msg">Register a new membership</p>
                            <form action="/" method="post">
                                <label className="visually-hidden" htmlFor="registerName">
                                    Full Name
                                </label>
                                <div className="input-group mb-3">
                                    <input id="registerName" type="text" className="form-control" placeholder="Full Name" />
                                    <div className="input-group-text">
                                        <span className="bi bi-person"></span>
                                    </div>
                                </div>
                                <label className="visually-hidden" htmlFor="registerEmail">
                                    Email
                                </label>
                                <div className="input-group mb-3">
                                    <input id="registerEmail" type="email" className="form-control" placeholder="Email" />
                                    <div className="input-group-text">
                                        <span className="bi bi-envelope"></span>
                                    </div>
                                </div>
                                <label className="visually-hidden" htmlFor="registerPassword">
                                    Password
                                </label>
                                <div className="input-group mb-3">
                                    <input id="registerPassword" type="password" className="form-control" placeholder="Password" />
                                    <div className="input-group-text">
                                        <span className="bi bi-lock-fill"></span>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-8">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                                I agree to the
                                                <a href="#">terms</a>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="d-grid gap-2">
                                            <button type="submit" className="btn btn-primary">
                                                Register
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <div className="social-auth-links text-center mb-3 d-grid gap-2">
                                <p>- OR -</p>
                                <a href="#" className="btn btn-primary">
                                    <i className="bi bi-facebook me-2"></i>
                                    Sign up using Facebook
                                </a>
                                <a href="#" className="btn btn-danger">
                                    <i className="bi bi-google me-2"></i>
                                    Sign up using Google
                                </a>
                            </div>
                            <p className="mb-0">
                                <a href="/login" className="text-center">
                                    I already have a membership
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
