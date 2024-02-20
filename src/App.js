import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Reginster/Register";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;