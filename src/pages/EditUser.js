import { useHistory } from "react-router-dom";
import firebase from "../util/firebase";

import Popup from "../components/Popup/Popup";
import UserForm from "../components/UserForm/UserForm";

const EditUser = props => {
  const { userForEdit } = props;
  let history = useHistory();

  const handleSubmit = values => {
    const userRef = firebase.database().ref("Users").child(userForEdit.id);
    userRef.update({
      ...values,
    });
    history.push("/");
  };

  return (
    <>
      <Popup title="User form">
        <UserForm userForEdit={userForEdit} handleSubmit={handleSubmit} />
      </Popup>
    </>
  );
};

export default EditUser;
