import { createContext, useEffect, useState } from "react"

import { API_PATHS } from "../constants"
import { getAPICall } from "../api/apiManager"

export const ChatContext = createContext({
  allChats: [],
  allChatsLoading: true,
  getChatHistory: null,
  setAllChats: null,
})

export function ChatContextProvider(props) {
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

  return (
    <ChatContext.Provider
      value={{ allChats, allChatsLoading, getChatHistory, setAllChats }}
    >
      {props.children}
    </ChatContext.Provider>
  )
}
