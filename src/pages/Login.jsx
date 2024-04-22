import React, { useContext, useEffect, useState } from "react"
import { useGoogleLogin } from "@react-oauth/google"
import { Button, Typography } from "antd"
import axios from "axios"
import { useNavigate } from "react-router-dom"

import { AuthContext } from "../context/AuthContext"
import GenericSpinner from "../components/GenericSpinner"
import { GoogleCircleFilled } from "@ant-design/icons"

const { Title } = Typography

export default function Login(props) {
  const authContext = useContext(AuthContext)
  const { loggedIn, setUser, setUserProfile } = authContext
  const navigate = useNavigate()

  const [loggingIn, setLoggingIn] = useState(false)

  const handleLogin = useGoogleLogin({
    onSuccess: (response) => {
      callGoogleAPI(response)
      setUser(response)
    },
    onError: (error) => {
      console.log(`Login Failed: ${error}`)
      setLoggingIn(false)
    },
  })

  const callGoogleAPI = async (user) => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/oauth2/v2/userinfo?client_id=${user.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: "application/json",
          },
        },
      )
      const { data: userInfo } = response
      setUserProfile(userInfo)
    } catch (err) {
      console.log(err)
      setUser(null)
      setUserProfile(null)
      navigate("/login")
    }
  }

  useEffect(() => {
    if (loggedIn) navigate("/")
    setLoggingIn(false)
  }, [loggedIn])

  return (
    <div className="login">
      {loggingIn ? (
        <GenericSpinner customText="Logging In" />
      ) : (
        <div className="title-wrapper">
          <Title className="main-title">Brain Bot</Title>
          <Title level={3} className="sub-title">
            Unlock your creative potential and reach peak productivity
          </Title>
          <div className="sub-title">
            Chat to start writing, planning, learning and more with Brain Bot
          </div>
          <Button
            onClick={(e) => {
              setLoggingIn(true)
              handleLogin()
            }}
            icon={
              <GoogleCircleFilled
                style={{ color: "#0a211a", fontSize: "30px" }}
              />
            }
            type="primary"
            className="button-sign-in"
            style={{
              height: "fit-content",
              display: "flex",
              alignItems: "center",
              color: "white",
              marginTop: "10px",
            }}
          >
            <Typography.Text style={{ color: "#0a211a", fontSize: "20px" }}>
              Sign in with Google
            </Typography.Text>
          </Button>
        </div>
      )}
    </div>
  )
}
