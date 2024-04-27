import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/userSlice';
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [userType, setUserType] = useState(0)
  const [email, setEmail] = useState("")
  const dispatch = useDispatch()
  let navigate = useNavigate();

  const fetchUserData = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/systemUser/${email}`)
      const userData = await response.json();
      return userData
    } catch (error) {
      console.log(error)
    }
  }

  const handleSelectChange = async (e: { target: { value: string; }; }) => {
    setUserType(parseInt(e.target.value));
  };

  const handleUserLogin = async (e: React.SyntheticEvent) => {
    const userData = await fetchUserData()
    console.log(userData[0])
    const userDetails = { name: `${userData[0].first_name} ${userData[0].last_name}`, email: userData[0].email_id, userType: 'system' };
    dispatch(
      login(userDetails)
    )

    return navigate("/");
  }

  return (
    <div>
      <div>Login as</div>
      <input onChange={(e)=>{setEmail(e.target.value)}} type="text" placeholder='Enter your email' />
      <select id="userType" value={userType} onChange={handleSelectChange}>
        <option value={0}>System User</option>
        <option value={1}>Organization User</option>
      </select>
      <button onClick={handleUserLogin} type='submit'>Submit</button>
    </div>
  )
}