import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import './App.css';


const App = () => {
  const [users, setUsers] = useState([]);
  const [userToEdit, setUserToEdit] = useState(null);

  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem('users'));
    if (savedUsers) {
      setUsers(savedUsers);
    } else {
      axios.get('https://jsonplaceholder.typicode.com/users')
        .then(response => {
          setUsers(response.data);
          localStorage.setItem('users', JSON.stringify(response.data));
        })
        .catch(error => console.error('Error al obtener los usuarios:', error));
    }
  }, []);

  const saveUsersToLocalStorage = (updatedUsers) => {
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const handleSaveUser = (user) => {
    if (userToEdit) {
      const updatedUsers = users.map(u => u.id === user.id ? user : u);
      saveUsersToLocalStorage(updatedUsers);
      setUserToEdit(null);
    } else {
      const updatedUsers = [...users, user];
      saveUsersToLocalStorage(updatedUsers);
    }
  };

  const handleEditUser = (user) => {
    setUserToEdit(user);
  };

  const handleDeleteUser = (id) => {
    const updatedUsers = users.filter(user => user.id !== id);
    saveUsersToLocalStorage(updatedUsers);
  };

  return (
    <div>
      <h1>Gestión de Usuarios</h1>
      <UserForm onSave={handleSaveUser} userToEdit={userToEdit} />
      <UserList users={users} onEdit={handleEditUser} onDelete={handleDeleteUser} />
    </div>
  );
};

export default App;