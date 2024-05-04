import Cookie from "js-cookie"

export default function verifyOrgUserSession = async () => {
  const verifyToken = async (accessToken: string) => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/organisationUser/verifyToken/`, {
        method: "POST",
        headers: {
          "authorization": `BEARER ${accessToken}`
        }
      })
      
      const userData = await res.json()
    } catch (error) {
      console.log("Session expired!")
    }
  }

  const accessToken = Cookie.get("accessToken") ?? ""
  return verifyToken(accessToken)
}