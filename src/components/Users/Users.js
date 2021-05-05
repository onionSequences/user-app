import { useState, useEffect, useRef } from "react";
import uuid from "react-uuid";
import { AiOutlineSortAscending } from "react-icons/ai";

import UserCard from "../UserCard/UserCard";
import Popup from "../Popup/Popup";
import UserForm from "../UserForm/UserForm";

import maleAvatar from "../../img/avatars/male-avatar-one.png";
import femaleAvatar from "../../img/avatars/female-avatar-one.png";

const initialUsers = [
  {
    id: 1,
    avatar: maleAvatar,
    name: "Jack",
    age: 25,
    gender: "Male",
  },
  {
    id: 2,
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
  const [userForEdit, setUserForEdit] = useState(null);
  const [sortIsActive, setSortIsActive] = useState(false);

  useEffect(() => {
    const search = searchUser => {
      const searchedUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchUser.toLowerCase())
      );
      setFilterUsers(searchedUsers);
    };

    search(searchUser);
  }, [searchUser, users]);

  const handleAddOrEdit = user => {
    if (user.hasOwnProperty("id")) {
      let editedUser = user;
      let indexOfUser = users.findIndex(user => editedUser.id === user.id);

      users[indexOfUser] = { ...editedUser };
      setFilterUsers(users);
      setUserForEdit(null);
    } else {
      let newUser = user;

      newUser.id = users.length;
      setUsers([newUser, ...users]);
    }
    setOpenPopup(false);
  };

  const handleEdit = id => {
    let userIndex = users.findIndex(user => user.id === id);
    setUserForEdit(users[userIndex]);
    setOpenPopup(true);
  };

  const handleDuplicate = user => {
    const userClone = { ...user };
    userClone.id = users.length + 1;
    setUsers([userClone, ...users]);
  };

  const handleDelete = id => {
    setUsers(users.filter(user => user.id !== id));
  };

  const handleSort = () => {
    setSortIsActive(prevState => !prevState);
  };

  useEffect(() => {
    // TODO Sorting not working
    if (sortIsActive) {
      const sortedUsers = [...users].sort(
        (a, b) => (a.name > b.name && 1) || -1
      );
      setUsers(sortedUsers);
    } else {
      const beforeSort = [...users];
      console.log(beforeSort);
      setUsers(prevState => prevState);
    }
  }, [sortIsActive]);

  return (
    <main>
      <button onClick={() => setOpenPopup(true)}>Create User</button>
      <section className="users-list">
        <button onClick={handleSort}>
          <AiOutlineSortAscending /> Sort
        </button>
        {filterUsers.length ? (
          filterUsers.map(user => (
            <UserCard
              key={uuid()}
              userData={user}
              handleEdit={handleEdit}
              handleDuplicate={handleDuplicate}
              handleDelete={handleDelete}
            />
          ))
        ) : (
          <p>No users to show</p>
        )}
      </section>
      {openPopup && (
        <Popup title="User form" setOpenPopup={setOpenPopup}>
          <UserForm
            userForEdit={userForEdit}
            handleAddOrEdit={handleAddOrEdit}
            setOpenPopup={setOpenPopup}
          />
        </Popup>
      )}
    </main>
  );
};

export default Users;
