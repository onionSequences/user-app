'use client';

import { ref, remove } from 'firebase/database';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FiCopy, FiEdit, FiTrash2 } from 'react-icons/fi';
import { editUserData } from 'lib/redux/usersSlice';

import { db } from 'lib/firebase';
import './userCard.scss';
import Image from 'next/image';
import { useAppDispatch } from 'lib/redux/hooks';
import { User } from '@/types/user';
import { addNewUser } from 'lib/data';

export function UserCard({ userData }: { userData: User }) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [numOfClones, setNumOfClones] = useState(1);

  const handleDelete = () => {
    const userRef = ref(db, 'users/' + userData.id);

    remove(userRef);
  };

  const handleDuplicate = async () => {
    const { id, ...userDataWithoutId } = userData;

    const duplicateUser = {
      ...userDataWithoutId,
      // TODO: This is bad
      name: `${userDataWithoutId.name} (${numOfClones})`,
    };

    await addNewUser(duplicateUser);
  };

  const handleEdit = () => {
    dispatch(editUserData(userData));
    router.push(`/edit/${userData.id}`);
  };

  return (
    <div className="card">
      <div className="avatar">
        <Image
          src={userData.avatar}
          alt={userData.name}
          width={100}
          height={100}
        />
      </div>
      <div className="card-info">
        <h4>
          {userData.name}
          <span> ({userData.age})</span>
        </h4>
        <p>{userData.gender}</p>
        <p>
          Created:
          <br />
          {new Date(userData.createdAt!).toLocaleString(navigator.language, {
            timeStyle: 'short',
            dateStyle: 'medium',
          })}
        </p>
      </div>
      <div className="card-buttons">
        <button type="button" onClick={handleEdit}>
          <FiEdit />
        </button>
        <button
          type="button"
          onClick={() => {
            setNumOfClones((prev) => prev + 1);
            handleDuplicate();
          }}
        >
          <FiCopy />
        </button>
        <button type="button" onClick={handleDelete}>
          <FiTrash2 />
        </button>
      </div>
    </div>
  );
}