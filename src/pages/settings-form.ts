// Shared submit guard for the Settings demo forms: the dist page's forms have
// no backing endpoint, so submission is prevented instead of navigating.
import type { SubmitEvent } from "react";

export const preventFormDefault = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
};
