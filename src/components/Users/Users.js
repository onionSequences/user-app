import { useState, useEffect } from "react";
import uuid from "react-uuid";
import { FiGrid, FiList } from "react-icons/fi";
import "./Users.scss";

import UserCard from "../UserCard/UserCard";
import Popup from "../Popup/Popup";
import UserForm from "../UserForm/UserForm";

import maleAvatar from "../../assets/img/avatars/male-avatar-one.png";
import femaleAvatar from "../../assets/img/avatars/female-avatar-one.png";

const triggerDirebase = () => {
  fetch("https://user-app-3b106-default-rtdb.firebaseio.com/data.json")
    .then(data => data.json())
    .then(results => {
      for (const res in results) {
        console.log(results[res]);
      }
    });
};
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
  const [sortType, setSortType] = useState("newest");
  const [isListView, setIsListView] = useState(false);

  const handleAddOrEdit = user => {
    if ("id" in user) {
      let editedUser = user;
      let indexOfUser = users.findIndex(user => editedUser.id === user.id);

      users[indexOfUser] = { ...editedUser };
      setFilterUsers(users);
      setUserForEdit(null);
    } else {
      let newUser = user;
      // console.log(newUser);
      fetch("https://user-app-3b106-default-rtdb.firebaseio.com/data.json", {
        method: "POST",
        body: JSON.stringify(newUser),
      });
      // newUser.id = users.length;
      // setUsers([newUser, ...users]);
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

  useEffect(() => {
    const sortedUsers = sortType => {
      let sorted;
      if (sortType === "newest")
        sorted = [...users].sort((a, b) => (a.id < b.id && 1) || -1);

      if (sortType === "oldest")
        sorted = [...users].sort((a, b) => (a.id > b.id && 1) || -1);

      if (sortType === "nameAsc")
        sorted = [...users].sort((a, b) => (a.name > b.name && 1) || -1);

      setUsers(sorted);
    };
    sortedUsers(sortType);
  }, [sortType]);

  useEffect(() => {
    const search = searchUser => {
      const searchedUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchUser.toLowerCase())
      );
      setFilterUsers(searchedUsers);
    };

    search(searchUser);
  }, [searchUser, users]);

  return (
    <main>
      <div className="control-bar wrapper">
        <button onClick={() => setOpenPopup(true)}>Add User</button>
        <div>
          <button onClick={() => setIsListView(prevState => !prevState)}>
            {isListView ? <FiGrid /> : <FiList />}
          </button>
          <select
            name="sort"
            onChange={e => setSortType(e.target.value)}
            value={sortType}
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="nameAsc">Name (A-Z)</option>
          </select>
        </div>
      </div>
      <section className={`users-list wrapper ${isListView ? "list" : ""}`}>
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
