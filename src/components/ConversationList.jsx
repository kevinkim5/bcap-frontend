import React, { useContext, useState } from "react"
import { DeleteOutlined, PlusCircleOutlined } from "@ant-design/icons"
import {
  App,
  Button,
  Col,
  Grid,
  Layout,
  List,
  Popconfirm,
  Row,
  Space,
  Typography,
} from "antd"
import { useNavigate } from "react-router-dom"

import GenericSpinner from "./GenericSpinner"
import { postAPICall } from "../api/apiManager"
import { AuthContext } from "../context/AuthContext"
import { ChatContext } from "../context/ChatContext"

const { Paragraph, Title } = Typography

export default function ConversationList(props) {
  const navigate = useNavigate()
  const { message } = App.useApp()

  // Context
  const authContext = useContext(AuthContext)
  const chatContext = useContext(ChatContext)
  const { loggedIn, user, userProfile } = authContext
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
                        style={{ display: hover ? undefined : "none" }}
                        title="Delete this chat?"
                        description="Confirm to delete this chat?"
                        onConfirm={() => handleDelete(id, title)}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Button
                          icon={<DeleteOutlined type="ghost" />}
                          style={{ display: hover ? undefined : "none" }}
                          // onClick={() => handleDelete(id)}
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
