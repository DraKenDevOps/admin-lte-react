import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { useDocumentTitle } from "../use-document-title";
import { useQuill } from "../../lib/plugins/form-widgets";

const snowConfig = {
    theme: "snow",
    placeholder: "Compose the announcement...",
    modules: {
        toolbar: [
            [{ header: [2, 3, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ indent: "-1" }, { indent: "+1" }],
            ["blockquote", "code-block"],
            ["link", "clean"]
        ]
    }
};

const bubbleConfig = {
    theme: "bubble",
    placeholder: "Click here and start typing..."
};

export default function EditorsPage() {
    useDocumentTitle("IT Shop | Editors");
    const snowConfigRef = useQuill(snowConfig);
    const bubbleConfigRef = useQuill(bubbleConfig);
    return (
        <>
            {/* 
	Editors — port of forms/editors.html. Quill snow and bubble themes mount on the source editor roots. */}
            <div className="app-content-header">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-6">
                            <h1 className="mb-0 fs-3">Editors</h1>
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
                                        Editors
                                    </li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            <div className="app-content">
                <div className="container-fluid">
                    <div className="row g-4">
                        <div className="col-12">
                            <div className="callout callout-info">
                                AdminLTE doesn't bundle a rich text editor. This page uses
                                <a href="https://quilljs.com/" target="_blank" rel="noopener noreferrer" className="callout-link">
                                    Quill 2
                                </a>
                                , the recommended editor integration. See the
                                <a href="#" className="callout-link">
                                    Recommended Integrations
                                </a>
                                page for markdown editors and other alternatives.
                            </div>
                        </div>
                        {/*  Quill snow theme */}
                        <div className="col-lg-7">
                            <div className="card card-primary card-outline mb-4">
                                <div className="card-header">
                                    <div className="card-title">Snow theme — full toolbar</div>
                                </div>
                                <div className="card-body">
                                    <h2 className="h5">Compose an announcement</h2>
                                    <p className="text-body-secondary">
                                        The classic "flat toolbar on top" editor. The toolbar below is fully configurable — add or remove controls per use case.
                                    </p>
                                    <div id="snow-editor" ref={snowConfigRef} style={{ height: "18rem" }}>
                                        <h2>Quarterly product update</h2>
                                        <p>
                                            Welcome to the
                                            <strong>Q3 review</strong>. This quarter the team shipped three headline features and closed out 47 reported bugs.
                                        </p>
                                        <ul>
                                            <li>New onboarding flow — trial activation up 12%</li>
                                            <li>Streaming exports — large reports no longer time out</li>
                                            <li>Single sign-on (SAML) for enterprise plans</li>
                                        </ul>
                                        <blockquote>"The new exports alone save our analysts a full day every week." — beta customer</blockquote>
                                        <p>
                                            Next quarter's focus is
                                            <em>performance, accessibility and the public API</em>. Edit this draft and leave your comments inline.
                                        </p>
                                    </div>
                                </div>
                                <div className="card-footer text-body-secondary small">
                                    Powered by
                                    <a href="https://quilljs.com/" target="_blank" rel="noopener" className="link-body-emphasis">
                                        Quill
                                    </a>
                                    — vanilla JS, no jQuery required.
                                </div>
                            </div>
                        </div>
                        {/*  Quill bubble theme */}
                        <div className="col-lg-5">
                            <div className="card card-success card-outline mb-4">
                                <div className="card-header">
                                    <div className="card-title">Bubble theme — inline editing</div>
                                </div>
                                <div className="card-body">
                                    <h2 className="h5">Edit in place</h2>
                                    <p className="text-body-secondary">
                                        No visible chrome until you need it: select any text below and a floating toolbar appears — ideal for editable page
                                        sections, comments, or notes.
                                    </p>
                                    <div id="bubble-editor" ref={bubbleConfigRef} className="border rounded" style={{ minHeight: "10rem" }}>
                                        <p>
                                            Our support hours are
                                            <strong>Monday to Friday, 9:00–17:00 (CET)</strong>. Requests submitted outside these hours are picked up the next
                                            business day.
                                        </p>
                                        <p>
                                            For urgent production incidents, page the on-call engineer through the status dashboard instead of filing a ticket.
                                        </p>
                                    </div>
                                </div>
                                <div className="card-footer text-body-secondary small">
                                    Same Quill instance, different theme — load
                                    <code className="text-body-emphasis">quill.bubble.css</code>
                                    instead of
                                    <code className="text-body-emphasis">quill.snow.css</code>.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
