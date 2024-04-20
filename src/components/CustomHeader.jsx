import React from "react"
import { Avatar, Layout, Menu } from "antd"
import { UserOutlined } from "@ant-design/icons"
const { Header, Sider, Content } = Layout
export default function CustomHeader(props) {
  return (
    <Header
      style={{
        alignItems: "center",
        display: "flex",
        height: "48px",
        flexDirection: "row-reverse",
      }}
    >
      <Avatar icon={<UserOutlined />} />
    </Header>
  )
}
