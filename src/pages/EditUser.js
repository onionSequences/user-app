import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import Popup from "../components/Popup/Popup";
import UserForm from "../components/UserForm/UserForm";
import firebase from "../util/firebase";

const EditUser = () => {
  let history = useHistory();
  const editUserData = useSelector(state => state.users.editUserData);

  const handleSubmit = values => {
    const userRef = firebase.database().ref("Users").child(editUserData.id);
    userRef.update({
      ...values,
    });
    history.push("/");
  };

  return (
    <>
      <Popup title="User form">
        <UserForm handleSubmit={handleSubmit} />
      </Popup>
    </>
  );
};

export default EditUser;
