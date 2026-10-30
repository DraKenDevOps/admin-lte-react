import { useApexChart } from "../lib/adminlte";
import SmallBox from "../components/SmallBox";
import { useDocumentTitle } from "./use-document-title";
import type { ApexOptions } from "apexcharts";

const ordersIcon = (
    <svg className="small-box-icon" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
    </svg>
);

const bounceIcon = (
    <svg className="small-box-icon" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z" />
    </svg>
);

const usersIcon = (
    <svg className="small-box-icon" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z" />
    </svg>
);

const visitorsIcon = (
    <svg className="small-box-icon" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path clipRule="evenodd" fillRule="evenodd" d="M2.25 13.5a8.25 8.25 0 018.25-8.25.75.75 0 01.75.75v6.75H18a.75.75 0 01.75.75 8.25 8.25 0 01-16.5 0z" />
        <path clipRule="evenodd" fillRule="evenodd" d="M12.75 3a.75.75 0 01.75-.75 8.25 8.25 0 018.25 8.25.75.75 0 01-.75.75h-7.5a.75.75 0 01-.75-.75V3z" />
    </svg>
);

const salesChartConfig: ApexOptions = {
    series: [
        {
            name: "Digital Goods",
            data: [28, 48, 40, 19, 86, 27, 90]
        },
        {
            name: "Electronics",
            data: [65, 59, 80, 81, 56, 55, 40]
        }
    ],
    chart: {
        type: "area",
        height: 180
    },
    colors: ["#0d6efd", "#20c997"],
    dataLabels: { enabled: false },
    stroke: { curve: "smooth", width: 2 },
    legend: { show: false },
    xaxis: {
        categories: ["Jan '23", "Feb '23", "Mar '23", "Apr '23", "May '23", "Jun '23", "Jul '23"]
    },
    yaxis: { min: 0 }
};

const moreInfo = (
    <>
        More info <i className="bi bi-link-45deg" />
    </>
);

