import { useState } from "react";
import {Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import httpRequest from "../httpRequest";

const ChangePasswordModal = ({ open, onClose }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleClose = () => {
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    onClose();
  };

  const validatePassword = () => {
    if (newPassword !== confirmPassword) {
      console.log("Passwords do not match", { variant: "warning" });
      return false;
    }

    if (newPassword.length < 6) {
      console.log("Password must be at least 6 characters long", {
        variant: "info",
      });
      return false;
    }
    return true;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!validatePassword(newPassword, confirmPassword)) {
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      return;
    }

    try {
      await httpRequest.post("http://localhost:5000/change-password", {
        oldPassword,
        newPassword,
      });
      console.log("Password changed successfully", { variant: "success" });
    } catch (error) {
      if (error.response.status === 401) {
        console.log("Invalid credentials");
      }
    }
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={handleFormSubmit}>
        <DialogTitle>
          <Typography
            component="h1"
            variant="h5"
            sx={{ fontFamily: "Oxanium, cursive", fontWeight: 600 }}
          >
            Change Password
          </Typography>
        </DialogTitle>
        <DialogContent>
          <TextField
            sx={{
              margin: "normal",
              required: true,
              fullWidth: true,
              autoComplete: "off",
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#854de0",
                },
              },
              "& .MuiInputLabel-outlined.Mui-focused": {
                color: "#854de0",
              },
            }}
            onChange={(e) => setOldPassword(e.target.value)}
            value={oldPassword}
            type="password"
            label="Old Password"
            margin="dense"
          />
          <TextField
            sx={{
              margin: "normal",
              required: true,
              fullWidth: true,
              autoComplete: "off",
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#854de0",
                },
              },
              "& .MuiInputLabel-outlined.Mui-focused": {
                color: "#854de0",
              },
            }}
            onChange={(e) => setNewPassword(e.target.value)}
            value={newPassword}
            type="password"
            label="New Password"
            margin="dense"
          />
          <TextField
            sx={{
              margin: "normal",
              required: true,
              fullWidth: true,
              autoComplete: "off",
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#854de0",
                },
              },
              "& .MuiInputLabel-outlined.Mui-focused": {
                color: "#854de0",
              },
            }}
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            type="password"
            label="Confirm Password"
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={handleClose}
            sx={{
              fontFamily: "Oxanium, cursive",
              color: "#854de0",
              borderColor: "#854de0",
              "&:hover": {
                backgroundColor: "#854de0",
                color: "#fff",
                borderColor: "#854de0",
              },
            }}
          >
            Cancel
          </Button>

          <Button
            variant="outlined"
            type="submit"
            sx={{
              fontFamily: "Oxanium, cursive",
              color: "#854de0",
              borderColor: "#854de0",
              "&:hover": {
                backgroundColor: "#854de0",
                color: "#fff",
                borderColor: "#854de0",
              },
            }}
          >
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ChangePasswordModal;
