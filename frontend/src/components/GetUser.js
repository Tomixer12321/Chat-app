import { useState, useEffect } from 'react';
import httpRequest from '../httpRequest';

export const GetUser = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await httpRequest.get("http://localhost:5000/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Chyba pri načítaní používateľov:", error);
      }
    })();
  }, []);


  return (
    <div>
      <h2>Zoznam používateľov</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
