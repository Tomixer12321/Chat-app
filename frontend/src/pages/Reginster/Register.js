import "./Register.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import httpRequest from "../../httpRequest";

const Register = () => {
  const [nameValid, setNameValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const validateName = (event) => {
    const name = event.target.value;
    if (name.length < 3 && name.length > 0) {
      setNameValid(false);
    } else {
      setNameValid(true);
    }
  };

  const validateEmail = (event) => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const email = event.target.value;
    if (!emailRegex.test(email) && email.length > 0) {
      setEmailValid(false);
    } else {
      setEmailValid(true);
    }
  };

  const validatePassword = (event) => {
    const password = event.target.value;
    if (password.length < 6 && password.length > 0) {
      setPasswordValid(false);
    } else {
      setPasswordValid(true);
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get("name");
    const email = data.get("email");
    const password = data.get("password");

    if (nameValid && emailValid && passwordValid) {
      try {
         const request=await httpRequest.post("http://localhost:5000/register", {
          name,
          email,
          password,
        });
        console.log(request)
        window.location.href = "/login";
      } catch (error) {
        if (error.response.status === 409) {
          alert("ty vyjebane hovno ten user uz existuje");
        } else {
          console.log("Server error");
        }
      }
    }
  };

  return (
    <Box
      component="form"
      className="register-container"
      onSubmit={submitHandler}
    >
      <Typography
        component="h1"
        variant="h4"
        sx={{
          fontFamily: "Oxanium, cursive",
          fontWeight: 600,
          marginBottom: 4,
        }}
      >
        REGISTER
      </Typography>
      <TextField
        id="name"
        label="Name"
        name="name"
        variant="outlined"
        error={!nameValid}
        helperText={!nameValid ? "Name must be at least 3 characters." : ""}
        onBlur={validateName}
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
        id="email"
        label="Email"
        name="email"
        variant="outlined"
        error={!emailValid}
        helperText={!emailValid ? "Incorrect email format." : ""}
        onBlur={validateEmail}
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
        id="password"
        type={showPassword ? "text" : "password"}
        label="Password"
        name="password"
        variant="outlined"
        error={!passwordValid}
        helperText={!passwordValid ? "Password must be at least 6 characters." : ""}
        onBlur={validatePassword}
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
      <Button
        type="submit"
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
        Register
      </Button>
      <Link to="/login">
        <p className="text">Already have an account? Login</p>
      </Link>
    </Box>
  );
};
export default Register;
