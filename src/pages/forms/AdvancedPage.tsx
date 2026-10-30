import type TomSelect from "tom-select";
import "tom-select/dist/css/tom-select.bootstrap5.css";
import "flatpickr/dist/flatpickr.css";
import { useDocumentTitle } from "../use-document-title";
import { useTomSelect } from "../../lib/plugins/form-widgets";
import { useFlatpickr } from "../../lib/plugins/form-widgets";

const countryConfig = {
    plugins: ["clear_button"],
    sortField: [{ field: "text", direction: "asc" as const }]
};

const tagsConfig = {
    plugins: ["remove_button"],
    create: true,
    persist: false
};

const PAGE_SIZE = 12;
const FIRST_NAMES = [
    "Olivia",
    "Liam",
    "Emma",
    "Noah",
    "Ava",
    "Ethan",
    "Sofia",
    "Lucas",
    "Mia",
    "Mateo",
    "Isla",
    "Arjun",
    "Nora",
    "Hugo",
    "Yuki",
    "Amara",
    "Elena",
    "Omar",
    "Freya",
    "Diego",
    "Leila",
    "Jonas",
    "Priya",
    "Marek"
];
const TEAMS = ["Frontend", "Backend", "Design"];
const REVIEWERS = FIRST_NAMES.flatMap((first, index) =>
    ["Bennett", "Carter", "Dawson"].map((last, offset) => ({
        id: index * 3 + offset + 1,
        name: `${first} ${last}`,
        team: TEAMS[(index + offset) % TEAMS.length]
    }))
);

type Reviewer = (typeof REVIEWERS)[number];
type ReviewerPage = { results: Reviewer[]; next: string | null };
type PagedSelect = TomSelect & {
    getUrl(query: string): string;
    setNextUrl(query: string, url: string): void;
};

function fetchReviewers(url: string, signal: AbortSignal): Promise<ReviewerPage> {
    const params = new URLSearchParams(url.slice(url.indexOf("?") + 1));
    const query = (params.get("q") || "").toLowerCase();
    const page = Number(params.get("page") || 1);
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
            const matches = REVIEWERS.filter((person) => `${person.name} ${person.team}`.toLowerCase().includes(query));
            const start = (page - 1) * PAGE_SIZE;
            const hasMore = start + PAGE_SIZE < matches.length;
            resolve({
                results: matches.slice(start, start + PAGE_SIZE),
                next: hasMore ? `/api/reviewers?q=${encodeURIComponent(query)}&page=${page + 1}` : null
            });
        }, 400);
        signal.addEventListener("abort", () => {
            clearTimeout(timer);
            reject(new DOMException("Aborted", "AbortError"));
        });
    });
}

let inFlight: AbortController | null = null;

const reviewerConfig = {
    valueField: "id",
    labelField: "name",
    searchField: ["name", "team"],
    placeholder: "Type to search 72 people…",
    preload: "focus",
    loadThrottle: 300,
    plugins: ["virtual_scroll"],
    firstUrl: (query: string) => `/api/reviewers?q=${encodeURIComponent(query)}&page=1`,
    async load(this: PagedSelect, query: string, callback: (results?: Reviewer[]) => void) {
        if (inFlight) inFlight.abort();
        inFlight = new AbortController();
        try {
            const json = await fetchReviewers(this.getUrl(query), inFlight.signal);
            if (json.next) this.setNextUrl(query, json.next);
            callback(json.results);
        } catch (error) {
            if (error instanceof DOMException && error.name === "AbortError") return;
            callback();
        }
    },
    render: {
        option: (data: Reviewer, escape: (value: string) => string) =>
            `<div class="d-flex justify-content-between align-items-center"><span>${escape(data.name)}</span><span class="badge text-bg-secondary">${escape(data.team ?? "")}</span></div>`,
        loading_more: () => '<div class="p-2 text-body-secondary small">Loading more…</div>',
        no_more_results: () => '<div class="p-2 text-body-secondary small">End of results</div>'
    }
};

const deliveryDateOptions = { dateFormat: "Y-m-d" };
const meetingStartOptions = { enableTime: true, dateFormat: "Y-m-d H:i" };
const reportPeriodOptions = { mode: "range" as const, dateFormat: "Y-m-d" };
const reminderTimeOptions = {
    enableTime: true,
    noCalendar: true,
    dateFormat: "H:i",
    time_24hr: true
};

