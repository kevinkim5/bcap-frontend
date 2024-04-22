import React, { useContext, useState } from "react"
import { RobotOutlined, UserOutlined } from "@ant-design/icons"
import { Avatar, Button, Card, Row, Skeleton } from "antd"
import Markdown from "react-markdown"

import { AuthContext } from "../context/AuthContext"

export default function ChatCard(props) {
  const { idx, parts, cardRole } = props
  const textParts = parts.map((x) => x.text)

  const authContext = useContext(AuthContext)
  const { userProfile } = authContext

  const [expanded, setExpanded] = useState(false)

  const getAvatarContent = () => {
    if (cardRole === "user") {
      return (
        <Avatar
          className="avatar"
          src={userProfile.picture ? userProfile.picture : undefined}
          // put at end, icon is backup
          icon={<UserOutlined />}
        />
      )
    }
    return <Avatar icon={<RobotOutlined />} style={{ background: "#0ac985" }} />
  }

  const getCardContent = () => {
    switch (cardRole) {
      case "user":
      case "model":
        return <Markdown>{textParts.join(" ")}</Markdown>

      case "loading":
        return <Skeleton active />

      case "error":
        return <>Error Loading Response!</>
    }
  }

  return (
    <Row key={idx.toString()} className="chat-card-wrapper">
      <Card
        className="chat-card"
        // extra={
        //   <Button onClick={() => setExpanded(!expanded)}>
        //     {expanded ? "Hide" : "Show More"}
        //   </Button>
        // }
        title={getAvatarContent()}
      >
        {getCardContent()}
      </Card>
    </Row>
  )
}
