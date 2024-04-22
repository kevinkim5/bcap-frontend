import React, { forwardRef } from "react"
import { Input, Row } from "antd"
import * as DOMPurify from "dompurify"

const { TextArea } = Input

const PromptInput = forwardRef((props, ref) => {
  const { handleSearch, questionInput, setQuestionInput } = props

  // Handlers
  const handleInputChange = (e) => {
    const cleanInput = DOMPurify.sanitize(e.target.value)
    setQuestionInput(cleanInput)
  }
  const handleKeyDown = (e) => e.key === "Enter" && e.preventDefault()

  return (
    <Row className="prompt-input-wrapper">
      <TextArea
        autoSize={{
          minRows: 2,
          maxRows: 6,
        }}
        ref={ref}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onPaste={handleInputChange}
        onPressEnter={handleSearch}
        placeholder="Enter a prompt here"
        size="large"
        style={{ width: "60%" }}
        value={questionInput}
      />
    </Row>
  )
})
export default PromptInput
