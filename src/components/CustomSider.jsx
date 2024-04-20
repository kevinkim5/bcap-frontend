import { useContext, useEffect, useState } from "react"
import { Button, Layout, List, Row, Typography } from "antd"
import { useLocation, useNavigate } from "react-router-dom"

import { AuthContext } from "../context/AuthContext"
import { ChatContext } from "../context/ChatContext"
import { PlusCircleOutlined } from "@ant-design/icons"

const { Header, Sider } = Layout
const { Title } = Typography

export default function CustomSider(props) {
  const location = useLocation()
  const navigate = useNavigate()
  console.log(location.pathname)
  // Context
  const authContext = useContext(AuthContext)
  const chatContext = useContext(ChatContext)
  const { loggedIn, user, userProfile } = authContext
  const { allChats, getChatHistory } = chatContext

  // State
  const [collapsed, setCollapsed] = useState(true)

  const handleClickPastChat = (chatId) => {
    console.log(chatId)
    navigate(`/${chatId}`)
  }

  useEffect(() => {
    if (loggedIn && userProfile.email) {
      getChatHistory(userProfile.email)
    }
  }, [loggedIn, userProfile])

  return !loggedIn ? null : (
    <Sider
      collapsed={collapsed}
      collapsible
      onCollapse={(collapsed) => setCollapsed(collapsed)}
      style={{ backgroundColor: "#f0f4f9" }}
    >
      <Row
        style={{
          alignItems: "center",
          padding: "16px 0px",
          left: "16px",
          position: "relative",
        }}
      >
        <Button
          icon={<PlusCircleOutlined />}
          onClick={() => {
            navigate("/")
          }}
          size="large"
        >
          {collapsed ? null : "New Chat"}
        </Button>
      </Row>
      {collapsed ? null : (
        <Row style={{ padding: "0px 16px" }}>
          <Title level={5}>Recent</Title>
          {loggedIn && allChats.length ? (
            <List
              dataSource={allChats}
              renderItem={(item) => {
                return (
                  <List.Item
                    onClick={() => handleClickPastChat(item._id)}
                    style={{ cursor: "pointer" }}
                  >
                    <Typography.Text>{item.title}</Typography.Text>
                  </List.Item>
                )
              }}
            />
          ) : null}
        </Row>
      )}
    </Sider>
  )
}
