import { FiX } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "./Popup.scss";

import { editUserData } from "../../redux/userSlice";

const Popup = props => {
  const { title, children } = props;

  const dispatch = useDispatch();
  let history = useHistory();

  const handleClick = () => {
    dispatch(editUserData(null));
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
