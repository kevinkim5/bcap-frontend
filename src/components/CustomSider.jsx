import React, { useContext, useState } from "react"
import { PlusCircleOutlined } from "@ant-design/icons"
import { Button, Layout, Row } from "antd"
import { useNavigate } from "react-router-dom"

import ConversationList from "./ConversationList"
import { AuthContext } from "../context/AuthContext"

const { Sider } = Layout

export default function CustomSider(props) {
  const navigate = useNavigate()

  // Context
  const authContext = useContext(AuthContext)
  const { loggedIn, user, userProfile } = authContext

  // State
  const [collapsed, setCollapsed] = useState(true)

  return !loggedIn ? null : (
    <Sider
      collapsed={collapsed}
      collapsible
      onCollapse={(collapsed) => setCollapsed(collapsed)}
      width={"20%"}
      style={{ backgroundColor: "#f0f4f9" }}
    >
      <Row
        style={{
          alignItems: "center",
          padding: "16px 0px",
          left: "16px",
          position: "relative",
          height: "72px",
        }}
      >
        <Button
          icon={<PlusCircleOutlined />}
          onClick={() => {
            navigate("/")
          }}
          size="large"
          // type="secondary"
        >
          {collapsed ? null : "New Chat"}
        </Button>
      </Row>
      {collapsed ? null : <ConversationList />}
    </Sider>
  )
}
