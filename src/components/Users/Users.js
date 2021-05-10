import { useState, useEffect } from "react";
import uuid from "react-uuid";
import { Link } from "react-router-dom";
import { FiGrid, FiList } from "react-icons/fi";
import "./Users.scss";

import UserCard from "../UserCard/UserCard";
import Popup from "../Popup/Popup";
import UserForm from "../UserForm/UserForm";
import * as userServices from "../../services/userServices";

const Users = props => {
  const { searchUser } = props;

  const [openPopup, setOpenPopup] = useState(false);
  const [users, setUsers] = useState([]);
  const [filterUsers, setFilterUsers] = useState(users);
  const [userForEdit, setUserForEdit] = useState(null);
  const [sortType, setSortType] = useState("newest");
  const [isListView, setIsListView] = useState(false);

  /* Submit in userForm handling */
  const handleAddOrEdit = user => {
    if ("id" in user) {
      userServices.editUser(user, setUsers);
      setFilterUsers(users);
      setUserForEdit(null);
    } else {
      userServices.addUser(user, setUsers);
    }
    setOpenPopup(false);
  };

  /* User card button click handling */
  const handleEdit = id => {
    let userIndex = users.findIndex(user => user.id === id);
    setUserForEdit(users[userIndex]);
    setOpenPopup(true);
  };

  const handleDuplicate = user => {
    user.name = `${user.name} Copy`;
    userServices.addUser(user, setUsers);
  };

  const handleDelete = id => {
    userServices.deleteUser(id, setUsers);
  };

  /* Initial data */
  useEffect(() => {
    userServices.getUsers(setUsers);
  }, []);

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
        <Link to="./create-user">
          <button>Add User</button>
        </Link>
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
            setUserForEdit={setUserForEdit}
            handleAddOrEdit={handleAddOrEdit}
            setOpenPopup={setOpenPopup}
          />
        </Popup>
      )}
    </main>
  );
};

export default Users;
