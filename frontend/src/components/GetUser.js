import { useState, useEffect } from 'react';
import httpRequest from '../httpRequest';
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
        const filteredUsers = resp.data.filter(user => user.id !== userId);
        setUsers(filteredUsers);
      } catch (error) {
        console.error("Chyba pri načítaní používateľov:", error);
      }
    })();
  }, [userId]);

  return (
    <div>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default GetUser;
