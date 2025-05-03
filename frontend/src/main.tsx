import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.scss'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { FetchError } from './utils/fetchJSON.ts'
import { InventoryProvider } from './components'
import { Helmet } from "react-helmet"

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: (count, error) => {
        if (error instanceof FetchError && error.status === 401) {
          return false
        }
        return count < 3
      },
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Helmet>
      <link rel="icon" type="image/png" href={`${import.meta.env.VITE_FRONT_URL}/favicon-96x96.png`} sizes="96x96" />
      <link rel="icon" type="image/svg+xml" href={`${import.meta.env.VITE_FRONT_URL}/favicon.svg`} />
      <link rel="shortcut icon" href={`${import.meta.env.VITE_FRONT_URL}/favicon.ico`} />
      <link rel="apple-touch-icon" sizes="180x180" href={`${import.meta.env.VITE_FRONT_URL}/apple-touch-icon.png`} />
      <meta name="apple-mobile-web-app-title" content="Hollow clicker" />
      <link rel="manifest" href={`${import.meta.env.VITE_FRONT_URL}/site.webmanifest`} />
    </Helmet>
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
)
