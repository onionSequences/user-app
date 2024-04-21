'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editUserData as setEditUserData } from 'lib/redux/userSlice';
import Image from 'next/image';

import femaleAvatar1 from 'public/female-avatar-one.png';
import femaleAvatar2 from 'public/female-avatar-two.png';
import maleAvatar1 from 'public/male-avatar-one.png';
import maleAvatar2 from 'public/male-avatar-two.png';

import './userForm.scss';

// TODO: Refactor this later
export function UserForm({ handleSubmit }) {
  const router = useRouter();

  const editUserData = useSelector((state) => state.users.editUserData);
  const dispatch = useDispatch();

  const [values, setValues] = useState({
    avatar: '',
    name: '',
    age: '',
    gender: 'Male',
  });

  const [errors, setErrors] = useState({});
  const [showErrors, setShowErrors] = useState(false);

  const validate = useCallback(() => {
    let fields = values;
    let formIsValid = true;
    let errors = {};
    for (const property in fields) {
      if (!fields[property]) {
        formIsValid = false;
        errors[property] = `${property} is required`;
      }
    }
    setShowErrors(!formIsValid);
    setErrors({ ...errors });
    return formIsValid;
  }, [values]);

  const handleInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (showErrors) validate();
  }, [values, showErrors, validate]);

  useEffect(() => {
    if (editUserData !== null) {
      setValues({ ...editUserData });
    }
  }, [editUserData]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (validate()) handleSubmit(values);
      }}
    >
      {values.avatar && (
        <Image src={values.avatar} alt={values.name} width={100} height={100} />
      )}
      <div className="field-wrapper">
        <label htmlFor="avatar">Choose avatar:</label>
        {showErrors && <div style={{ color: 'red' }}>{errors.avatar}</div>}
        <select
          value={values.avatar}
          name="avatar"
          id="avatar"
          onChange={handleInputChange}
        >
          <option value="" defaultValue hidden>
            Not selected
          </option>
          <option value={maleAvatar1.src}>Men 1</option>
          <option value={maleAvatar2.src}>Men 2</option>
          <option value={femaleAvatar1.src}>Women 1</option>
          <option value={femaleAvatar2.src}>Women 2</option>
        </select>
      </div>
      <div className="field-wrapper">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          id="name"
          value={values.name}
          onChange={handleInputChange}
        />
        {showErrors && <div style={{ color: 'red' }}>{errors.name}</div>}
      </div>
      <div className="field-wrapper">
        <label htmlFor="age">Age:</label>
        <input
          type="number"
          name="age"
          id="age"
          value={values.age}
          onChange={handleInputChange}
        />
        {showErrors && <div style={{ color: 'red' }}>{errors.age}</div>}
      </div>
      <div className="field-wrapper">
        <label htmlFor="gender">Gender:</label>
        <input
          type="radio"
          name="gender"
          id="male"
          checked={values.gender === 'Male'}
          value="Male"
          onChange={handleInputChange}
        />
        <label htmlFor="male">Male</label>
        <input
          type="radio"
          name="gender"
          id="female"
          checked={values.gender === 'Female'}
          value="Female"
          onChange={handleInputChange}
        />
        <label htmlFor="female">Female</label>
      </div>
      <div className="field-wrapper">
        <button
          type="button"
          onClick={() => {
            dispatch(setEditUserData(null));
            router.push('/');
          }}
        >
          Cancel
        </button>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}
