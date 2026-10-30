import { redirect, type MiddlewareFunction } from "react-router";
import { STORAGE_KEYS } from "../utils/keys";

export function hasWebToken(): boolean {
    const token = localStorage.getItem(STORAGE_KEYS.webToken);
    return token !== null && token.trim() !== "";
}

/** Shell routes only. Auth pages sit outside this route. */
export const requireWebToken: MiddlewareFunction = async (args, next) => {
    void args;
    if (!hasWebToken()) throw redirect("/login");
    await next();
};
