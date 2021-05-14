import { useState } from "react";
import { useHistory } from "react-router";
import firebase from "../../util/firebase";
import "./UserCard.scss";

import { FiEdit, FiCopy, FiTrash2 } from "react-icons/fi";

const UserCard = props => {
  const { userData, onEdit } = props;
  let [numOfClones, setNumOfClones] = useState(1);
  let history = useHistory();

  const handleDelete = () => {
    const userRef = firebase.database().ref("Users").child(userData.id);
    userRef.remove();
  };

  const handleDuplicate = () => {
    const duplicateUser = {
      ...userData,
      createdAt: firebase.database.ServerValue.TIMESTAMP,
    };
    delete duplicateUser.id;
    duplicateUser.name = `${duplicateUser.name} (${numOfClones})`;

    const userRef = firebase.database().ref("Users");
    userRef.push(duplicateUser);
  };

  const handleEdit = () => {
    onEdit(userData);
    history.push(`/user/edit/${userData.id}`);
  };

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
        <p>
          Created:
          <br />
          {new Date(userData.createdAt).toLocaleString(navigator.language, {
            timeStyle: "short",
            dateStyle: "medium",
          })}
        </p>
      </div>
      <div className="card-buttons">
        <button type="button" onClick={handleEdit}>
          <FiEdit />
        </button>
        <button
          type="button"
          onClick={() => {
            setNumOfClones(prev => prev + 1);
            handleDuplicate();
          }}
        >
          <FiCopy />
        </button>
        <button type="button" onClick={handleDelete}>
          <FiTrash2 />
        </button>
      </div>
    </div>
  );
};

export default UserCard;
