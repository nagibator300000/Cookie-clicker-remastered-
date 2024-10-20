import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FetchError } from "./utils/fetchJSON.ts";
import { InventoryProvider } from "./components";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: (count, error) => {
        if (error instanceof FetchError && error.status === 401) {
          return false;
        }
        return count < 3;
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <div className="overlayer">
      <div className="topFleur"></div>
      <div className="bottomFleur"></div>
      <div className="leftCornerFleur"></div>
      <div className="rightCornerFleur"></div>
    </div>
    <QueryClientProvider client={client}>
      <InventoryProvider verticalCellCount={5} horizontalCellCount={5}>
        <App />
      </InventoryProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
