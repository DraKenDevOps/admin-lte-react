// SmallBox — the stat-card primitive, modeled verbatim from
// `widgets/small-box.html`: `.small-box` with an `.inner` (title + info), an
// icon slot (either an inline SVG `small-box-icon` as in the source page, or
// any custom node) and the `small-box-footer` link. No instance state — the
// box is purely presentational; the footer link keeps `href="#"` (delegation
// calls preventDefault) or a real route.

import type { ReactNode } from "react";

export type SmallBoxProps = {
    /** Skin classes verbatim, e.g. `text-bg-warning` (Base) or the palette's
     * `text-bg-indigo`. Passed through untyped to stay AdminLTE-shaped. */
    color?: string;
    /** `.inner` headline, e.g. `150`. */
    title: ReactNode;
    /** `.inner` caption, e.g. `New Orders`. */
    subtitle?: ReactNode;
    /** Any icon markup — source pages ship an inline `<svg class="small-box-icon">`. */
    icon: ReactNode;
    /** `.small-box-footer` inner content, e.g. `More info <i className="bi bi-link-45deg"/>`. */
    footer: ReactNode;
    footerHref?: string;
    /** Footer link colour variant from the source page (`link-light` on dark,
     * `link-dark` on light skins). */
    footerLinkClass?: string;
};

const join = (...parts: Array<string | false | undefined>) => parts.filter(Boolean).join(" ");

export default function SmallBox({
    color = "text-bg-primary",
    title,
    subtitle,
    icon,
    footer,
    footerHref = "#",
    footerLinkClass = "link-light"
}: SmallBoxProps) {
    return (
        <div className={join("small-box", color)}>
            <div className="inner">
                <h3>{title}</h3>
                {subtitle != null && <p>{subtitle}</p>}
            </div>
            {icon}
            <a href={footerHref} className={join("small-box-footer", footerLinkClass, "link-underline-opacity-0", "link-underline-opacity-50-hover")}>
                {footer}
            </a>
        </div>
    );
}
