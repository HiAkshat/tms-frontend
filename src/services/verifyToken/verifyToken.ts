import axios from "axios"
import server from "../../globals"

// import store from "../../redux/store"
import Cookie from "js-cookie"

const apiEndpoint = `${server}`

export const verifyToken = async (accessToken: string) => {

  const headers = {
    "authorization": `BEARER ${accessToken}`
  }
  const res = await axios
    .post(`${apiEndpoint}/verifyToken/`, "", {headers})
    .then(res => {
      return {
        ...res.data,
        userType: Cookie.get("organisation") ? "organisation" : "system"
      }
    })
    .catch(error => {
      throw error
    })

  return res
}
