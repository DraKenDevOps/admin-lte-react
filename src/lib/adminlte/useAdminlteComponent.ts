// Per-element instance hooks (MIGRATION-PLAN §3.2).
// Used only where an instance is required — markup toggles
// (`data-lte-toggle="…"`) never get one: AdminLTE's document-level
// click delegation already handles them without React involvement (§3.3).

import { useEffect, useRef } from "react";
import type { RefObject } from "react";

/** Anything exposing the AdminLTE/Bootstrap-style lifecycle. */
export type Disposable = { dispose(): unknown };

/**
 * Per-element instance registry. Guards against React node recycling:
 * if React reuses the same DOM node for a new component (or an effect runs
 * twice in dev StrictMode), the existing instance is reused instead of being
 * stacked. On cleanup the instance is disposed, which also removes it from
 * AdminLTE's own registry, so a later re-mount recreates it cleanly.
 */
const instanceRegistry = new WeakMap<HTMLElement, Disposable>();

type Options = {
    /** Optional sub-element selector inside the bordered element. */
    selector?: string;
    /** Merged over the plugin defaults when a *new* instance is created. */
    config?: Record<string, unknown>;
    /**
     * Whether to call `dispose()` on unmount. CardWidget is cheap and recreates
     * cleanly (`getOrCreateInstance`), OverlayScrollbars keeps-alive otherwise
     * and MUST destroy — every shipped wrapper below sets what it needs.
     */
    disposeOnCleanup?: boolean;
};

/**
 * Idempotent, StrictMode-safe instance hook.
 *
 * Returns a ref object. Attach it to the element the component attaches to;
 * set `selector` to target a child instead. The Factory must use
 * `getXOrCreateInstance`-style creation (never `new` a second instance).
 */
export function useAdminlteComponent<T extends Disposable>(
    factory: (el: HTMLElement, config?: Record<string, unknown>) => T,
    { selector, config, disposeOnCleanup = true }: Options = {}
): RefObject<HTMLElement | null> {
    const ref = useRef<HTMLElement | null>(null);

    // Stabilize the config object identity per serialized value: mostly a
    // courtesy for strict effect deps; config is only consulted at creation.
    const configKey = config ? JSON.stringify(config) : "";

    useEffect(() => {
        const root = ref.current;
        if (!root) {
            return undefined;
        }
        const el = (selector ? root.querySelector(selector) : root) as HTMLElement | null;
        if (!el) {
            return undefined;
        }

        const existing = instanceRegistry.get(el) as T | undefined;
        const instance = existing ?? factory(el, config);
        if (!existing) {
            instanceRegistry.set(el, instance);
        }

        if (disposeOnCleanup) {
            return () => {
                instance.dispose();
                instanceRegistry.delete(el);
            };
        }
        return undefined;
        // `selector` is a static string in every shipped wrapper.
        // eslint-disable-next-line react-hooks/exhaustive-deps -- config handled by configKey
    }, [configKey]);

    return ref;
}
