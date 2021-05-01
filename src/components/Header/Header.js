import { useState, useEffect } from "react";
import logo from "../../img/logo.png";

const Header = props => {
  const { search } = props;
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = e => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    search(searchTerm);
  }, [searchTerm]);

  return (
    <header>
      <div className="logo-box">
        <img src={logo} alt="logo" />
        <h1>User App</h1>
      </div>
      <label htmlFor="search">Find User</label>
      <input id="search" onChange={handleInputChange} value={searchTerm} />
    </header>
  );
};

export default Header;
