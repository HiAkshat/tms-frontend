import Cookie from "js-cookie"

export default async function verifySession(): Promise<any> {
  const accessToken: string = Cookie.get("accessToken") ?? ""

  try {
    const res = await fetch(`http://127.0.0.1:8000/api/verifyToken/`, {
      method: "POST",
      headers: {
        "authorization": `BEARER ${accessToken}`
      }
    })
    
    const data = await res.json()
    return data
  } catch (error) {
    console.log("Session expired!")
  }
}