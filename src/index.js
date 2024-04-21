import React from "react"
import { GoogleOAuthProvider } from "@react-oauth/google"

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
      <App />
    </React.StrictMode>
  </GoogleOAuthProvider>,
)
reportWebVitals(sendToVercelAnalytics)
