import axios from "axios"
import React, { useContext, useEffect, useState } from "react"
import { Button } from "antd"
import { googleLogout, useGoogleLogin } from "@react-oauth/google"

import { AuthContext } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

export default function Login(props) {
  const authContext = useContext(AuthContext)
  const { setLoggedIn, setUser, setUserProfile, user } = authContext
  const navigate = useNavigate()
  const [profile, setProfile] = useState()

  const responseOutput = (response) => {
    console.log(response)
    setUser(response)
  }
  const errorOutput = (error) => {
    console.log(error)
  }

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
    setProfile(null)
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
      setProfile(userInfo)
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
    <>
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
      <Button onClick={handleLogout}>Logout</Button>
    </>
  )
}
