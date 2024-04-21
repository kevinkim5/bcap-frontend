import React, { useContext, useEffect, useState, useRef } from "react"
import { Card, Input, Layout, Row, Space } from "antd"
import axios from "axios"
import * as DOMPurify from "dompurify"
import { useNavigate, useParams } from "react-router-dom"

import ChatCard from "../components/ChatCard"
import GenericSpinner from "../components/GenericSpinner"
import { AuthContext } from "../context/AuthContext"
import { ChatContext } from "../context/ChatContext"
import { postAPICall } from "../api/apiManager"

const { TextArea } = Input

export default function Chat(props) {
  const navigate = useNavigate()
  const { id } = useParams()

  // Context
  const authContext = useContext(AuthContext)
  const chatContext = useContext(ChatContext)
  const { allChats, allChatsLoading, getChatHistory } = chatContext
  const { loggedIn, userProfile } = authContext

  // Refs
  const messagesEndRef = useRef(null)

  // States
  const [chatHistory, setChatHistory] = useState([])
  const [chatId, setChatId] = useState(id)
  const [loading, setLoading] = useState(true)
  const [loadingResponse, setLoadingResponse] = useState(false)
  const [questionInput, setQuestionInput] = useState("")
  const [responseError, setResponseError] = useState(false)

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
      // const res = await axios.post(
      //   `${process.env.REACT_APP_SERVER_URL}/chat`,
      //   askFormData,
      // )

      const dataObj = {
        question,
        history: JSON.stringify(history.filter((h) => h.role !== "error")),
        email: userProfile.email,
      }
      if (chatId) dataObj.chatId = chatId
      const res = await postAPICall("/chat", dataObj)

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
  const handleInputChange = (e) => {
    const cleanInput = DOMPurify.sanitize(e.target.value)
    setQuestionInput(cleanInput)
  }
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

  // Side Effects
  useEffect(() => {
    console.log(id)
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
    messagesEndRef?.current?.scrollIntoView()
  }, [chatHistory])

  useEffect(() => {
    if (loggedIn && userProfile) setLoading(false)
  }, [loggedIn, userProfile])

  return loading ? (
    <GenericSpinner size="large" />
  ) : (
    <Layout className="chat">
      <Row className="messages-wrapper">
        {chatHistory.length ? (
          <Space
            direction="vertical"
            size="middle"
            style={{
              height: "calc(100% - 96px)",
              overflowY: "scroll",
              width: "80%",
            }}
          >
            {chatHistory.map((history, _idx) => {
              const { parts, role } = history
              return (
                <React.Fragment key={_idx.toString()}>
                  <Row
                    key={_idx.toString()}
                    style={{
                      width: "100%",
                    }}
                  >
                    <ChatCard parts={parts} role={role} />
                  </Row>
                  {_idx === chatHistory.length - 1 ? (
                    <div ref={messagesEndRef}></div>
                  ) : null}
                </React.Fragment>
              )
            })}
            {loadingResponse && <>...Loading</>}
          </Space>
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
        />
      </Row>
    </Layout>
  )
}
