import React, { useEffect, useState } from "react";
import axios from "axios";

function UsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/users")  // ⚠️ Adjust backend route
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Delete this user?")) {
      try {
        await axios.delete(`http://localhost:5000/api/users/${id}`);
        setUsers(users.filter((user) => user._id !== id));
      } catch (err) {
        console.error("Error deleting user:", err);
      }
    }
  };

  return (
    <div>
      <h4 className="mb-3">👥 All Registered Users</h4>
      <ul className="list-group">
        {users.map((user) => (
          <li key={user._id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{user.username}</strong> <br />
              <small>{user.email}</small>
            </div>
            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(user._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UsersList;
