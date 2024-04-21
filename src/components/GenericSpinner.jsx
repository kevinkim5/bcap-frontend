import { LoadingOutlined } from "@ant-design/icons"
import { Spin } from "antd"

export default function GenericSpinner(props) {
  const { extraStyle: injectedStyles, size } = props
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
        height: "100%",
        justifyContent: "center",
        width: "100%",
        ...injectedStyles,
      }}
    >
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
