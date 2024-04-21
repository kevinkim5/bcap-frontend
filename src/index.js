import React from "react"
import { GoogleOAuthProvider } from "@react-oauth/google"
import { App as AntdApp, ConfigProvider } from "antd"

import "./styles.scss"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import { sendToVercelAnalytics } from "./vitals"

import { createRoot } from "react-dom/client"
const container = document.getElementById("root")
const root = createRoot(container) // createRoot(container!) if you use TypeScript
root.render(
  <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_OAUTH_ID}>
    <React.StrictMode>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#0ac985",
          },
        }}
      >
        <AntdApp>
          <App />
        </AntdApp>
      </ConfigProvider>
    </React.StrictMode>
  </GoogleOAuthProvider>,
)
reportWebVitals(sendToVercelAnalytics)
