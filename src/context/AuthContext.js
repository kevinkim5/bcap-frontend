import { createContext, useEffect, useState } from "react"
import { googleLogout } from "@react-oauth/google"

import { useNavigate } from "react-router-dom"
import { getAPICall, postAPICall } from "../api/apiManager"

export const AuthContext = createContext({
  checkLoginState: null,
  handleLogout: null,
  loggedIn: null,
  setLoggedIn: null,
  user: null,
})

export function AuthContextProvider(props) {
  const navigate = useNavigate()
  const [loggedIn, setLoggedIn] = useState(null)
  const [user, setUser] = useState(null)
  const [userProfile, setUserProfile] = useState(null)

  const handleLogout = async () => {
    const res = await getAPICall("/logout")
    googleLogout()
    if (!res.loggedIn) {
      setLoggedIn(false)
      setUserProfile(null)
      navigate("/login")
    }
  }

  const updateDBWithUser = async () => {
    const dataObj = {
      name: userProfile.name,
      email: userProfile.email,
    }
    if (userProfile.picture) dataObj.picture = userProfile.picture
    const res = await postAPICall("/login", dataObj)
    setLoggedIn(true)
  }

  useEffect(() => {
    // check session on load
    const checkSession = async () => {
      const res = await getAPICall("/session")
      const { isLoggedIn, email, name, picture } = res
      if (isLoggedIn) {
        setUserProfile({
          email,
          name,
          picture,
        })
        setLoggedIn(true)
      } else {
        navigate("/login")
      }
    }
    checkSession()
  }, [])

  useEffect(() => {
    if (userProfile && userProfile.name && userProfile.email) {
      updateDBWithUser()
    }
  }, [loggedIn, userProfile])

  return (
    <AuthContext.Provider
      value={{
        loggedIn,
        handleLogout,
        setLoggedIn,
        setUser,
        setUserProfile,
        user,
        userProfile,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}
