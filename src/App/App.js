import { useState } from "react";

import Header from "../components/Header/Header";
import Users from "../components/Users/Users";

function App() {
  const [searchUser, setSearchUser] = useState("");

  const search = searchTerm => {
    setSearchUser(searchTerm);
  };

  return (
    <>
      <Header search={search} />
      <Users searchUser={searchUser} />
    </>
  );
}

export default App;