export default function DashboardPage() {
    useDocumentTitle("IT Shop | Dashboard");
    const salesChartConfigRef = useApexChart(salesChartConfig);
    return (
        <>
            <div className="app-content-header">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-6">
                            <h1 className="mb-0 fs-3">Dashboard</h1>
                        </div>
                        <div className="col-sm-6">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb float-sm-end">
                                    <li className="breadcrumb-item">
                                        <a href="/">Home</a>
                                    </li>
                                    <li className="breadcrumb-item active" aria-current="page">
                                        Dashboard
                                    </li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            <div className="app-content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-3 col-6">
                            <SmallBox color="text-bg-primary" title="150" subtitle="New Orders" icon={ordersIcon} footer={moreInfo} />
                        </div>
                        <div className="col-lg-3 col-6">
                            <SmallBox
                                color="text-bg-success"
                                title={
                                    <>
                                        53<sup className="fs-5">%</sup>
                                    </>
                                }
                                subtitle="Bounce Rate"
                                icon={bounceIcon}
                                footer={moreInfo}
                            />
                        </div>
                        <div className="col-lg-3 col-6">
                            <SmallBox
                                color="text-bg-warning"
                                title="44"
                                subtitle="User Registrations"
                                icon={usersIcon}
                                footer={moreInfo}
                                footerLinkClass="link-dark"
                            />
                        </div>
                        <div className="col-lg-3 col-6">
                            <SmallBox color="text-bg-danger" title="65" subtitle="Unique Visitors" icon={visitorsIcon} footer={moreInfo} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-sm-6 col-md-3">
                            <div className="info-box">
                                <span className="info-box-icon text-bg-primary shadow-sm">
                                    <i className="bi bi-gear-fill"></i>
                                </span>
                                <div className="info-box-content">
                                    <span className="info-box-text">CPU Traffic</span>
                                    <span className="info-box-number">
                                        10
                                        <small>%</small>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-3">
                            <div className="info-box">
                                <span className="info-box-icon text-bg-danger shadow-sm">
                                    <i className="bi bi-hand-thumbs-up-fill"></i>
                                </span>
                                <div className="info-box-content">
                                    <span className="info-box-text">Likes</span>
                                    <span className="info-box-number">41,410</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-3">
                            <div className="info-box">
                                <span className="info-box-icon text-bg-success shadow-sm">
                                    <i className="bi bi-cart-fill"></i>
                                </span>
                                <div className="info-box-content">
                                    <span className="info-box-text">Sales</span>
                                    <span className="info-box-number">760</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-3">
                            <div className="info-box">
                                <span className="info-box-icon text-bg-warning shadow-sm">
                                    <i className="bi bi-people-fill"></i>
                                </span>
                                <div className="info-box-content">
                                    <span className="info-box-text">New Members</span>
                                    <span className="info-box-number">2,000</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <div className="card mb-4">
                                <div className="card-header">
                                    <h5 className="card-title">Monthly Recap Report</h5>
                                    <div className="card-tools">
                                        <button type="button" className="btn btn-tool" data-lte-toggle="card-collapse" aria-label="Collapse card">
                                            <i data-lte-icon="expand" className="bi bi-plus-lg"></i>
                                            <i data-lte-icon="collapse" className="bi bi-dash-lg"></i>
                                        </button>
                                        <div className="btn-group">
                                            <button type="button" className="btn btn-tool dropdown-toggle" aria-label="More options" data-bs-toggle="dropdown">
                                                <i className="bi bi-wrench"></i>
                                            </button>
                                            <div className="dropdown-menu dropdown-menu-end" role="menu">
                                                <a href="#" className="dropdown-item">
                                                    Action
                                                </a>
                                                <a href="#" className="dropdown-item">
                                                    Another action
                                                </a>
                                                <a href="#" className="dropdown-item">
                                                    Something else here
                                                </a>
                                                <hr className="dropdown-divider" />
                                                <a href="#" className="dropdown-item">
                                                    Separated link
                                                </a>
                                            </div>
                                        </div>
                                        <button type="button" className="btn btn-tool" data-lte-toggle="card-remove" aria-label="Remove card">
                                            <i className="bi bi-x-lg"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-8">
                                            <p className="text-center">
                                                <strong>Sales: 1 Jan, 2023 - 30 Jul, 2023</strong>
                                            </p>
                                            <div
                                                id="sales-chart"
                                                ref={salesChartConfigRef}
                                                role="img"
                                                aria-label="Area chart of digital goods and electronics sales, January to July 2023"
                                            ></div>
                                        </div>
                                        <div className="col-md-4">
                                            <p className="text-center">
                                                <strong>Goal Completion</strong>
                                            </p>
                                            <div className="progress-group">
                                                Add Products to Cart
                                                <span className="float-end">
                                                    <b>160</b>
                                                    /200
                                                </span>
                                                <div className="progress progress-sm">
                                                    <div className="progress-bar text-bg-primary" style={{ width: "80%" }}></div>
                                                </div>
                                            </div>
                                            <div className="progress-group">
                                                Complete Purchase
                                                <span className="float-end">
                                                    <b>310</b>
                                                    /400
                                                </span>
                                                <div className="progress progress-sm">
                                                    <div className="progress-bar text-bg-danger" style={{ width: "75%" }}></div>
                                                </div>
                                            </div>
                                            <div className="progress-group">
                                                <span className="progress-text">Visit Premium Page</span>
                                                <span className="float-end">
                                                    <b>480</b>
                                                    /800
                                                </span>
                                                <div className="progress progress-sm">
                                                    <div className="progress-bar text-bg-success" style={{ width: "60%" }}></div>
                                                </div>
                                            </div>
                                            <div className="progress-group">
                                                Send Inquiries
                                                <span className="float-end">
                                                    <b>250</b>
                                                    /500
                                                </span>
                                                <div className="progress progress-sm">
                                                    <div className="progress-bar text-bg-warning" style={{ width: "50%" }}></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer bg-body">
                                    <div className="row">
                                        <div className="col-md-3 col-6">
                                            <div className="text-center border-end">
                                                <span className="text-success-emphasis">
                                                    <i className="bi bi-caret-up-fill"></i>
                                                    17%
                                                </span>
                                                <h5 className="fw-bold mb-0">$35,210.43</h5>
                                                <span className="text-uppercase">TOTAL REVENUE</span>
                                            </div>
                                        </div>
                                        <div className="col-md-3 col-6">
                                            <div className="text-center border-end">
                                                <span className="text-info-emphasis">
                                                    <i className="bi bi-caret-left-fill"></i>
                                                    0%
                                                </span>
                                                <h5 className="fw-bold mb-0">$10,390.90</h5>
                                                <span className="text-uppercase">TOTAL COST</span>
                                            </div>
                                        </div>
                                        <div className="col-md-3 col-6">
                                            <div className="text-center border-end">
                                                <span className="text-success-emphasis">
                                                    <i className="bi bi-caret-up-fill"></i>
                                                    20%
                                                </span>
                                                <h5 className="fw-bold mb-0">$24,813.53</h5>
                                                <span className="text-uppercase">TOTAL PROFIT</span>
                                            </div>
                                        </div>
                                        <div className="col-md-3 col-6">
                                            <div className="text-center">
                                                <span className="text-danger-emphasis">
                                                    <i className="bi bi-caret-down-fill"></i>
                                                    18%
                                                </span>
                                                <h5 className="fw-bold mb-0">1200</h5>
                                                <span className="text-uppercase">GOAL COMPLETIONS</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
