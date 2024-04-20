'use client'

import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { FiGrid, FiList } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";


import { onValue, ref } from "firebase/database";
import { UserCard } from "../../components/UserCard";
import { setUsers } from "../../redux/userSlice";

import { db } from './../../lib/firebase';
import "./dashboard.scss";

export default function DashboardPage() {
  const router = useRouter();

  const dispatch = useDispatch();
  const users = useSelector(state => state.users.users);
  const searchQuery = useSelector(state => state.users.searchQuery);
  const searchUsers = useSelector(state => state.users.searchUsers);

  const [isLoading, setIsLoading] = useState(false);
  const [sortType, setSortType] = useState("newest");
  const [isListView, setIsListView] = useState(false);


  /* Initial data */
  useEffect(() => {
    setIsLoading(true);
    const usersRef = ref(db, 'users/')
    onValue(usersRef, (snapshot) => {
      const users = snapshot.val()
      const listUsers = [];
      for (let id in users) {
        listUsers.push({ id, ...users[id] });
      }
      // Get newest first
      listUsers.sort((a, b) => (a.id < b.id && 1) || -1);
      dispatch(setUsers(listUsers));
      setIsLoading(false);
    });
  }, [dispatch]);

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

      if (JSON.stringify(sorted) !== JSON.stringify(users)) {
        dispatch(setUsers(sorted));
      }
    };
    sortedUsers(sortType);
  }, [sortType, dispatch, users]);

  const activeUsers = searchQuery ? searchUsers : users;
  return (
    <>
      <div className="control-bar wrapper">
        <button onClick={() => router.push("/create")}>Add User</button>
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
        {activeUsers &&
          activeUsers.map(user => <UserCard key={user.id} userData={user} />)}
      </section>
    </>
  );
}
