import axios from "axios"
import server from "../../globals"

// import store from "../../redux/store";
// import { login } from "../../redux/userSlice";

const apiEndpoint = `${server}`

export const verifyToken = async (accessToken: string) => {

  const headers = {
    "authorization": `BEARER ${accessToken}`
  }
  const res = await axios
    .post(`${apiEndpoint}/verifyToken/`, "", {headers})
    .then(res => {
      console.log("HELLO")
      const userData = res.data.decoded.user
      // const userDetails = { id: userData._id, name: `${userData.first_name} ${userData.last_name}`, email: userData.email_id, organisation_id: userData.organisation ? userData.organisation : "", userType: userData.organisation ? "organisation" : "system", isAuthenticated: true };
      // store.dispatch(login(userDetails))

      return {
        ...res.data,
        userType: userData.organisation ? "organisation" : "system"
      }
    })
    .catch(error => {
      throw error
    })

  return res
}
