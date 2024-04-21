import React from "react"
import { Layout } from "antd"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import CustomFooter from "./components/CustomFooter"
import CustomHeader from "./components/CustomHeader"
import CustomSider from "./components/CustomSider"
import Login from "./pages/Login"
import Chat from "./pages/Chat"
import { AuthContextProvider } from "./context/AuthContext"
import { ChatContextProvider } from "./context/ChatContext"

const { Header, Footer } = Layout

function App() {
  return (
    <Router>
      <AuthContextProvider>
        <ChatContextProvider>
          <Layout
            style={{
              height: "100vh",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            <CustomHeader />
            <Layout>
              <CustomSider />
              <Layout>
                <Routes>
                  <Route path="/" element={<Chat />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/:id" element={<Chat />} />
                </Routes>
                <CustomFooter />
              </Layout>
            </Layout>
          </Layout>
        </ChatContextProvider>
      </AuthContextProvider>
    </Router>
  )
}

export default App
