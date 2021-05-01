import { useState } from "react";
import "./UserForm.css";

const UserForm = () => {
  const [values, setValues] = useState({
    id: 0,
    avatar: "",
    name: "",
    age: "",
    gender: "male",
  });
  const handleInputChange = e => {
    const [name, value] = e.target;
    setValues([
      {
        ...values,
        [name]: value,
      },
    ]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        name="name"
        id="name"
        value={values.name}
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="age"
        id="age"
        value={values.age}
        onChange={handleInputChange}
      />
    </form>
  );
};

export default UserForm;
