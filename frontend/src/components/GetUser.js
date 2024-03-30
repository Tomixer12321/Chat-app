import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import httpRequest from "../httpRequest";
import "./GetUser.css";

const GetUser = () => {
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const resp = await httpRequest.get("http://localhost:5000/@me");
        setUserId(resp.data.id);
      } catch (error) {
        console.log("Not authenticated");
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const resp = await httpRequest.get("http://localhost:5000/users");
        const filteredUsers = resp.data.filter((user) => user.id !== userId);
        setUsers(filteredUsers);
      } catch (error) {
        console.error("Chyba pri načítaní používateľov:", error);
      }
    })();
  }, [userId]);

  return (
    <div className="user-list">
      <ul>
        {users.map((user) => (
          <ListItemButton key={user.id} className="user-item">
            <ListItemAvatar>
              <Avatar
                alt={user.name}
                src="/static/images/avatar/2.jpg"
              />
            </ListItemAvatar>
            <span className="username">{user.name}</span>
          </ListItemButton>
        ))}
      </ul>
    </div>
  );
};

export default GetUser;
