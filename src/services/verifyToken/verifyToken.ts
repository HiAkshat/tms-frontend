import axios from "axios"

export const verifyToken = async (accessToken: string) => {
  const headers = {
    "authorization": `BEARER ${accessToken}`
  }
  const res = await axios
    .post(`http://127.0.0.1:8000/api/verifyToken/`, "", {headers})
    .then(res => {
      return res.data
    })
    .catch(error => {
      throw error
    })

  return res
}