export default function AdvancedPage() {
    useDocumentTitle("IT Shop | Advanced Form Elements");
    const countryConfigRef = useTomSelect(countryConfig);
    const tagsConfigRef = useTomSelect(tagsConfig);
    const reviewerConfigRef = useTomSelect(reviewerConfig);
    const deliveryDateOptionsRef = useFlatpickr(deliveryDateOptions);
    const meetingStartOptionsRef = useFlatpickr(meetingStartOptions);
    const reportPeriodOptionsRef = useFlatpickr(reportPeriodOptions);
    const reminderTimeOptionsRef = useFlatpickr(reminderTimeOptions);
    return (
        <>
            {/* 
	Advanced form elements — port of forms/advanced.html. Tom Select and Flatpickr init through actions. */}
            <div className="app-content-header">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-6">
                            <h1 className="mb-0 fs-3">Advanced Elements</h1>
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
                                        Advanced Elements
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
                                AdminLTE deliberately doesn't bundle form widgets. The controls on this page use the recommended third-party integrations —
                                <a href="https://tom-select.js.org/" target="_blank" rel="noopener noreferrer" className="callout-link">
                                    Tom Select
                                </a>
                                and
                                <a href="https://flatpickr.js.org/" target="_blank" rel="noopener noreferrer" className="callout-link">
                                    Flatpickr
                                </a>
                                . See the
                                <a href="#" className="callout-link">
                                    Recommended Integrations
                                </a>
                                page for the full list with install snippets.
                            </div>
                        </div>
                        {/*  Tom Select */}
                        <div className="col-md-6">
                            <div className="card card-primary card-outline mb-4">
                                <div className="card-header">
                                    <div className="card-title">Tom Select</div>
                                </div>
                                <div className="card-body">
                                    <div className="mb-4">
                                        <label htmlFor="country" className="form-label">
                                            Single select with search
                                        </label>
                                        <select id="country" ref={countryConfigRef} className="form-control" aria-label="Single select with search">
                                            <option value="">Select a country…</option>
                                            <option>Australia</option>
                                            <option>Brazil</option>
                                            <option>Canada</option>
                                            <option>France</option>
                                            <option>Germany</option>
                                            <option>Italy</option>
                                            <option>Japan</option>
                                            <option>Latvia</option>
                                            <option>Netherlands</option>
                                            <option>Spain</option>
                                            <option>United Kingdom</option>
                                            <option>United States</option>
                                        </select>
                                        <div className="form-text">
                                            Start typing to filter the list; the × button clears the selection (<code>clear_button</code>
                                            ).
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="post-tags" className="form-label">
                                            Multi-select with tags
                                        </label>
                                        <select
                                            id="post-tags"
                                            ref={tagsConfigRef}
                                            className="form-control"
                                            aria-label="Multi-select with tags"
                                            multiple
                                            defaultValue={["bootstrap", "javascript"]}
                                        >
                                            <option value="bootstrap">Bootstrap</option>
                                            <option value="javascript">JavaScript</option>
                                            <option value="css">CSS</option>
                                            <option value="accessibility">Accessibility</option>
                                            <option value="performance">Performance</option>
                                            <option value="tooling">Tooling</option>
                                        </select>
                                        <div className="form-text">Type to filter, press Enter to create a new tag, use the × button to remove one.</div>
                                    </div>
                                    <div>
                                        <label htmlFor="reviewer" className="form-label">
                                            Remote data with pagination
                                        </label>
                                        <select
                                            id="reviewer"
                                            ref={reviewerConfigRef}
                                            className="form-control"
                                            aria-label="Remote data with pagination"
                                        ></select>
                                        <div className="form-text">
                                            Backed by 72 records behind a stubbed endpoint. Typing is debounced (<code>loadThrottle</code>
                                            ), stale requests are cancelled with
                                            <code>AbortController</code>, and scrolling to the bottom of the list pulls the next page (
                                            <code>virtual_scroll</code>
                                            ).
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer text-body-secondary small">
                                    Powered by
                                    <a href="https://tom-select.js.org/" target="_blank" rel="noopener" className="link-body-emphasis">
                                        Tom Select
                                    </a>
                                    — vanilla JS, no jQuery required.
                                </div>
                            </div>
                        </div>
                        {/*  Flatpickr */}
                        <div className="col-md-6">
                            <div className="card card-success card-outline mb-4">
                                <div className="card-header">
                                    <div className="card-title">Flatpickr</div>
                                </div>
                                <div className="card-body">
                                    <div className="mb-4">
                                        <label htmlFor="delivery-date" className="form-label">
                                            Date picker
                                        </label>
                                        <input
                                            type="text"
                                            id="delivery-date"
                                            ref={deliveryDateOptionsRef}
                                            className="form-control"
                                            placeholder="Select a delivery date"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="meeting-start" className="form-label">
                                            Date & time picker
                                        </label>
                                        <input
                                            type="text"
                                            id="meeting-start"
                                            ref={meetingStartOptionsRef}
                                            className="form-control"
                                            placeholder="Select date and time"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="report-period" className="form-label">
                                            Range picker
                                        </label>
                                        <input
                                            type="text"
                                            id="report-period"
                                            ref={reportPeriodOptionsRef}
                                            className="form-control"
                                            placeholder="Select a reporting period"
                                        />
                                        <div className="form-text">Pick a start date, then an end date.</div>
                                    </div>
                                    <div>
                                        <label htmlFor="reminder-time" className="form-label">
                                            Time picker
                                        </label>
                                        <input
                                            type="text"
                                            id="reminder-time"
                                            ref={reminderTimeOptionsRef}
                                            className="form-control"
                                            placeholder="Select a time"
                                        />
                                    </div>
                                </div>
                                <div className="card-footer text-body-secondary small">
                                    Powered by
                                    <a href="https://flatpickr.js.org/" target="_blank" rel="noopener" className="link-body-emphasis">
                                        Flatpickr
                                    </a>
                                    — vanilla JS, no jQuery required.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
