import React, { useContext, useEffect, useState } from "react"
import { Card, Input, Layout, Row, Space } from "antd"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"

import ChatCard from "../components/ChatCard"
import GenericSpinner from "../components/GenericSpinner"
import { AuthContext } from "../context/AuthContext"
import { ChatContext } from "../context/ChatContext"

const { TextArea } = Input

export default function Chat(props) {
  const navigate = useNavigate()
  const { id } = useParams()

  // Context
  const authContext = useContext(AuthContext)
  const chatContext = useContext(ChatContext)
  const { allChats, allChatsLoading, getChatHistory } = chatContext
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
    if (!id) {
      setChatId(undefined)
      setChatHistory([])
      setQuestionInput("")
    } else if (id && !allChatsLoading && allChats && allChats.length) {
      const idHistory = allChats.filter((c) => c._id === id)
      setChatId(id)
      setChatHistory(idHistory[0].history)
    }
  }, [allChats, allChatsLoading, id])

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
        if (!chatId) {
          setChatId(data._id)
          navigate(`/${data._id}`)
        }

        getChatHistory(userProfile.email)
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
  const handleInputChange = (e) => setQuestionInput(e.target.value)
  const handleKeyDown = (e) => e.key === "Enter" && e.preventDefault()

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
    <GenericSpinner size="large" />
  ) : (
    <Layout
      style={{
        backgroundColor: "white",
        justifyContent: "space-between",
        height: "calc(100vh - 96px",
        overflowY: "scroll",
      }}
    >
      <Row
        style={{
          alignItems: "center",
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
            <Space direction="vertical" size="middle">
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
            </Space>
          </Card>
        ) : (
          <>Start Chatting!</>
        )}
      </Row>
      <Row
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          position: "relative",
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
          onKeyDown={handleKeyDown}
          onPressEnter={handleSearch}
          style={{ width: "60%" }}
          value={questionInput}
        ></TextArea>
      </Row>
    </Layout>
  )
}
