import { redirect, type MiddlewareFunction } from "react-router";
import { hasWebToken } from "./require-web-token";

/** Unmatched paths. Missing token goes to login in one hop. */
export const unknownPath: MiddlewareFunction = () => {
    if (!hasWebToken()) throw redirect("/login");
    throw redirect("/pages/404");
};
