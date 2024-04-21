import { useRouter } from 'next/navigation';
import { ChangeEvent, FocusEvent, useEffect, useState } from 'react';
import { editUserData as setEditUserData } from 'lib/redux/usersSlice';
import Image from 'next/image';

import femaleAvatar1 from 'public/female-avatar-one.png';
import femaleAvatar2 from 'public/female-avatar-two.png';
import maleAvatar1 from 'public/male-avatar-one.png';
import maleAvatar2 from 'public/male-avatar-two.png';

import './userForm.scss';
import { useAppDispatch, useAppSelector } from 'lib/redux/hooks';
import { Gender, User, UserCreationData } from '@/types/user';

const INITIAL_CREATION_DATA = {
  avatar: '',
  name: '',
  age: '',
  gender: Gender.Male,
};

type Errors = (keyof UserCreationData)[];

type Props = {
  handleSubmit: (FormData: User) => void;
};

export function UserForm({ handleSubmit }: Props) {
  const router = useRouter();

  const editUserData = useAppSelector((state) => state.users.editUserData);
  const dispatch = useAppDispatch();

  const [userCreationData, setUserCreationData] = useState<UserCreationData>(
    INITIAL_CREATION_DATA
  );
  const [fieldsWithError, setFieldsWithError] = useState<Errors>([]);

  useEffect(() => {
    if (editUserData !== null) {
      setUserCreationData({ ...editUserData });
    }
  }, [editUserData]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    setUserCreationData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnBlur = (
    e: FocusEvent<HTMLSelectElement> | FocusEvent<HTMLInputElement>
  ) => {
    const currentField = e.target.name as keyof UserCreationData;

    if (e.target.value) {
      setFieldsWithError((prevFields) =>
        prevFields.filter((prevField) => prevField !== currentField)
      );
    } else {
      setFieldsWithError((prevFields) => [...prevFields, currentField]);
    }
  };

  const onSubmit = () => {
    const isDataValid = fieldsWithError.length === 0;

    if (isDataValid) handleSubmit(userCreationData);
  };

  const checkHasError = (field: keyof UserCreationData) =>
    fieldsWithError.some((fieldWithError) => fieldWithError === field);

  const errorMessage = 'This field is mandatory';

  return (
    <form action={onSubmit}>
      {userCreationData.avatar && (
        <Image
          src={userCreationData.avatar}
          alt={userCreationData.name}
          width={100}
          height={100}
        />
      )}
      <div className="field-wrapper">
        <label htmlFor="avatar">Choose avatar:</label>
        {checkHasError('avatar') && (
          <div style={{ color: 'red' }}>{errorMessage}</div>
        )}
        <select
          value={userCreationData.avatar}
          name="avatar"
          id="avatar"
          onChange={handleInputChange}
          onBlur={handleOnBlur}
        >
          <option value="" hidden>
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
          value={userCreationData.name}
          onChange={handleInputChange}
          onBlur={handleOnBlur}
        />
        {checkHasError('name') && (
          <div style={{ color: 'red' }}>{errorMessage}</div>
        )}
      </div>
      <div className="field-wrapper">
        <label htmlFor="age">Age:</label>
        <input
          type="number"
          name="age"
          id="age"
          value={userCreationData.age}
          onChange={handleInputChange}
          onBlur={handleOnBlur}
        />
        {checkHasError('age') && (
          <div style={{ color: 'red' }}>{errorMessage}</div>
        )}
      </div>
      <div className="field-wrapper">
        <label htmlFor="gender">Gender:</label>
        <input
          type="radio"
          name="gender"
          id="male"
          checked={userCreationData.gender === 'Male'}
          value="Male"
          onChange={handleInputChange}
          onBlur={handleOnBlur}
        />
        <label htmlFor="male">Male</label>
        <input
          type="radio"
          name="gender"
          id="female"
          checked={userCreationData.gender === 'Female'}
          value="Female"
          onChange={handleInputChange}
          onBlur={handleOnBlur}
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
