import { useDocumentTitle } from "./use-document-title";

export default function MaintenancePage() {
    useDocumentTitle("IT Shop | Maintenance");
    return (
        <div className="d-flex align-items-center min-vh-100 py-5">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6 text-center">
                        <i className="bi bi-tools text-warning" aria-hidden="true" style={{ fontSize: "4rem" }}></i>
                        <h1 className="h3 mt-3 mb-2">We’ll be right back.</h1>
                        <p className="text-secondary mb-4">
                            The application is undergoing scheduled maintenance. We expect to be back online shortly. Thanks for your patience.
                        </p>
                        <div className="card mx-auto" style={{ maxWidth: "24rem" }}>
                            <div className="card-body text-start">
                                <p className="text-secondary small mb-2">Estimated completion</p>
                                <p className="fw-semibold mb-0">
                                    <i className="bi bi-clock me-1" aria-hidden="true"></i>
                                    In approximately 30 minutes
                                </p>
                            </div>
                        </div>
                        <p className="text-secondary small mt-4 mb-0">
                            For urgent issues, reach us at
                            <a href="mailto:support@example.com">support@example.com</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
