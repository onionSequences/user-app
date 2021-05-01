import { useState } from "react";
import "./UserForm.css";

import maleAvatar1 from "../../img/avatars/male-avatar-one.png";
import maleAvatar2 from "../../img/avatars/male-avatar-two.png";
import femaleAvatar1 from "../../img/avatars/female-avatar-one.png";
import femaleAvatar2 from "../../img/avatars/female-avatar-two.png";

const UserForm = props => {
  const { handleSubmit, setOpenPopup } = props;
  const [values, setValues] = useState({
    id: 0,
    avatar: "",
    userName: "",
    age: "",
    gender: "Male",
  });

  const handleInputChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={() => handleSubmit(values)}>
      {values.avatar && (
        <div>
          <img src={values.avatar} alt={values.name} />
        </div>
      )}
      <label htmlFor="avatar">Choose avatar:</label>
      <select
        value={values.avatar}
        name="avatar"
        id="avatar"
        onChange={handleInputChange}
      >
        <option value="" defaultValue hidden>
          Not selected
        </option>
        <option value={maleAvatar1}>Men 1</option>
        <option value={maleAvatar2}>Men 2</option>
        <option value={femaleAvatar1}>Women 1</option>
        <option value={femaleAvatar2}>Women 2</option>
      </select>
      <label htmlFor="userName">Name:</label>
      <input
        type="text"
        name="userName"
        id="name"
        value={values.name}
        onChange={handleInputChange}
      />
      <label htmlFor="age">Age:</label>
      <input
        type="number"
        name="age"
        id="age"
        value={values.age}
        onChange={handleInputChange}
      />
      <label htmlFor="gender">Gender:</label>
      <input
        type="radio"
        name="gender"
        id="male"
        checked={values.gender === "Male"}
        value="Male"
        onChange={handleInputChange}
      />
      <label htmlFor="male">Male</label>
      <input
        type="radio"
        name="gender"
        id="female"
        checked={values.gender === "Female"}
        value="Female"
        onChange={handleInputChange}
      />
      <label htmlFor="female">Female</label>
      <button
        type="submit"
        onClick={e => {
          e.preventDefault();
          setOpenPopup(false);
        }}
      >
        Submit
      </button>
      <button type="button" onClick={() => setOpenPopup(false)}>
        Cancel
      </button>
    </form>
  );
};

export default UserForm;
