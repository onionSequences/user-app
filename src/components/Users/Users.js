import { useState } from "react";
import uuid from "react-uuid";

import UserCard from "../UserCard/UserCard";
import Popup from "../Popup/Popup";
import UserForm from "../UserForm/UserForm";

import maleAvatar from "../../img/avatars/male-avatar-one.png";
import femaleAvatar from "../../img/avatars/female-avatar-one.png";

const initialUsers = [
  {
    id: 0,
    avatar: maleAvatar,
    name: "Jack",
    age: 25,
    gender: "Male",
  },
  {
    id: 1,
    avatar: femaleAvatar,
    name: "Anna",
    age: 32,
    gender: "Female",
  },
];

const Users = () => {
  const [openPopup, setOpenPopup] = useState(false);
  const [users, setUsers] = useState(initialUsers);

  const handleClick = () => {
    setOpenPopup(true);
  };

  const handleSubmit = newUser => {
    setUsers([newUser, ...users]);
  };

  return (
    <main>
      <button onClick={handleClick}>Create User</button>
      <section className="users-list">
        {users &&
          users.map((user, index) => <UserCard key={uuid()} userData={user} />)}
      </section>
      {openPopup && (
        <Popup title="User form" setOpenPopup={setOpenPopup}>
          <UserForm handleSubmit={handleSubmit} setOpenPopup={setOpenPopup} />
        </Popup>
      )}
    </main>
  );
};

export default Users;
