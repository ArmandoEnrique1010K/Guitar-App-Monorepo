import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Theme as ThemeRadixUI } from "@radix-ui/themes";
import Router from "./routes/router";
import { NotificationsProvider } from "reapop";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NotificationsProvider>
      <ThemeRadixUI>
        <Router />
      </ThemeRadixUI>
    </NotificationsProvider>
  </StrictMode>,
);
