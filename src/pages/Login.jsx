import React, { useContext, useEffect, useState } from "react"
import { googleLogout, useGoogleLogin } from "@react-oauth/google"
import { Button, Typography } from "antd"
import axios from "axios"
import { useNavigate } from "react-router-dom"

import { AuthContext } from "../context/AuthContext"
import GenericSpinner from "../components/GenericSpinner"

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
        <>
          <Title className="main-title">Come Chat with me!</Title>
          <Title level={3}>Get Started</Title>
          <Button
            onClick={(e) => {
              setLoggingIn(true)
              handleLogin()
            }}
          >
            Sign in with Google 🚀
          </Button>
        </>
      )}
    </div>
  )
}
