import { useContext, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import httpRequest from "../../httpRequest";
import userContext from "../../context/user-context";
import "./Home.css";

const Home = () => {
  const userCtx = useContext(userContext);
  const [userName, setUserName] = useState();
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
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
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
          </IconButton>
        </Tooltip>
      </Box>
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
