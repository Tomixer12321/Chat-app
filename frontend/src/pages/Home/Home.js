import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { IconButton, Menu, MenuItem } from "@mui/material";
import TextField from "@mui/material/TextField";
import Avatar from '@mui/material/Avatar';
import httpRequest from "../../httpRequest";
import userContext from "../../context/user-context";
import AuthContext from "../../context/auth-context";
import ChangePasswordModal from "../../components/ChangePasswordModal";
import "./Home.css";

const Home = (props) => {
  const userCtx = useContext(userContext);
  const [userName, setUserName] = useState();
  const [email, setEmail] = useState(null);
  const [open, setOpen] = useState(null);
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const [showProfileOpen, setShowProfileOpen] = useState(false);
  const authContext = useContext(AuthContext);

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

  const handleClosePasswordModal = () => {
    setChangePasswordOpen(false);
  };

  const handleProfileModalOpen = () => {
    setShowProfileOpen(true);
    setOpen(null);
  };


  const logoutUser = async () => {
    await httpRequest.post("//localhost:5000/logout");
    authContext.logout();
    window.location.href = "/login";
  };

  return (
    <div className="gray-box">
      <div
        className="box-wrapper"
        style={{ display: "flex", alignItems: "center" }}
      >
        <div>
          <IconButton sx={{ p: 0.1, color: "gray" }} onClick={handleMenuOpen}>
            <Avatar alt={userName}  src="/static/images/avatar/2.jpg" />
          </IconButton>
        </div>
        <Menu
          anchorEl={open}
          open={Boolean(open)}
          onClose={handleMenuClose}
          sx={{ marginLeft: "-120px", marginTop: "1.5px" }}             
        >
          <MenuItem onClick={handleProfileModalOpen}>Profile</MenuItem>
          <MenuItem onClick={handlePasswordModalOpen}>Change password</MenuItem>
          <MenuItem onClick={logoutUser}>Log out</MenuItem>
        </Menu>
        <ChangePasswordModal open={changePasswordOpen} onClose={handleClosePasswordModal} />
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
