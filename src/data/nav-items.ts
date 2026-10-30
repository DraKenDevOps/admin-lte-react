// Sidebar menu matching admin-lte-svelte `src/lib/nav_items.ts`.
// Unknown paths still render StubPage.

export type NavItem = {
    label: string;
    sub?: string;
    icon: string;
    href: string;
    badge?: string;
    children?: NavItem[];
};

export type NavEntry = { header: string } | NavItem;

export const isHeader = (entry: NavEntry): entry is { header: string } => (entry as { header?: string }).header !== undefined;

const circle = "bi bi-circle";

export const NAV_ITEMS: NavEntry[] = [
    { header: "MAIN" },
    {
        label: "Dashboard",
        icon: "bi bi-house",
        href: "/",
    },
    { label: "Settings", icon: "bi bi-gear", href: "/settings" },
    {
        label: "Forms",
        icon: "bi bi-pencil-square",
        href: "#",
        children: [
            { label: "Elements", icon: circle, href: "/forms/elements" },
            { label: "Layout", icon: circle, href: "/forms/layout" },
            { label: "Validation", icon: circle, href: "/forms/validation" },
            { label: "Wizard", icon: circle, href: "/forms/wizard" },
            { label: "Advanced Elements", icon: circle, href: "/forms/advanced" },
            { label: "Editors", icon: circle, href: "/forms/editors" }
        ]
    },
    {
        label: "Charts",
        icon: "bi bi-graph-up",
        href: "#",
        children: [{ label: "ApexCharts", icon: circle, href: "/charts/apexcharts" }]
    },
    { header: "PAGES" },
    {
        label: "Pages",
        icon: "bi bi-file-earmark-text",
        href: "#",
        children: [
            { label: "Profile", icon: circle, href: "/profile" },
            { label: "404", icon: circle, href: "/404" },
            { label: "500", icon: circle, href: "/500" },
            { label: "Maintenance", icon: circle, href: "/maintenance" }
        ]
    }
];

/** True when `node` or any descendant links to `pathname`. */
export function navSubtreeMatches(node: NavItem, pathname: string): boolean {
    if (node.href === pathname) {
        return true;
    }
    return (node.children ?? []).some((child) => navSubtreeMatches(child, pathname));
}
