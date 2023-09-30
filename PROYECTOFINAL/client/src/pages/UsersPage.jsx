import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Link } from 'react-router-dom';
const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [newRole, setNewRole] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get('/users', {
          signal: controller.signal,
        });
        console.log(response.data.allUsers);
        isMounted && setUsers(response.data.allUsers);
      } catch (error) {
        console.log(error);
      }
    };

    getUsers();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const handleRoleChange = async (userId, _id) => {
    console.log("handleRol",newRole);
    try {
      const response = await axiosPrivate.put(`/users/${userId}/update`, {
        _id
      });
      console.log(response.data); // Log the response from the server
      // Actualiza el estado de los usuarios con la respuesta actualizada
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, role: newRole } : user
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleUserDelete = async (userId) => {
    try {
      const response = await axiosPrivate.delete(`/users/${userId}`);
      console.log(response.data); // Log the response from the server
      // Filtra los usuarios para eliminar el usuario con el userId especificado
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <article>
      <Link to='/'>Home</Link>
      <h2>Users List</h2>
      {users?.length ? (
        <ul>
          {users.map((user, i) => (
            <li key={i}>
              {user?.email} /{" "}
              {user?.roles.map((role) => (
                <div key={role._id}>{role.name}</div>
              ))}
              {user?.name} <br />
              {user?.lastname} <br />
              <select
                onChange={(e) => {
                  const selectedRole = e.target.value;
                  console.log(selectedRole);
                  setNewRole(selectedRole)
                }}
              >
                <option name="admin" value="64b28859589d2d2802516eb1">Admin</option>
                <option name="value" value="64b28859589d2d2802516eaf">User</option>
              </select>
              <button onClick={() => handleRoleChange(user._id, newRole)}>
                Update
              </button>
              <br/>
              <button onClick={() => handleUserDelete(user._id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No users to display</p>
      )}
    </article>
  );
};

export default UsersPage;
