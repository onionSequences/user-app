import { useState, useEffect } from "react";
import "./UserForm.css";

import maleAvatar1 from "../../img/avatars/male-avatar-one.png";
import maleAvatar2 from "../../img/avatars/male-avatar-two.png";
import femaleAvatar1 from "../../img/avatars/female-avatar-one.png";
import femaleAvatar2 from "../../img/avatars/female-avatar-two.png";

const UserForm = props => {
  const { handleAddOrEdit, setOpenPopup } = props;
  const [values, setValues] = useState({
    avatar: "",
    userName: "",
    age: "",
    gender: "Male",
  });
  const [isValid, setIsValid] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(
    e => {
      const validate = e => {
        let errors = {};
        if (!values[e.target.id]) {
          const errorMsg = `${e.target.id} is required`;
          setErrors({ ...errors, [e.target.id]: errorMsg });
          setIsValid(false);
          return;
        }
        setIsValid(true);
      };
      validate(e);
    },
    [values]
  );

  const handleInputChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <form
      onSubmit={e =>
        isValid ? handleAddOrEdit(e, values) : e.preventDefault()
      }
    >
      {values.avatar && (
        <div>
          <img src={values.avatar} alt={values.name} />
        </div>
      )}
      <label htmlFor="avatar">Choose avatar:</label>
      {!isValid && <div style={{ color: "red" }}>{errors.avatar}</div>}
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
      <button type="submit">Submit</button>
      <button type="button" onClick={() => setOpenPopup(false)}>
        Cancel
      </button>
    </form>
  );
};

export default UserForm;
