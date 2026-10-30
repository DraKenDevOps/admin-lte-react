import type { ApexOptions } from "apexcharts";
import { useDocumentTitle } from "../use-document-title";
import { useApexChart } from "../../lib/adminlte";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const thousands = (value: number) => `$${Math.round(value / 1000)}k`;
const dollars = (value: number) => `$${value.toLocaleString()}`;

const lineChartConfig: ApexOptions = {
    series: [
        {
            name: "Revenue",
            data: [31200, 34800, 32600, 39400, 42100, 45800, 44300, 49700, 52400, 56900, 60200, 65800]
        }
    ],
    chart: {
        type: "line",
        height: 300
    },
    colors: ["#0d6efd"],
    stroke: { width: 3 },
    markers: { size: 4 },
    dataLabels: { enabled: false },
    legend: { show: false },
    xaxis: { categories: months },
    yaxis: { labels: { formatter: thousands } },
    tooltip: { y: { formatter: dollars } }
};

const areaChartConfig: ApexOptions = {
    series: [
        {
            name: "New Visitors",
            data: [8100, 9300, 8700, 10400, 12200, 11600, 13900]
        },
        {
            name: "Returning Visitors",
            data: [4200, 4600, 5100, 4900, 5800, 6300, 6900]
        }
    ],
    chart: {
        type: "area",
        height: 300
    },
    colors: ["#0d6efd", "#20c997"],
    dataLabels: { enabled: false },
    stroke: { curve: "smooth", width: 2 },
    xaxis: {
        categories: months.slice(0, 7).map((month) => `${month} '25`)
    },
    yaxis: { min: 0 }
};

const columnChartConfig: ApexOptions = {
    series: [
        {
            name: "Online Store",
            data: [44300, 55600, 57200, 61400]
        },
        {
            name: "Retail Stores",
            data: [35100, 41200, 36800, 45300]
        }
    ],
    chart: {
        type: "bar",
        height: 300
    },
    plotOptions: {
        bar: {
            horizontal: false,
            columnWidth: "55%"
        }
    },
    colors: ["#6f42c1", "#20c997"],
    dataLabels: { enabled: false },
    stroke: {
        show: true,
        width: 2,
        colors: ["transparent"]
    },
    xaxis: {
        categories: ["Q1 2025", "Q2 2025", "Q3 2025", "Q4 2025"]
    },
    yaxis: { labels: { formatter: thousands } },
    tooltip: { y: { formatter: dollars } }
};

const donutChartConfig: ApexOptions = {
    series: [3450, 2210, 1160, 940, 620],
    chart: {
        type: "donut",
        height: 350
    },
    labels: ["Organic Search", "Direct", "Referral", "Social Media", "Email"],
    colors: ["#0d6efd", "#20c997", "#ffc107", "#d63384", "#6f42c1"],
    dataLabels: { enabled: false }
};

const radialValues = [76, 67, 61];
const radialBarChartConfig: ApexOptions = {
    series: radialValues,
    chart: {
        type: "radialBar",
        height: 350
    },
    labels: ["Sales", "Marketing", "Support"],
    colors: ["#0d6efd", "#20c997", "#ffc107"],
    plotOptions: {
        radialBar: {
            dataLabels: {
                total: {
                    show: true,
                    label: "Average",
                    formatter: () => `${Math.round(radialValues.reduce((sum, value) => sum + value, 0) / radialValues.length)}%`
                }
            }
        }
    }
};

const mixedChartConfig: ApexOptions = {
    series: [
        {
            name: "Orders",
            type: "column",
            data: [440, 505, 414, 671, 227, 413, 201, 352, 752]
        },
        {
            name: "Revenue",
            type: "line",
            data: [23100, 26200, 22800, 34100, 18300, 24400, 15600, 21900, 38200]
        }
    ],
    chart: {
        type: "line",
        height: 300
    },
    colors: ["#20c997", "#0d6efd"],
    stroke: {
        width: [0, 3],
        curve: "smooth"
    },
    dataLabels: { enabled: false },
    xaxis: {
        categories: months.slice(0, 9)
    },
    yaxis: [
        {
            title: { text: "Orders" }
        },
        {
            opposite: true,
            title: { text: "Revenue" },
            labels: { formatter: thousands }
        }
    ],
    tooltip: {
        y: [{ formatter: (val: number) => `${val}` }, { formatter: dollars }]
    }
};

