// Generic recursion of NAV_ITEMS into AdminLTE-shaped treeview markup
// (MIGRATION-PLAN §4.1). Markup stays AdminLTE-shaped: `nav-item`, `nav-link`,
// `nav-icon bi bi-*`, `nav-arrow` — Treeview itself is delegation-covered and
// needs no React state or instance hooks.

import { Link, useLocation } from "react-router";
import { NAV_ITEMS, isHeader, navSubtreeMatches, type NavItem, type NavEntry } from "../data/nav-items";

function NavItemView({ node, pathname }: { node: NavItem; pathname: string }) {
    const hasChildren = (node.children?.length ?? 0) > 0;
    const active = node.href === pathname;
    // A subtree is open when one of its leaves matches the current route.
    const containsActive = hasChildren && navSubtreeMatches(node, pathname);

    const itemClass = containsActive ? "nav-item menu-open" : "nav-item";
    const linkClass = active ? "nav-link active" : "nav-link";

    return (
        <li className={itemClass}>
            {/* Toggles keep the source's `href="#"` (delegation preventDefaults);
          internal hrefs are real routes rendered as router links. */}
            {node.href.startsWith("/") ? (
                <Link to={node.href} className={linkClass}>
                    <NavLabel node={node} hasChildren={hasChildren} />
                </Link>
            ) : (
                <a href="#" className={linkClass}>
                    <NavLabel node={node} hasChildren={hasChildren} />
                </a>
            )}
            {hasChildren ? (
                <ul className="nav nav-treeview">
                    {node.children!.map((child, index) => (
                        // NavItemView renders the <li> itself — no wrapper element here.
                        <NavItemView key={`${node.label}/${node.sub ?? ""}/${index}`} node={child} pathname={pathname} />
                    ))}
                </ul>
            ) : null}
        </li>
    );
}

/** Label + badge + caret, exactly as in the source sidebar markup. */
function NavLabel({ node, hasChildren }: { node: NavItem; hasChildren: boolean }) {
    return (
        <>
            <i className={`nav-icon ${node.icon}`} aria-hidden="true"></i>
            <p>
                {node.label}
                {node.sub ? (
                    <>
                        {" "}
                        <small>{node.sub}</small>
                    </>
                ) : null}
                {node.badge ? <span className="nav-badge badge text-bg-secondary me-3">{node.badge}</span> : null}
                {hasChildren ? <i className="nav-arrow bi bi-chevron-right" aria-hidden="true"></i> : null}
            </p>
        </>
    );
}

export function SidebarNav() {
    const { pathname } = useLocation();

    return (
        <ul className="nav sidebar-menu flex-column" data-lte-toggle="treeview" data-accordion="false" id="navigation">
            {NAV_ITEMS.map((entry: NavEntry, index: number) =>
                isHeader(entry) ? (
                    <li className="nav-header" key={`header/${entry.header}/${index}`}>
                        {entry.header}
                    </li>
                ) : (
                    // Positional key is safe: this data is static and never mutated.
                    <NavItemView key={String(index)} node={entry} pathname={pathname} />
                )
            )}
        </ul>
    );
}
