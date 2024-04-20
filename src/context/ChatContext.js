import { createContext, useEffect, useState } from "react"
import axios from "axios"
import { API_PATHS } from "../constants"

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
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/${API_PATHS.HISTORY}/${email}`,
      )
      const { data } = res
      if (data) setAllChats(data)
      setAllChatsLoading(false)
    } catch (err) {
      console.log(err)
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
