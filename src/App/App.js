import { useState } from "react";
import { Switch, Route } from "react-router-dom";

import Header from "../components/Header/Header";
import Users from "../components/Users/Users";
import CreateUser from "../pages/CreateUser";
import EditUser from "../pages/EditUser";

function App() {
  const [searchUser, setSearchUser] = useState("");
  const [userForEdit, setUserForEdit] = useState(null);

  const search = searchTerm => {
    setSearchUser(searchTerm);
  };

  const onEdit = user => {
    setUserForEdit(user);
  };

  return (
    <>
      <Header search={search} />
      <Switch>
        <Route exact path="/">
          <Users searchUser={searchUser} onEdit={onEdit} />
        </Route>
        <Route exact path="/create-user">
          <CreateUser />
        </Route>
        <Route exact path="/user/edit/:id">
          <EditUser userForEdit={userForEdit} />
        </Route>
      </Switch>
    </>
  );
}

export default App;
