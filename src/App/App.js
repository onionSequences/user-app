import { useState } from "react";
import { Switch, Route } from "react-router-dom";

import Header from "../components/Header/Header";
import Users from "../components/Users/Users";
import CreateUser from "../pages/CreateUser";

function App() {
  const [searchUser, setSearchUser] = useState("");

  const search = searchTerm => {
    setSearchUser(searchTerm);
  };

  const onCreateUser = user => {
    console.log(user);
  };

  return (
    <>
      <Header search={search} />

      <Switch>
        <Route exact path="/">
          <Users searchUser={searchUser} />
        </Route>
        <Route exact path="/create-user">
          <CreateUser onCreateUser={onCreateUser} />
        </Route>
      </Switch>
    </>
  );
}

export default App;
