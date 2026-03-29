import { useEffect, useState } from "react";
import axios from "axios";

function Users() {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");

  <h2 style={{ marginBottom: "20px" }}>Tasks</h2>;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUsers(res.data);
      } catch (err) {
        console.error("Access denied or error", err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Users (Admin)</h2>

      {users.map((user) => (
        <div key={user.id}>
          <p>
            {user.email} - {user.role}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Users;
