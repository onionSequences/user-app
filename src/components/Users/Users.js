import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import firebase from "../../util/firebase";
import { FiGrid, FiList } from "react-icons/fi";
import "./Users.scss";

import UserCard from "../UserCard/UserCard";

const Users = props => {
  const { searchUser, onEdit } = props;

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterUsers, setFilterUsers] = useState(users);
  const [sortType, setSortType] = useState("newest");
  const [isListView, setIsListView] = useState(false);

  const history = useHistory();

  /* Initial data */
  useEffect(() => {
    setIsLoading(true);
    const usersRef = firebase.database().ref("Users");
    usersRef.on("value", snapshot => {
      const users = snapshot.val();
      const listUsers = [];
      for (let id in users) {
        listUsers.push({ id, ...users[id] });
      }
      // Get newest first
      listUsers.sort((a, b) => (a.id < b.id && 1) || -1);
      setUsers(listUsers);
      setIsLoading(false);
    });

    return () => {
      usersRef.off();
    };
  }, []);

  // Sorting
  useEffect(() => {
    const sortedUsers = sortType => {
      let sorted;
      if (sortType === "newest")
        sorted = [...users].sort((a, b) => (a.id < b.id && 1) || -1);

      if (sortType === "oldest")
        sorted = [...users].sort((a, b) => (a.id > b.id && 1) || -1);

      if (sortType === "nameAsc")
        sorted = [...users].sort((a, b) => a.name.localeCompare(b.name));

      setUsers(sorted);
    };
    sortedUsers(sortType);
  }, [sortType]);

  // Searching
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
        <button onClick={() => history.push("/create-user")}>Add User</button>
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
      {isLoading && <p>Loading...</p>}
      <section className={`users-list wrapper ${isListView ? "list" : ""}`}>
        {users.length &&
          filterUsers.map(user => (
            <UserCard key={user.id} userData={user} onEdit={onEdit} />
          ))}
      </section>
    </main>
  );
};

export default Users;
