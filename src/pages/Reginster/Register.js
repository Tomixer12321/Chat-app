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

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <Box className="register-container">
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
        id="Name"
        label="Name"
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
        id="Email"
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
      <Link to="/login">
      <Button
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
      </Link>
    </Box>
  );
};
export default Register