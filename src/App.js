import React from "react"
import { Layout } from "antd"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import CustomSider from "./components/CustomSider"
import Login from "./pages/Login"
import Chat from "./pages/Chat"
import { AuthContextProvider } from "./context/AuthContext"
import { ChatContextProvider } from "./context/ChatContext"

const { Header, Footer } = Layout

function App() {
  return (
    <AuthContextProvider>
      <ChatContextProvider>
        <Router>
          <Layout
            style={{
              height: "100vh",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            <Header style={{ height: "48px" }} />
            <Layout>
              <CustomSider />
              <Layout>
                <Routes>
                  <Route path="/" element={<Chat />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/:id" element={<Chat />} />
                </Routes>
                <Footer
                  style={{
                    height: "48px",
                    paddingTop: "12px",
                    paddingBottom: "12px",
                    textAlign: "center",
                  }}
                >
                  The chatbot may display inaccurate info, including about
                  people, so double-check its responses.
                </Footer>
              </Layout>
            </Layout>
          </Layout>
        </Router>
      </ChatContextProvider>
    </AuthContextProvider>
  )
}

export default App
