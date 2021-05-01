const UserCard = props => {
  const { userData } = props;
  return (
    <div className="card">
      <div className="avatar">
        <img src={userData.avatar} alt={userData.name} />
      </div>
      <div className="card-info">
        <h4>
          {userData.name}
          <span> ({userData.age})</span>
        </h4>
        <p>{userData.gender}</p>
      </div>
    </div>
  );
};

export default UserCard;
