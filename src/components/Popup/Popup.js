const Popup = props => {
  const { title, children, setOpenPopup } = props;
  return (
    <div className="popup-background backdrop-blur">
      <div className="popup-wrapper">
        <div className="popup-title">
          <h5>{title}</h5>
          <button onClick={() => setOpenPopup(false)}>X</button>
        </div>
        <div className="popup-content">{children}</div>
      </div>
    </div>
  );
};

export default Popup;
