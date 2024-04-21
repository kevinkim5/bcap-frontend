import React, { createContext, useContext, useEffect, useState } from "react"

import { API_PATHS } from "../constants"
import { getAPICall } from "../api/apiManager"
import { AuthContext } from "./AuthContext"

export const ChatContext = createContext({
  allChats: [],
  allChatsLoading: true,
  getChatHistory: null,
  setAllChats: null,
})

export function ChatContextProvider(props) {
  // context
  const authContext = useContext(AuthContext)
  const { loggedIn, userProfile } = authContext

  // states
  const [allChats, setAllChats] = useState([])
  const [allChatsLoading, setAllChatsLoading] = useState(false)

  const getChatHistory = async (email) => {
    try {
      setAllChatsLoading(true)
      const data = await getAPICall(`/${API_PATHS.HISTORY}/${email}`)
      if (data) setAllChats(data)
      setAllChatsLoading(false)
    } catch (err) {
      console.log(err)
      setAllChatsLoading(false)
    }
  }

  // Side Effects
  useEffect(() => {
    if (loggedIn && userProfile.email) {
      getChatHistory(userProfile.email)
    }
  }, [loggedIn, userProfile])

  return (
    <ChatContext.Provider
      value={{ allChats, allChatsLoading, getChatHistory, setAllChats }}
    >
      {props.children}
    </ChatContext.Provider>
  )
}
