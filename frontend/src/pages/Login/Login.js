import "./Login.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import httpRequest from "../../httpRequest";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = async (event) => {
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");

    try {
      await httpRequest.post("http://localhost:5000/login", {
        email,
        password,
      });

      window.location.href = "/";
    } catch (error) {}
};

  return (
    <Box className="login-container" onSubmit={handleLogin}>
      <Typography
        component="h1"
        variant="h4"
        sx={{
          fontFamily: "Oxanium, cursive",
          fontWeight: 600,
          marginBottom: 4,
        }}
      >
        LOGIN
      </Typography>
      <TextField
        id="Email"
        value={email}
        onChange={handleEmailChange}
        label="Email"
        variant="outlined"
        sx={{
          width: "18%",
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: "#ed288b",
            },
          },
          "& .MuiInputLabel-outlined.Mui-focused": {
            color: "#ed288b",
          },
        }}
      />
      <br />
      <TextField
        id="Password" 
        onChange={handlePasswordChange}
        type={showPassword ? "text" : "password"}
        label="Password"
        variant="outlined"
        sx={{
          width: "18%",
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: "#ed288b",
            },
          },
          "& .MuiInputLabel-outlined.Mui-focused": {
            color: "#ed288b",
          },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
                style={{ marginRight: "-12px" }}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <br />
      <FormControlLabel
        control={<Checkbox defaultChecked sx={{ color: "#ed288b" }} />}
        label="Remember me"
      />
      <br />
      <Button
        type="button"
        variant="contained"
        sx={{
          fontFamily: "Oxanium, cursive",
          width: "21.7rem",
          backgroundColor: "#ed288b",
          "&:hover": {
            backgroundColor: "#cc27c9",
          },
        }}
      >
        Login
      </Button>
      <Link to="/register">
        <p className="text">Don't have an account? Register</p>
      </Link>
    </Box>
  );
};

export default Login;
