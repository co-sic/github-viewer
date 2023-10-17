import React from "react";
import ReactDOM from "react-dom/client";
import "@fontsource/inter";
import { App } from "./App.tsx";
import { UserProvider } from "./providers";

const rootElement = document.getElementById("root") as HTMLElement;
const root = ReactDOM.createRoot(rootElement);

root.render(
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>,
);
