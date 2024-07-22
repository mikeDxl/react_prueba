import React from 'react';

const UserItem = ({ user, onEdit, onDelete }) => {
  return (
    <li>
      <span>{user.name} - {user.email}</span>
      <button onClick={() => onEdit(user)}>Editar</button>
      <button onClick={() => onDelete(user.id)}>Eliminar</button>
    </li>
  );
};

export default UserItem;