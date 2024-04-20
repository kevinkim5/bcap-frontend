import { createContext, useEffect, useState } from "react"
import axios from "axios"
import { API_PATHS } from "../constants"

export const ChatContext = createContext({
  allChats: [],
  getChatHistory: null,
  setAllChats: null,
})

export function ChatContextProvider(props) {
  const [allChats, setAllChats] = useState([])

  const getChatHistory = async (email) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/${API_PATHS.HISTORY}/${email}`,
      )
      const { data } = res
      if (data) setAllChats(data)
      console.log(res)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <ChatContext.Provider value={{ allChats, getChatHistory, setAllChats }}>
      {props.children}
    </ChatContext.Provider>
  )
}
