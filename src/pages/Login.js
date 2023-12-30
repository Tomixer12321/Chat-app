import "./Login.css";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const Login = () => {
  return (
    <Box className="login-container">
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
      />
      <br />
      <FormControlLabel
        control={<Checkbox defaultChecked sx={{color:"#ed288b"}} />}
        label="Remember me"
      />
      <br />
      <Link to="/register">
        <Button variant="contained" sx={{fontSize:"1rem",width:"22rem",background:"#ed288b"}}>
          Login
          </Button>
      </Link>
    </Box>
  );
};

export default Login;
