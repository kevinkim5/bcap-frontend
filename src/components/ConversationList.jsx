import React, { useContext, useState } from "react"
import { DeleteOutlined } from "@ant-design/icons"
import { App, Button, Col, List, Popconfirm, Row, Typography } from "antd"
import { useNavigate } from "react-router-dom"

import GenericSpinner from "./GenericSpinner"
import { postAPICall } from "../api/apiManager"
import { AuthContext } from "../context/AuthContext"
import { ChatContext } from "../context/ChatContext"

const { Paragraph, Title } = Typography

export default function ConversationList() {
  const navigate = useNavigate()
  const { message } = App.useApp()

  // Context
  const authContext = useContext(AuthContext)
  const chatContext = useContext(ChatContext)
  const { userProfile } = authContext
  const { allChats, allChatsLoading, getChatHistory } = chatContext

  // Handlers
  const handleClickPastChat = (chatId) => {
    navigate(`/${chatId}`)
  }

  const handleDelete = async (id, title) => {
    const dataObj = { id }
    const data = await postAPICall("/chat/delete", dataObj)
    if (data && data.deleted) {
      message.success(`Deleted chat '${title}'`)
      getChatHistory(userProfile.email)
      navigate("/")
      return true
    }
  }

  return (
    <Row style={{ padding: "0px 0px 0px 16px" }}>
      <Title
        level={5}
        style={{ height: "45px", marginBottom: 0, marginTop: 10 }}
      >
        Recent
      </Title>
      <Row style={{ width: "100%" }}>
        {allChatsLoading ? (
          <GenericSpinner extraStyle={{ paddingTop: "10px" }} />
        ) : allChats.length ? (
          <List
            dataSource={allChats}
            renderItem={(item) => {
              const { _id: id, title } = item
              const [hover, setHover] = useState(false)
              return (
                <List.Item
                  onClick={() => handleClickPastChat(id)}
                  onMouseEnter={() => setHover(true)}
                  onMouseLeave={() => setHover(false)}
                  style={{ cursor: "pointer" }}
                >
                  <Row style={{ width: "100%" }}>
                    <Col span={20}>
                      <Paragraph
                        ellipsis={{ rows: 2 }}
                        style={{ width: "100%" }}
                      >
                        {title}
                      </Paragraph>
                    </Col>
                    <Col span={4}>
                      <Popconfirm
                        cancelText="No"
                        description="Confirm to delete this chat?"
                        onConfirm={() => handleDelete(id, title)}
                        okText="Yes"
                        placement="right"
                        style={{ display: hover ? undefined : "none" }}
                        title="Delete this chat?"
                      >
                        <Button
                          icon={<DeleteOutlined />}
                          style={{ display: hover ? undefined : "none" }}
                          type="ghost"
                        />
                      </Popconfirm>
                    </Col>
                  </Row>
                </List.Item>
              )
            }}
            style={{
              height: `calc(100vh - 96px - 72px - 65px - 0px)`,
              overflowY: "auto",
            }}
          />
        ) : null}
      </Row>
    </Row>
  )
}
