import "./Popup.scss";

import { FiX } from "react-icons/fi";

const Popup = props => {
  const { title, children, setOpenPopup } = props;
  return (
    <div className="popup-background">
      <div className="popup-wrapper">
        <div className="popup-title">
          <h5>{title}</h5>
          <button onClick={() => setOpenPopup(false)}>
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
