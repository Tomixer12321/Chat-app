import { Link } from "react-router-dom"

const Login = () => {
  return (
    <div>
      <h1>LOGIN</h1>
      <input type="email" placeHolder="email" /> <br />
      <input type="password" placeHolder="password" /> <br />
      <input type="submit" />
      <Link to="/register">
        <input type="submit" value="register" />
      </Link>
    </div>
  )
}

export default Login