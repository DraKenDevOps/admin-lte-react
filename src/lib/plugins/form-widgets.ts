import { useEffect, useRef } from "react";
import type { RefObject } from "react";
import TomSelect from "tom-select";
import flatpickrFn from "flatpickr";
import type { Options as FlatpickrOptions } from "flatpickr/dist/types/options";
import Quill from "quill";
import type { QuillOptions } from "quill";

type TomSelectSettings = ConstructorParameters<typeof TomSelect>[1];

/** Tom Select on a `<select>`. The package entry includes `virtual_scroll`. */
export function useTomSelect(settings?: TomSelectSettings | object): RefObject<HTMLSelectElement | null> {
    const ref = useRef<HTMLSelectElement>(null);
    useEffect(() => {
        const node = ref.current;
        if (node === null) return undefined;
        const instance = new TomSelect(node, (settings ?? {}) as TomSelectSettings);
        return () => {
            instance.destroy();
        };
    }, [settings]);
    return ref;
}

/** Flatpickr on a text input. */
export function useFlatpickr(options?: Partial<FlatpickrOptions> | object): RefObject<HTMLInputElement | null> {
    const ref = useRef<HTMLInputElement>(null);
    useEffect(() => {
        const node = ref.current;
        if (node === null) return undefined;
        const instance = flatpickrFn(node, (options ?? {}) as Partial<FlatpickrOptions>);
        return () => {
            if (Array.isArray(instance)) {
                for (const picker of instance) picker.destroy();
            } else {
                instance.destroy();
            }
        };
    }, [options]);
    return ref;
}

/** Quill on an editor root. Snow theme inserts a toolbar sibling; remove it too. */
export function useQuill(options: QuillOptions | object): RefObject<HTMLDivElement | null> {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const node = ref.current;
        if (node === null) return undefined;
        new Quill(node, options as QuillOptions);
        for (const label of node.querySelectorAll(".ql-header .ql-picker-label")) {
            label.setAttribute("aria-label", "Heading format");
        }
        const toolbar = node.previousElementSibling;
        return () => {
            if (toolbar?.classList.contains("ql-toolbar")) toolbar.remove();
        };
    }, [options]);
    return ref;
}

/**
 * Source `forms/validation.html` submit listener. `.needs-validation` and
 * `.needs-validation-tooltip` get `was-validated` and do not submit while a
 * field is invalid.
 */
export function useFormValidation(): RefObject<HTMLDivElement | null> {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const node = ref.current;
        if (node === null) return undefined;
        const forms = [...node.querySelectorAll<HTMLFormElement>(".needs-validation, .needs-validation-tooltip")];
        const offs = forms.map((form) => {
            const onSubmit = (event: Event): void => {
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add("was-validated");
            };
            form.addEventListener("submit", onSubmit, false);
            return () => form.removeEventListener("submit", onSubmit, false);
        });
        return () => {
            for (const off of offs) off();
        };
    }, []);
    return ref;
}
