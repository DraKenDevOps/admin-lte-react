import { useEffect, useRef } from "react";
import type { RefObject } from "react";
import Sortable from "sortablejs";
import type { Options as SortableOptions } from "sortablejs";

const DEFAULTS: SortableOptions = {
    group: "shared",
    handle: ".card-header"
};

/** Sortable.js on a static subtree. Destroyed when the node unmounts. */
export function useSortable(options?: SortableOptions): RefObject<HTMLDivElement | null> {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const node = ref.current;
        if (node === null) return undefined;
        const instance = Sortable.create(node, options ?? DEFAULTS);
        for (const header of node.querySelectorAll<HTMLElement>(".connectingSortable .card-header, .connectedSortable .card-header")) {
            header.style.cursor = "move";
        }
        return () => {
            instance.destroy();
        };
    }, [options]);
    return ref;
}
