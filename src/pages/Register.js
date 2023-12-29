import { Link } from "react-router-dom"

const register = () => {
  return (
    <div>
      <h1>Register</h1>
      <input type="text" placeholder="Name" /><br />
      <input type="email" placeHolder="Email" /> <br />
      <input type="password" placeHolder="Password" /> <br />
      <input type="submit" />
      <Link to="/Login">
        <input type="submit" value="Register" />
      </Link>
    </div>
  )
}

export default register