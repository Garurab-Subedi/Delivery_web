import React, { useContext, useEffect, useState } from "react";
import axiosInstance from "../../api/axios";
import { AuthContext } from "../../context/AuthContext";
import "./user.css";

const Users = () => {
  const { token } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const getUsers = async () => {
    try {
      const res = await axiosInstance.get("/getAllUsers.php", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) setUsers(res.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    const fd = new FormData();
    fd.append("token", token);
    fd.append("user_id", id);

    try {
      const res = await axiosInstance.post("/deleteUser.php", fd);
      if (!res.data.success) return alert(res.data.message);

      alert("User deleted 🗑️");
      getUsers();
    } catch {
      alert("Delete failed");
    }
  };

  return (
    <div className="admin-card">
      <h2>Users</h2>

      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Joined</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.full_name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>{u.created_at}</td>
                <td>
                  <button className="danger" onClick={() => handleDelete(u.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Users;
