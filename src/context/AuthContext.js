import { createContext, useEffect, useState } from "react"
import axios from "axios"

export const AuthContext = createContext({
  loggedIn: null,
  checkLoginState: null,
  user: null,
  setLoggedIn: null,
})

export function AuthContextProvider(props) {
  const [loggedIn, setLoggedIn] = useState(null)
  const [user, setUser] = useState(null)
  const [userProfile, setUserProfile] = useState(null)

  const updateDBWithUser = async () => {
    const userFormData = new FormData()
    userFormData.append("name", userProfile.name)
    userFormData.append("email", userProfile.email)
    const res = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/users/login`,
      userFormData,
    )
    console.log(res)
  }

  useEffect(() => {
    console.log(userProfile)
    if (userProfile && userProfile.name && userProfile.email) {
      updateDBWithUser()
    }
  }, [userProfile])

  return (
    <AuthContext.Provider
      value={{
        loggedIn,
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
