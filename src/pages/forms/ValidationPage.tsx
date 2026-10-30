import { useDocumentTitle } from "../use-document-title";
import { useFormValidation } from "../../lib/plugins/form-widgets";

export default function ValidationPage() {
    useDocumentTitle("IT Shop | Form Validation");
    const formValidationRef = useFormValidation();
    return (
        <>
            <div className="app-content-header">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-6">
                            <h1 className="mb-0 fs-3">Form Validation</h1>
                        </div>
                        <div className="col-sm-6">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb float-sm-end">
                                    <li className="breadcrumb-item">
                                        <a href="#">Home</a>
                                    </li>
                                    <li className="breadcrumb-item">
                                        <a href="#">Forms</a>
                                    </li>
                                    <li className="breadcrumb-item active" aria-current="page">
                                        Validation
                                    </li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            <div className="app-content" ref={formValidationRef}>
                <div className="container-fluid">
                    <div className="row g-4">
                        <div className="col-12">
                            <div className="callout callout-info">
                                Built on
                                <a
                                    href="https://getbootstrap.com/docs/5.3/forms/validation/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="callout-link"
                                >
                                    Bootstrap's native form validation
                                </a>
                                — submit each form to see the feedback. The wiring script lives at the bottom of this page.
                            </div>
                        </div>
                        {/*  Custom validation */}
                        <div className="col-lg-6">
                            <div className="card card-info card-outline mb-4">
                                <div className="card-header">
                                    <div className="card-title">Custom Validation</div>
                                </div>
                                <form className="needs-validation" noValidate>
                                    <div className="card-body">
                                        <div className="row g-3">
                                            <div className="col-md-6">
                                                <label htmlFor="validationCustom01" className="form-label">
                                                    First name
                                                </label>
                                                <input type="text" className="form-control" id="validationCustom01" defaultValue="Mark" required />
                                                <div className="valid-feedback">Looks good!</div>
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="validationCustom02" className="form-label">
                                                    Last name
                                                </label>
                                                <input type="text" className="form-control" id="validationCustom02" defaultValue="Otto" required />
                                                <div className="valid-feedback">Looks good!</div>
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="validationCustomUsername" className="form-label">
                                                    Username
                                                </label>
                                                <div className="input-group has-validation">
                                                    <span className="input-group-text" id="inputGroupPrepend">
                                                        @
                                                    </span>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="validationCustomUsername"
                                                        aria-describedby="inputGroupPrepend"
                                                        required
                                                    />
                                                    <div className="invalid-feedback">Please choose a username.</div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="validationCustom03" className="form-label">
                                                    City
                                                </label>
                                                <input type="text" className="form-control" id="validationCustom03" required />
                                                <div className="invalid-feedback">Please provide a valid city.</div>
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="validationCustom04" className="form-label">
                                                    State
                                                </label>
                                                <select className="form-select" id="validationCustom04" required defaultValue="">
                                                    <option disabled value="">
                                                        Choose…
                                                    </option>
                                                    <option>California</option>
                                                    <option>Washington</option>
                                                    <option>Tennessee</option>
                                                </select>
                                                <div className="invalid-feedback">Please select a valid state.</div>
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="validationCustom05" className="form-label">
                                                    Zip
                                                </label>
                                                <input type="text" className="form-control" id="validationCustom05" required />
                                                <div className="invalid-feedback">Please provide a valid zip.</div>
                                            </div>
                                            <div className="col-12">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" value="" id="invalidCheck" required />
                                                    <label className="form-check-label" htmlFor="invalidCheck">
                                                        Agree to terms and conditions
                                                    </label>
                                                    <div className="invalid-feedback">You must agree before submitting.</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-footer">
                                        <button className="btn btn-info" type="submit">
                                            Submit form
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        {/*  Browser-default validation + tooltips */}
                        <div className="col-lg-6">
                            <div className="card card-success card-outline mb-4">
                                <div className="card-header">
                                    <div className="card-title">Browser Defaults & Tooltips</div>
                                </div>
                                <div className="card-body">
                                    <p className="text-secondary small">
                                        For browser-native validation feedback, omit
                                        <code>novalidate</code>
                                        and the
                                        <code>.needs-validation</code>
                                        class.
                                    </p>
                                    <form>
                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="defaultEmail">
                                                Email
                                            </label>
                                            <input type="email" className="form-control" id="defaultEmail" required />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="defaultUrl">
                                                URL
                                            </label>
                                            <input type="url" className="form-control" id="defaultUrl" required />
                                        </div>
                                        <button className="btn btn-success" type="submit">
                                            Submit (browser default)
                                        </button>
                                    </form>
                                    <hr className="my-4" />
                                    <p className="text-secondary small">
                                        Add
                                        <code>.needs-validation-tooltip</code>
                                        in place of
                                        <code>.needs-validation</code>
                                        to swap inline feedback for floating tooltips.
                                    </p>
                                    <form className="needs-validation-tooltip position-relative" noValidate>
                                        <div className="row g-3">
                                            <div className="col-md-6">
                                                <label htmlFor="vt-first" className="form-label">
                                                    First name
                                                </label>
                                                <input type="text" className="form-control" id="vt-first" defaultValue="Jane" required />
                                                <div className="valid-tooltip">Looks good!</div>
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="vt-username" className="form-label">
                                                    Username
                                                </label>
                                                <input type="text" className="form-control" id="vt-username" required />
                                                <div className="invalid-tooltip">Please choose a username.</div>
                                            </div>
                                            <div className="col-12">
                                                <button className="btn btn-success" type="submit">
                                                    Submit (tooltip)
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
