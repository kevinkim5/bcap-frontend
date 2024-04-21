import axios from "axios"

const baseAPI = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  withCredentials: true,
})

export const getAPICall = async (url) => {
  try {
    const res = await baseAPI.get(url)
    return res.data
  } catch (err) {
    console.log(err)
    if (err.response.status === 403) return { isLoggedIn: false }
    return { error: err }
  }
}

export const postAPICall = async (url, dataObj) => {
  try {
    const formData = new FormData()
    Object.keys(dataObj).forEach((key) => {
      const value = dataObj[key]
      formData.append(key, value)
    })
    const res = await baseAPI.post(url, formData)
    return res.data
  } catch (err) {
    console.log(err)
    if (err.response.status === 403) return { isLoggedIn: false }
    return { error: err }
  }
}
