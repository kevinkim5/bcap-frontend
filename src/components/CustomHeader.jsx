import React, { useContext } from "react"
import { Avatar, Button, Layout, Popover, Typography } from "antd"

import { UserOutlined } from "@ant-design/icons"
import { AuthContext } from "../context/AuthContext"

const { Header } = Layout
const { Title } = Typography

export default function CustomHeader() {
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
    <Header className="header">
      <Title level={3} className="title">
        Brain Bot
      </Title>
      {loggedIn ? (
        <Popover
          content={popoverContent}
          placement="bottomRight"
          title={userProfile.name}
        >
          <Avatar
            className="avatar"
            src={userProfile.picture ? userProfile.picture : undefined}
            size={{
              xs: 24,
              sm: 32,
              md: 36,
              lg: 36,
              xl: 36,
              xxl: 36,
            }}
            // put at end, icon is backup
            icon={<UserOutlined className="user-outlined" />}
          />
        </Popover>
      ) : null}
    </Header>
  )
}