export default function ApexChartsPage() {
    useDocumentTitle("IT Shop | ApexCharts");
    const lineChartConfigRef = useApexChart(lineChartConfig);
    const areaChartConfigRef = useApexChart(areaChartConfig);
    const columnChartConfigRef = useApexChart(columnChartConfig);
    const donutChartConfigRef = useApexChart(donutChartConfig);
    const radialBarChartConfigRef = useApexChart(radialBarChartConfig);
    const mixedChartConfigRef = useApexChart(mixedChartConfig);
    return (
        <>
            <div className="app-content-header">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-6">
                            <h1 className="mb-0 fs-3">ApexCharts</h1>
                        </div>
                        <div className="col-sm-6">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb float-sm-end">
                                    <li className="breadcrumb-item">
                                        <a href="/">Home</a>
                                    </li>
                                    <li className="breadcrumb-item active" aria-current="page">
                                        ApexCharts
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
                        <div className="col-12 col-lg-6">
                            <div className="card h-100">
                                <div className="card-header">
                                    <h3 className="card-title">Line Chart</h3>
                                    <div className="card-tools">
                                        <button type="button" className="btn btn-tool" data-lte-toggle="card-collapse" aria-label="Collapse card">
                                            <i data-lte-icon="expand" className="bi bi-plus-lg"></i>
                                            <i data-lte-icon="collapse" className="bi bi-dash-lg"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div
                                        id="line-chart"
                                        role="img"
                                        aria-label="Line chart of monthly revenue, January to December"
                                        ref={lineChartConfigRef}
                                    ></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-6">
                            <div className="card h-100">
                                <div className="card-header">
                                    <h3 className="card-title">Area Chart</h3>
                                    <div className="card-tools">
                                        <button type="button" className="btn btn-tool" data-lte-toggle="card-collapse" aria-label="Collapse card">
                                            <i data-lte-icon="expand" className="bi bi-plus-lg"></i>
                                            <i data-lte-icon="collapse" className="bi bi-dash-lg"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div
                                        id="area-chart"
                                        role="img"
                                        aria-label="Area chart of new and returning visitors, January to July 2025"
                                        ref={areaChartConfigRef}
                                    ></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-6">
                            <div className="card h-100">
                                <div className="card-header">
                                    <h3 className="card-title">Column Chart</h3>
                                    <div className="card-tools">
                                        <button type="button" className="btn btn-tool" data-lte-toggle="card-collapse" aria-label="Collapse card">
                                            <i data-lte-icon="expand" className="bi bi-plus-lg"></i>
                                            <i data-lte-icon="collapse" className="bi bi-dash-lg"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div
                                        id="column-chart"
                                        role="img"
                                        aria-label="Column chart of online store and retail store sales per quarter of 2025"
                                        ref={columnChartConfigRef}
                                    ></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-6">
                            <div className="card h-100">
                                <div className="card-header">
                                    <h3 className="card-title">Donut Chart</h3>
                                    <div className="card-tools">
                                        <button type="button" className="btn btn-tool" data-lte-toggle="card-collapse" aria-label="Collapse card">
                                            <i data-lte-icon="expand" className="bi bi-plus-lg"></i>
                                            <i data-lte-icon="collapse" className="bi bi-dash-lg"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div id="donut-chart" role="img" aria-label="Donut chart of traffic sources" ref={donutChartConfigRef}></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-6">
                            <div className="card h-100">
                                <div className="card-header">
                                    <h3 className="card-title">Radial Bar Chart</h3>
                                    <div className="card-tools">
                                        <button type="button" className="btn btn-tool" data-lte-toggle="card-collapse" aria-label="Collapse card">
                                            <i data-lte-icon="expand" className="bi bi-plus-lg"></i>
                                            <i data-lte-icon="collapse" className="bi bi-dash-lg"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div
                                        id="radialbar-chart"
                                        role="img"
                                        aria-label="Radial bar chart of goal completion for sales, marketing and support"
                                        ref={radialBarChartConfigRef}
                                    ></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-6">
                            <div className="card h-100">
                                <div className="card-header">
                                    <h3 className="card-title">Mixed Chart</h3>
                                    <div className="card-tools">
                                        <button type="button" className="btn btn-tool" data-lte-toggle="card-collapse" aria-label="Collapse card">
                                            <i data-lte-icon="expand" className="bi bi-plus-lg"></i>
                                            <i data-lte-icon="collapse" className="bi bi-dash-lg"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div id="mixed-chart" role="img" aria-label="Mixed chart of monthly orders and revenue" ref={mixedChartConfigRef}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
