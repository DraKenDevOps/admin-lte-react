// InfoBox — the info widget primitive, modeled verbatim from
// `widgets/info-box.html` (the icon band + text/number shape used by the old
// index.html home widgets, which also carry the optional progress row).
// Progress markup is the plain Bootstrap 5 one AdminLTE styles; the bar's
// inline width must stay inline (`style={{ width: … }}`) exactly like the
// source page.

import type { ReactNode } from "react";

export type InfoBoxProps = {
    /** Classes beyond the base `info-box`, e.g. `info-box` variants (none in source pages). */
    className?: string;
    /** Icon band skin, verbatim from the source page, e.g. `text-bg-warning shadow-sm`. */
    infoBoxIconClass: string;
    /** Icon classes for the `<i>` inside the band, e.g. `bi bi-gear-fill`. */
    icon: string;
    text: ReactNode;
    number: ReactNode;
    /** Optional progress row (port of the old home-widget shape). */
    progress?: {
        /** Bar skin class, e.g. `bg-primary` / `bg-warning`. */
        barClass: string;
        percent: number;
        /** `.progress-description` caption under the bar, e.g. `70% increase in 30 days`. */
        description?: ReactNode;
    };
};

const join = (...parts: Array<string | false | undefined>) => parts.filter(Boolean).join(" ");

export default function InfoBox({ className, infoBoxIconClass, icon, text, number, progress }: InfoBoxProps) {
    return (
        <div className={join("info-box", className)}>
            <span className={join("info-box-icon", infoBoxIconClass)}>
                <i className={icon}></i>
            </span>

            <div className="info-box-content">
                <span className="info-box-text">{text}</span>
                <span className="info-box-number">{number}</span>
                {progress && (
                    <>
                        <div className="progress">
                            <div className={join("progress-bar", progress.barClass)} style={{ width: `${progress.percent}%` }}></div>
                        </div>
                        {progress.description != null && <span className="progress-description">{progress.description}</span>}
                    </>
                )}
            </div>
            {/* /.info-box-content */}
        </div>
    );
}
