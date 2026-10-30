// Timeline — port of the `.timeline` shape from `UI/timeline.html`:
//
//   <div class="timeline">
//     <div class="time-label"><span class="text-bg-danger">…</span></div>
//     <div>
//       <i class="timeline-icon bi bi-envelope text-bg-primary"></i>
//       <div class="timeline-item">
//         <span class="time">…</span>
//         <h3 class="timeline-header">…</h3>
//         <div class="timeline-body">…</div>
//         <div class="timeline-footer">…</div>
//       </div>
//     </div>
//     … more items …
//     <div class="time-label"><span …>…</span></div>
//   </div>
//
// Items are plain children; <Timeline.Label/> opens/closes the day groups and
// <Timeline.Item/> renders one event. No instance state — the timeline is
// purely presentational (AdminLTE ships no timeline JS).

import type { FC, ReactNode } from "react";

export type TimelineLabelProps = {
    /** Skin class verbatim, e.g. `text-bg-danger`. */
    color: string;
    children: ReactNode;
};

export type TimelineItemProps = {
    /** `timeline-icon` classes verbatim from the source page, e.g.
     * `bi bi-envelope text-bg-primary` — one `<i>` carries them all. */
    icon: string;
    /** `.time` slot — e.g. `12:05 <i className="bi bi-clock-fill"/>`. */
    time?: ReactNode;
    /** `.timeline-header` content, e.g. `<a href="#">Support Team</a> sent you an email`. */
    header: ReactNode;
    /** `.timeline-body` — omit when the source item has none. */
    body?: ReactNode;
    /** `.timeline-footer` — omit when the source item has none. */
    footer?: ReactNode;
};

const join = (...parts: Array<string | false | undefined>) => parts.filter(Boolean).join(" ");

const TimelineLabel: FC<TimelineLabelProps> = ({ color, children }) => {
    return (
        <div className="time-label">
            <span className={color}>{children}</span>
        </div>
    );
};
TimelineLabel.displayName = "Timeline.Label";

const TimelineItem: FC<TimelineItemProps> = ({ icon, time, header, body, footer }) => {
    return (
        <div>
            <i className={join("timeline-icon", icon)}> </i>
            <div className="timeline-item">
                {time != null && <span className="time"> {time} </span>}
                <h3 className="timeline-header">{header}</h3>
                {body != null && <div className="timeline-body">{body}</div>}
                {footer != null && <div className="timeline-footer">{footer}</div>}
            </div>
        </div>
    );
};
TimelineItem.displayName = "Timeline.Item";

/**
 * Root wrapper. Extend statically — `Timeline.Label` / `Timeline.Item` — the
 * same shape the source template uses, kept for verbatim JSX portability.
 */
const Timeline = ({ children }: { children: ReactNode }) => <div className="timeline">{children}</div>;

Timeline.Label = TimelineLabel;
Timeline.Item = TimelineItem;

export default Timeline;
