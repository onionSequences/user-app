'use client'

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./header.scss";

import logo from "../../../public/logo.png";
import { searchQuery, searchUsers } from "../../redux/userSlice";

export function Header() {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = e => {
    setSearchTerm(e.target.value);
    dispatch(searchQuery(e.target.value));
  };

  useEffect(() => {
    if (searchTerm) {
      const search = searchTerm => {
        dispatch(searchUsers(searchTerm));
      };
      search(searchTerm);
    }
  }, [searchTerm, dispatch]);

  return (
    <header>
      <div className="wrapper">
        <div className="logo-box">
          <img src={logo.src} alt="logo" />
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
};