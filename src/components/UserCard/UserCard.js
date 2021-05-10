import { useState } from "react";
import "./UserCard.scss";

import { FiEdit, FiCopy, FiTrash2 } from "react-icons/fi";

const UserCard = props => {
  const { userData, handleEdit, handleDuplicate, handleDelete } = props;

  return (
    <div className="card">
      <div className="avatar">
        <img src={userData.avatar} alt={userData.name} />
      </div>
      <div className="card-info">
        <h4>
          {userData.name}
          <span> ({userData.age})</span>
        </h4>
        <p>{userData.gender}</p>
      </div>
      <div className="card-buttons">
        <button type="button" onClick={() => handleEdit(userData.id)}>
          <FiEdit />
        </button>
        <button type="button" onClick={() => handleDuplicate(userData)}>
          <FiCopy />
        </button>
        <button type="button" onClick={() => handleDelete(userData.id)}>
          <FiTrash2 />
        </button>
      </div>
    </div>
  );
};

export default UserCard;
