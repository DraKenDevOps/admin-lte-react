import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { STORAGE_KEYS } from "../utils/keys";
import { useDocumentTitle } from "./use-document-title";

type LoginValues = {
    username: string;
    password: string;
};

export default function LoginPage() {
    useDocumentTitle("IT Shop | Login Page");
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors, submitCount }
    } = useForm<LoginValues>();

    const onSubmit = (data: LoginValues) => {
        try {
            const cred = btoa(Object.values(data).join(":"));
            localStorage.setItem(STORAGE_KEYS.webToken, cred + ":f9025caf418a40fe84d6e218acaad6c4");
            navigate("/");
        } catch {
            // unknown
        }
    };
    return (
        <div className="login-page bg-body-secondary">
            <div className="login-box">
                <h1 className="login-logo">IT SHOP</h1>
                <div className="card">
                    <div className="card-body login-card-body">
                        <p className="login-box-msg">Sign in to start your session</p>
                        <form noValidate className={submitCount > 0 ? "was-validated" : undefined} onSubmit={handleSubmit(onSubmit)}>
                            <label className="visually-hidden" htmlFor="username">
                                Username
                            </label>
                            <div className="input-group has-validation mb-3">
                                <input
                                    style={{
                                        borderTopRightRadius: 0,
                                        borderBottomRightRadius: 0
                                    }}
                                    id="username"
                                    type="text"
                                    className={errors.username ? "form-control is-invalid" : "form-control"}
                                    placeholder="Username"
                                    required
                                    {...register("username", { required: "Username is required" })}
                                />
                                <div className="input-group-text">
                                    <span className="bi bi-person"></span>
                                </div>
                                {errors.username ? <div className="invalid-feedback">{errors.username.message}</div> : null}
                            </div>
                            <label className="visually-hidden" htmlFor="password">
                                Password
                            </label>
                            <div className="input-group has-validation mb-3">
                                <input
                                    style={{
                                        borderTopRightRadius: 0,
                                        borderBottomRightRadius: 0
                                    }}
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    className={errors.password ? "form-control is-invalid" : "form-control"}
                                    placeholder="Password"
                                    required
                                    {...register("password", { required: "Password is required" })}
                                />
                                <button
                                    type="button"
                                    className="input-group-text"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                    aria-pressed={showPassword}
                                    onClick={() => setShowPassword((visible) => !visible)}
                                >
                                    <span className={showPassword ? "bi bi-eye-slash" : "bi bi-eye"}></span>
                                </button>
                                {errors.password ? <div className="invalid-feedback">{errors.password.message}</div> : null}
                            </div>
                            <div className="row">
                                {/* <div className="col-8">
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                            Remember Me
                                        </label>
                                    </div>
                                </div> */}
                                <div className="col-4 ms-auto">
                                    <div className="d-grid gap-2">
                                        <button type="submit" className="btn btn-primary border-0">
                                            Sign In
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                        {/* <div className="social-auth-links text-center mb-3 d-grid gap-2">
                            <p>- OR -</p>
                            <a href="#" className="btn btn-primary">
                                <i className="bi bi-facebook me-2"></i>
                                Sign in using Facebook
                            </a>
                            <a href="#" className="btn btn-danger">
                                <i className="bi bi-google me-2"></i>
                                Sign in using Google
                            </a>
                        </div> */}
                        {/* <p className="mb-1">
                            <a href="/forgot-password">I forgot my password</a>
                        </p>
                        <p className="mb-0">
                            <a href="/register" className="text-center">
                                Register a new membership
                            </a>
                        </p> */}
                    </div>
                </div>
            </div>
        </div>
    );
}
