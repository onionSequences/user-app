import { useHistory } from "react-router-dom";
import "./Popup.scss";

import { FiX } from "react-icons/fi";

const Popup = props => {
  const { title, children } = props;

  let history = useHistory();

  const handleClick = () => {
    history.push("/");
  };

  return (
    <div className="popup-background">
      <div className="popup-wrapper">
        <div className="popup-title">
          <h5>{title}</h5>
          <button onClick={handleClick}>
            <FiX />
          </button>
        </div>
        <hr />
        <div className="popup-content">{children}</div>
      </div>
    </div>
  );
};

export default Popup;
