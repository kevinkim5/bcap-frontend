import React, { useContext } from "react"
import { Avatar, Button, Card, Layout, Menu, Popover, Typography } from "antd"

import { UserOutlined } from "@ant-design/icons"
import { AuthContext } from "../context/AuthContext"

const { Header } = Layout
const { Title } = Typography

export default function CustomHeader(props) {
  const authContext = useContext(AuthContext)
  const { handleLogout, loggedIn, userProfile } = authContext

  const popoverContent = () => {
    return (
      <>
        <p>{userProfile.email}</p>
        <Button onClick={handleLogout}>Logout</Button>
      </>
    )
  }

  return (
    <Header
      style={{
        justifyContent: "space-between",
        alignItems: "center",
        display: "flex",
        height: "48px",
        flexDirection: "row",
      }}
    >
      <Title level={3} style={{ color: "white", margin: 0 }}>
        Buddy ChatBot
      </Title>
      {loggedIn ? (
        <Popover
          content={popoverContent}
          placement="bottomRight"
          title={userProfile.name}
        >
          <Button icon={<UserOutlined />} />
        </Popover>
      ) : null}
    </Header>
  )
}
