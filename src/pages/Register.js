import { Link } from "react-router-dom"
import TextField from '@mui/material/TextField';

const register = () => {
  return (
    <div>
      <h1>REGISTER</h1>
      <input type="text" placeholder="Name" /><br />
      <input type="email" placeHolder="Email" /> <br />
      <input type="password" placeHolder="Password" /> <br />
      <Link to="/Login">
        <input type="submit" />
      </Link>
    </div>
  )
}

export default register