import { Switch, Route } from "react-router-dom";

import Header from "../components/Header/Header";
import Users from "../components/Users/Users";
import CreateUser from "../pages/CreateUser";
import EditUser from "../pages/EditUser";

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/">
          <Users />
        </Route>
        <Route exact path="/create-user">
          <CreateUser />
        </Route>
        <Route exact path="/user/edit/:id">
          <EditUser />
        </Route>
      </Switch>
    </>
  );
}

export default App;
