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
          Brain Bot may produce inaccurate information about people, places or
          facts. Please refer to to the {`firm's`} guidelines on use of
          generative AI.
        </>
      )}
    </Footer>
  )
}
