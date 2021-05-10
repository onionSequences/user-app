import { useState } from "react";
import { Redirect } from "react-router";
import Popup from "../components/Popup/Popup";
import UserForm from "../components/UserForm/UserForm";
import * as userServices from "../services/userServices";

const CreateUser = () => {
  const [openPopup, setOpenPopup] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const handleAddOrEdit = user => {
    // userServices.addUser(user, setUsers);
    setRedirect(true);
  };

  const handleCancelClick = () => {
    setRedirect(true);
  };

  return (
    <>
      <Popup title="User form" setOpenPopup={setOpenPopup}>
        <UserForm
          handleAddOrEdit={handleAddOrEdit}
          setOpenPopup={setOpenPopup}
          handleCancelClick={handleCancelClick}
        />
      </Popup>
      {redirect && <Redirect exact to="/" />}
    </>
  );
};

export default CreateUser;
