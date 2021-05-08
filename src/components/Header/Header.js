import { useState, useEffect } from "react";
import "./Header.scss";
import logo from "../../assets/img/logo.png";

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
      <div className="wrapper">
        <div className="logo-box">
          <img src={logo} alt="logo" />
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

export default Header;
