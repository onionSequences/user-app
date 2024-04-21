'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import './header.scss';

import logo from 'public/logo.png';
import { searchQuery, searchUsers } from 'lib/redux/usersSlice';
import Image from 'next/image';
import { useAppDispatch } from 'lib/redux/hooks';

export function Header() {
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    setSearchTerm(inputValue);
    dispatch(searchQuery(inputValue));
  };

  useEffect(() => {
    if (searchTerm) {
      const search = (searchTerm: string) => {
        dispatch(searchUsers(searchTerm));
      };
      search(searchTerm);
    }
  }, [searchTerm, dispatch]);

  return (
    <header>
      <div className="wrapper">
        <div className="logo-box">
          <Image src={logo.src} alt="logo" width={32} height={32} />
          <h1>User App</h1>
        </div>
        <input
          placeholder="Search for user..."
          onChange={handleInputChange}
          value={searchTerm}
        />
      </div>
    </header>
  );
}
