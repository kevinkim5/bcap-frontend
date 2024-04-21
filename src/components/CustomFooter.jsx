import React, { useContext } from "react"
import { Layout } from "antd"

import { AuthContext } from "../context/AuthContext"

const { Footer } = Layout

export default function CustomFooter(props) {
  const authContext = useContext(AuthContext)
  const { loggedIn } = authContext

  return (
    <Footer
      className="footer"
      style={{
        backgroundColor: !loggedIn ? "white" : "#002140",
      }}
    >
      {!loggedIn ? null : (
        <>
          The chatbot may display inaccurate info, including about people, so
          double-check its responses.
        </>
      )}
    </Footer>
  )
}
