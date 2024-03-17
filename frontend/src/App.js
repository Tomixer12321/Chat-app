import { Routes, Route,} from "react-router-dom";
import { useContext } from "react";
import Register from "./pages/Reginster/Register";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home"
import AuthContext from "./context/auth-context";
import useAuth from "./hooks/useAuth";

const App = () => {
  const authContext = useContext(AuthContext);

  useAuth();
  
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={authContext.isAuthenticated() ? <Home /> : <Login />}/>
      </Routes>
    </div>
  );
};

export default App;