import { LoadingOutlined } from "@ant-design/icons"
import { Spin, Typography } from "antd"

export default function GenericSpinner(props) {
  const { customText, extraStyle: injectedStyles, size } = props
  const getFontSize = (size) => {
    switch (size) {
      case "small":
        return 24
      case "medium":
        return 48
      case "large":
        return 96
      default:
        return 48
    }
  }
  return (
    <div
      style={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "center",
        width: "100%",
        ...injectedStyles,
      }}
    >
      {customText ? (
        <div style={{ fontSize: getFontSize(size) / 2, marginBottom: "16px" }}>
          {customText}
        </div>
      ) : null}
      <Spin
        indicator={
          <LoadingOutlined
            style={{
              // color: "#001529",
              fontSize: getFontSize(size),
            }}
          />
        }
      />
    </div>
  )
}
