import { useHistory } from "react-router";
import firebase from "../util/firebase";

import Popup from "../components/Popup/Popup";
import UserForm from "../components/UserForm/UserForm";

const CreateUser = () => {
  let history = useHistory();

  const handleSubmit = userData => {
    const userRef = firebase.database().ref("Users");

    const user = {
      createdAt: firebase.database.ServerValue.TIMESTAMP,
      ...userData,
    };

    userRef.push(user);

    history.push("/");
  };

  return (
    <Popup title="User form">
      <UserForm handleSubmit={handleSubmit} />
    </Popup>
  );
};

export default CreateUser;
