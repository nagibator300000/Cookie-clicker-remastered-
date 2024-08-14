import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { NotificationProvider } from "./components";
import GameStatsProvider from "./components/ReducerProvider/ReducerProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <NotificationProvider>
        <GameStatsProvider>
          <App />
        </GameStatsProvider>
      </NotificationProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
