// AdminCard — the card primitive (MIGRATION-PLAN §4.2). Markup comes verbatim
// from the `widgets/cards.html` card shapes: collapsible, maximizable and
// closable tools use AdminLTE's own `data-lte-toggle` delegation — React never
// attaches handlers to the tool buttons (plan §3.3: no onClick on toggles).
//
// The instance hook is only wired to survive React node recycling for cards
// mounted dynamically (`{items.map(…)}`); static cards can pass
// `singleton` (default) and rely on delegation alone. Decisions per page are
// recorded in `pages/README.md`.

import type { ReactNode, RefObject } from "react";
import { useCardWidget } from "../lib/adminlte";

export type AdminCardProps = {
    /** Verbatim classes beyond the base `card`, e.g. `card-primary card-outline`. */
    className?: string;
    collapsible?: boolean;
    maximizable?: boolean;
    closable?: boolean;
    /** Extra `card-tools` content rendered before the built-in tool buttons. */
    tools?: ReactNode;
    /** Header content — usually `<h3 className="card-title">…</h3>`. */
    title: ReactNode;
    body: ReactNode;
    footer?: ReactNode;
    /** Set to `false` for cards mounted/unmounted dynamically to use the
     * `useCardWidget` instance hook instead of delegation alone. */
    singleton?: boolean;
};

const join = (...parts: Array<string | false | undefined>) => parts.filter(Boolean).join(" ");

export default function AdminCard({
    className,
    collapsible = false,
    maximizable = false,
    closable = false,
    tools,
    title,
    body,
    footer,
    singleton = true
}: AdminCardProps) {
    const instanceRef: RefObject<HTMLDivElement | null> = useCardWidget();

    return (
        <div ref={singleton ? undefined : instanceRef} className={join("card", className)}>
            <div className="card-header">
                {title}

                <div className="card-tools">
                    {tools}
                    {collapsible && (
                        <button type="button" className="btn btn-tool" data-lte-toggle="card-collapse" aria-label="Collapse card">
                            <i data-lte-icon="expand" className="bi bi-plus-lg"></i>
                            <i data-lte-icon="collapse" className="bi bi-dash-lg"></i>
                        </button>
                    )}
                    {maximizable && (
                        <button type="button" className="btn btn-tool" data-lte-toggle="card-maximize" aria-label="Maximize card">
                            <i data-lte-icon="maximize" className="bi bi-fullscreen"></i>
                            <i data-lte-icon="minimize" className="bi bi-fullscreen-exit"></i>
                        </button>
                    )}
                    {closable && (
                        <button type="button" className="btn btn-tool" data-lte-toggle="card-remove" aria-label="Remove card">
                            <i className="bi bi-x-lg"></i>
                        </button>
                    )}
                </div>
                {/* /.card-tools */}
            </div>
            {/* /.card-header */}
            <div className="card-body">{body}</div>
            {/* /.card-body */}
            {footer != null && <div className="card-footer">{footer}</div>}
            {/* /.card-footer */}
        </div>
    );
}
