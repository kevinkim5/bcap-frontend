import { AuthContext } from "../context/AuthContext"
import { RobotOutlined, UserOutlined } from "@ant-design/icons"
import { Card } from "antd"
import { useContext } from "react"
const { Avatar, Meta } = Card

export default function ChatCard(props) {
  const authContext = useContext(AuthContext)
  const { userProfile } = authContext
  const { parts, role } = props
  const textParts = parts.map((x) => x.text)

  const getAvatarContent = () => {
    console.log(userProfile.picture)
    // if (role === "user" && userProfile.picture) {
    //   const imgrStr = userProfile.toString()
    //   return <Avatar src={imgrStr} />
    // } else
    if (role === "user") {
      return <UserOutlined />
    }
    return <RobotOutlined />
  }
  return role === "error" ? (
    <>Error Loading Response!</>
  ) : (
    <Card
      style={{
        color: role === "user" ? "blue" : "black",
        width: "100%",
      }}
    >
      <Meta avatar={getAvatarContent()}></Meta>
      {textParts.join(" ")}
    </Card>
  )
}
