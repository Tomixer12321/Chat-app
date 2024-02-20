import './Home.css';
import { Link } from "react-router-dom";

const Home = () => {
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
