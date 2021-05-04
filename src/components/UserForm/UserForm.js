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
    name: "",
    age: "",
    gender: "Male",
  });
  const [errors, setErrors] = useState({});
  const [formValidation, setFormValidation] = useState(false);

  const validate = () => {
    let fields = values;
    let formIsValid = true;
    let errors = {};
    for (const property in fields) {
      if (!fields[property]) {
        formIsValid = false;
        errors[property] = `${property} is required`;
      }
    }
    setErrors({ ...errors });
    return setFormValidation(formIsValid);
  };

  const handleInputChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
    validate();
  };

  useEffect(() => {
    validate();
  }, [values]);

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        validate();
        if (formValidation) handleAddOrEdit(e, values);
      }}
    >
      {values.avatar && (
        <div>
          <img src={values.avatar} alt={values.name} />
        </div>
      )}
      <label htmlFor="avatar">Choose avatar:</label>
      {!formValidation && <div style={{ color: "red" }}>{errors.avatar}</div>}
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
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        name="name"
        id="name"
        value={values.name}
        onChange={handleInputChange}
      />
      {!formValidation && <div style={{ color: "red" }}>{errors.name}</div>}
      <label htmlFor="age">Age:</label>
      <input
        type="number"
        name="age"
        id="age"
        value={values.age}
        onChange={handleInputChange}
      />
      {!formValidation && <div style={{ color: "red" }}>{errors.age}</div>}
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
