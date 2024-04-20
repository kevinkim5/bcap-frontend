import { Card, Col, Input, Layout, List, Row, Typography } from "antd"
import TextArea from "antd/es/input/TextArea"

import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import ChatCard from "../components/ChatCard"
import { AuthContext } from "../context/AuthContext"
import { ChatContext } from "../context/ChatContext"

export default function Chat(props) {
  const navigate = useNavigate()
  const { id } = useParams()

  // Context
  const authContext = useContext(AuthContext)
  const chatContext = useContext(ChatContext)
  const { allChats, getChatHistory } = chatContext
  const { loggedIn, userProfile } = authContext

  // States
  const [chatHistory, setChatHistory] = useState([])
  const [chatId, setChatId] = useState(id)
  const [loading, setLoading] = useState(true)
  const [loadingResponse, setLoadingResponse] = useState(false)
  const [questionInput, setQuestionInput] = useState("")
  const [responseError, setResponseError] = useState(false)

  // Side Effects
  useEffect(() => {
    if (id && allChats && allChats.length) {
      const idHistory = allChats.filter((c) => c._id === id)
      setChatId(id)
      setChatHistory(idHistory[0].history)
    }
  }, [allChats, id])

  useEffect(() => {
    if (!loggedIn) {
      navigate("/login")
    } else {
      setLoading(false)
    }
  }, [loggedIn])

  // API calls
  const getResponse = async (question, history) => {
    try {
      const askFormData = new FormData()
      askFormData.append("question", question)
      askFormData.append(
        "history",
        JSON.stringify(history.filter((h) => h.role !== "error")),
      )
      askFormData.append("email", userProfile.email)
      if (chatId) askFormData.append("chatId", chatId)
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/chat`,
        askFormData,
      )
      console.log(res)
      const { data } = res
      if (data) {
        setLoadingResponse(false)
        setChatHistory([...data.history])
        if (!chatId) setChatId(data._id)
      } else {
        throw Error
      }
    } catch (err) {
      console.log(err)
      setLoadingResponse(false)
      setResponseError(true)
      setChatHistory((prevHistory) => {
        return [
          ...prevHistory,
          {
            role: "error",
            parts: [],
          },
        ]
      })
    }
  }

  // Handlers
  const handleInputChange = (e) => {
    setQuestionInput(e.target.value)
  }

  const handleSearch = () => {
    setChatHistory((prevHistory) => {
      getResponse(questionInput, prevHistory)
      const newHistory = [
        ...prevHistory,
        {
          role: "user",
          parts: [{ text: questionInput }],
        },
      ]
      return newHistory
    })
    setLoadingResponse(true)
    setQuestionInput("")
  }

  return loading ? (
    <>Loading...</>
  ) : (
    <Layout
      style={{
        justifyContent: "space-between",
        height: "calc(100vh - 96px",
        overflowY: "scroll",
      }}
    >
      <Row
        style={{
          justifyContent: "center",
          width: "100%",
          height: "calc(100vh - 96px)",
        }}
      >
        {chatHistory.length ? (
          <Card
            style={{
              height: "calc(100vh - 96px)",
              overflowY: "scroll",
              width: "80%",
            }}
          >
            {chatHistory.map((history, _idx) => {
              const { parts, role } = history
              return (
                <Row
                  key={_idx.toString()}
                  style={{
                    width: "100%",
                  }}
                >
                  <ChatCard parts={parts} role={role} />
                </Row>
              )
            })}
            {loadingResponse && <>...Loading</>}
          </Card>
        ) : (
          <>Start Chatting!</>
        )}
      </Row>
      <Row
        style={{
          justifyContent: "center",
          width: "100%",
          position: "fixed",
          bottom: "48px",
        }}
      >
        <TextArea
          autoSize={{
            minRows: 1,
            maxRows: 8,
          }}
          placeholder="Enter a prompt here"
          onChange={handleInputChange}
          onPressEnter={handleSearch}
          style={{ width: "60%" }}
          value={questionInput}
        ></TextArea>
      </Row>
    </Layout>
  )
}
