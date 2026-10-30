import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import "bootstrap";
import "@fontsource/source-sans-3/index.css";
import "overlayscrollbars/styles/overlayscrollbars.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import "./lib/adminlte/adminlte.css";
import { router } from "./router";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
