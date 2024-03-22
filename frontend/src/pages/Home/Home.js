import { useContext, useEffect, useState } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import TextField from "@mui/material/TextField";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import httpRequest from "../../httpRequest";
import userContext from "../../context/user-context";
import AuthContext from "../../context/auth-context";
import "./Home.css";


const Home = () => {
  const userCtx = useContext(userContext);
  const [userName, setUserName] = useState();
  const [email, setEmail] = useState(null);
  const [open, setOpen] = useState(null);
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const [showProfileOpen, setShowProfileOpen] = useState(false);
  const authContext = useContext(AuthContext);

  const handleMenuOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleMenuClose = () => {
    setOpen(null);
  };

  const handlePasswordModalOpen = () => {
    setChangePasswordOpen(true);
    setOpen(null);
  };

  const handleProfileModalOpen = () => {
    setShowProfileOpen(true);
    setOpen(null);
  };

  const handleCloseProfileModal = () => {
    setShowProfileOpen(false);
  };

  const logoutUser = async () => {
    await httpRequest.post("//localhost:5000/logout");
    authContext.logout();
    window.location.href = "/login";
  };



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
    <div className="gray-box">
      <div className="box-wrapper">
      <IconButton sx={{ p: 0.1, color: "gray" }} onClick={handleMenuOpen}>
        <AccountCircleIcon
          fontSize="large"
        />
      </IconButton>
      <Menu anchorEl={open} open={Boolean(open)} onClose={handleMenuClose}>
        <MenuItem onClick={handleProfileModalOpen}>Profile</MenuItem>
        <MenuItem onClick={handlePasswordModalOpen}>Change password</MenuItem>
        <MenuItem onClick={logoutUser}>Log out</MenuItem>
      </Menu>
      </div>
      <div className="content-wrapper">
        <TextField
          id="filled-basic"
          className="TextField"
          label="write a message"
          variant="filled"
          sx={{
            width: "99%",
          }}
        />
      </div>
      <div className="vertical-line"></div>
    </div>
  );
};

export default Home;
