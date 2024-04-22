import React, { useContext, useEffect, useState, useRef } from "react"
import { Layout, Row, Space, Typography } from "antd"
import { useNavigate, useParams } from "react-router-dom"

import { postAPICall } from "../api/apiManager"
import ChatCard from "../components/ChatCard"
import GenericSpinner from "../components/GenericSpinner"
import { AuthContext } from "../context/AuthContext"
import { ChatContext } from "../context/ChatContext"

import PromptInput from "../components/PromptInput"

const { Title } = Typography

export default function Chat() {
  const navigate = useNavigate()
  const { id } = useParams()

  // Context
  const authContext = useContext(AuthContext)
  const chatContext = useContext(ChatContext)
  const { allChats, allChatsLoading, getChatHistory } = chatContext
  const { loggedIn, userProfile } = authContext

  // Refs
  const messagesEndRef = useRef(null)
  const promptInputRef = useRef(null)

  // States
  const [chatHistory, setChatHistory] = useState([])
  const [chatId, setChatId] = useState(id)
  const [loading, setLoading] = useState(true)
  const [loadingResponse, setLoadingResponse] = useState(false)
  const [questionInput, setQuestionInput] = useState("")

  // Helper functions
  const getChatListHeight = () => {
    const offsetHeight =
      promptInputRef?.current?.resizableTextArea?.textArea?.offsetHeight || 66
    return `calc(100vh - 96px - ${offsetHeight + 20}px)`
  }

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

      const dataObj = {
        question,
        history: JSON.stringify(history.filter((h) => h.role !== "error")),
        email: userProfile.email,
      }
      if (chatId) dataObj.chatId = chatId
      const data = await postAPICall("/chat", dataObj)

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

  useEffect(() => {
    getChatListHeight()
  }, [
    questionInput,
    promptInputRef?.current?.resizableTextArea?.textArea?.offsetHeight,
  ])

  return loading ? (
    <GenericSpinner size="large" />
  ) : (
    <Layout className="chat">
      <Row className="messages-wrapper" style={{ height: getChatListHeight() }}>
        {chatHistory.length ? (
          <Space
            className="message-space"
            direction="vertical"
            size="middle"
            style={{ height: getChatListHeight() }}
          >
            {chatHistory.map((history, _idx) => {
              const { parts, role } = history
              return (
                <React.Fragment key={_idx.toString()}>
                  <ChatCard idx={_idx} parts={parts} cardRole={role} />
                  {_idx === chatHistory.length - 1 ? (
                    <div ref={messagesEndRef}></div>
                  ) : null}
                </React.Fragment>
              )
            })}
            {loadingResponse && (
              <ChatCard idx={"1"} parts={[]} cardRole={"loading"} />
            )}
          </Space>
        ) : (
          <div>
            <Title className="hello">Hello, {userProfile.name}</Title>
            <Title level={3}>How can I help you today?</Title>
          </div>
        )}
      </Row>
      <PromptInput
        ref={promptInputRef}
        handleSearch={handleSearch}
        questionInput={questionInput}
        setQuestionInput={setQuestionInput}
      />
    </Layout>
  )
}
