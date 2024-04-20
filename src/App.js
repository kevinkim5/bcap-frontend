import React from "react"
import { Layout } from "antd"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Login from "./pages/Login"
import Chat from "./pages/Chat"
const { Header, Sider } = Layout
import { AuthContextProvider } from "./context/AuthContext"

function App() {
  return (
    <AuthContextProvider>
      <Layout style={{ height: "100vh" }}>
        <Header />
        <Layout>
          <Sider />
          <Router>
            <Routes>
              <Route path="/" element={<Chat />} />
              <Route path="/login" element={<Login />} />
              <Route path="/:id" element={<Chat />} />
            </Routes>
          </Router>
        </Layout>
      </Layout>
    </AuthContextProvider>
  )
}

export default App
