import React, { useContext, useEffect, useState } from "react"
import { googleLogout, useGoogleLogin } from "@react-oauth/google"
import { Button, Typography } from "antd"
import axios from "axios"
import { useNavigate } from "react-router-dom"

import { AuthContext } from "../context/AuthContext"

const { Title } = Typography

export default function Login(props) {
  const authContext = useContext(AuthContext)
  const { setLoggedIn, setUser, setUserProfile, user } = authContext
  const navigate = useNavigate()

  const handleLogin = useGoogleLogin({
    onSuccess: (response) => {
      console.log("login success")
      setUser(response)
    },
    onError: (error) => console.log(`Login Failed: ${error}`),
  })

  const handleLogout = () => {
    console.log("logout")
    googleLogout()
  }

  const callGoogleAPI = async () => {
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
      setLoggedIn(true)
      navigate("/")
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (user) {
      callGoogleAPI()
    }
  }, [user])

  return (
    <div
      style={{
        width: "100%",
        height: "calc(100vh - 96px)",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Title>Come Chat with me!</Title>
      <Title level={3}>Get Started</Title>
      <Button onClick={handleLogin}>Sign in with Google 🚀</Button>
      {/* {profile ? (
        <div>
          <img src={profile.picture} alt="" />
          <h3>User Logged in</h3>
          <p>Name: {profile.name}</p>
          <p>Email Address: {profile.email}</p>
          <br />
          <br />
          <button onClick={handleLogout}>Log out</button>
        </div>
      ) : (
        <button onClick={handleLogin}>Sign in with Google 🚀 </button>
      )} */}
      {/* <Button onClick={handleLogout}>Logout</Button> */}
    </div>
  )
}
