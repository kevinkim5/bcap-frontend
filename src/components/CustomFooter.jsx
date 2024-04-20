import { useContext, useEffect, useState } from "react"
import { Layout } from "antd"

import { AuthContext } from "../context/AuthContext"

const { Footer } = Layout

export default function CustomFooter(props) {
  const authContext = useContext(AuthContext)
  const { loggedIn } = authContext

  return !loggedIn ? null : (
    <Footer
      style={{
        backgroundColor: "#002140",
        color: "white",
        height: "48px",
        paddingTop: "12px",
        paddingBottom: "12px",
        textAlign: "center",
      }}
    >
      The chatbot may display inaccurate info, including about people, so
      double-check its responses.
    </Footer>
  )
}
