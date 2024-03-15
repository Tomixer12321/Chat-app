import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import httpRequest from "../../httpRequest";
import userContext from "../../context/user-context";
import './Home.css';

const Home = () => {
  const userCtx = useContext(userContext);
  const [userName, setUserName] = useState();

  useEffect(() => {
    (async () => {
      try {
        const resp = await httpRequest.get("http://localhost:5000/@me");
        userCtx.setUserName(resp.data.name);
        userCtx.setEmail(resp.data.email);
        setUserName(resp.data.name);
      } catch (error) {
        window.location.href = "/login";
        console.log("Not authenticated");
      }
    })();
  }, [userCtx]);


  return (
    <div className="container">
      <h1 className="title">You must be logged</h1>
      <div className="login-link">
        <Link to="/login" className="login">Login</Link>
      </div>
    </div>
  );
};

export default Home;
