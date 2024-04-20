import { useContext, useEffect, useState } from "react"
import { Layout, List, Typography } from "antd"
import { useNavigate } from "react-router-dom"

import { AuthContext } from "../context/AuthContext"
import { ChatContext } from "../context/ChatContext"

const { Header, Sider } = Layout

export default function CustomSider(props) {
  const navigate = useNavigate()

  // Context
  const authContext = useContext(AuthContext)
  const chatContext = useContext(ChatContext)
  const { loggedIn, user, userProfile } = authContext
  const { allChats, getChatHistory } = chatContext

  const handleClickPastChat = (chatId) => {
    console.log(chatId)
    navigate(`/${chatId}`)
  }

  useEffect(() => {
    if (loggedIn && userProfile.email) {
      getChatHistory(userProfile.email)
    }
  }, [loggedIn, userProfile])

  return (
    <Sider
      defaultCollapsed={true}
      collapsible
      style={{ backgroundColor: "wheat" }}
    >
      {loggedIn && allChats.length && (
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
      )}
    </Sider>
  )
}
