import { useState, useEffect } from "react";
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

const Users = props => {
  const { searchUser } = props;
  const [openPopup, setOpenPopup] = useState(false);
  const [users, setUsers] = useState(initialUsers);
  const [filterUsers, setFilterUsers] = useState(users);

  useEffect(() => {
    const search = searchUser => {
      const searchedUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchUser.toLowerCase())
      );
      setFilterUsers(searchedUsers);
    };

    search(searchUser);
  }, [searchUser, users]);

  const handleAddOrEdit = (e, newUser) => {
    e.preventDefault();

    newUser.id = users.length;
    setUsers([newUser, ...users]);

    setOpenPopup(false);
  };

  const handleEdit = null;

  const handleDuplicate = null;

  const handleDelete = id => {
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <main>
      <button onClick={() => setOpenPopup(true)}>Create User</button>
      <section className="users-list">
        {filterUsers &&
          filterUsers.map((user, index) => (
            <UserCard
              key={uuid()}
              userData={user}
              handleEdit={handleEdit}
              handleDuplicate={handleDuplicate}
              handleDelete={handleDelete}
            />
          ))}
      </section>
      {openPopup && (
        <Popup title="User form" setOpenPopup={setOpenPopup}>
          <UserForm
            handleAddOrEdit={handleAddOrEdit}
            setOpenPopup={setOpenPopup}
          />
        </Popup>
      )}
    </main>
  );
};

export default Users;
