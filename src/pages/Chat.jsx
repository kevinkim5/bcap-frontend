import { useContext, useEffect, useState } from "react"
import { Card, Col, Input, Layout, List, Row, Typography } from "antd"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

export default function Chat(props) {
  const navigate = useNavigate()
  const authContext = useContext(AuthContext)
  const { loggedIn, user, userProfile } = authContext
  const [loading, setLoading] = useState(true)

  console.log(user)

  useEffect(() => {
    if (!loggedIn) {
      navigate("/login")
    } else {
      setLoading(false)
    }
  }, [loggedIn])

  return loading ? <>Loading...</> : <Layout>Dummy Chat</Layout>
}
