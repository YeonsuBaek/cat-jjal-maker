const MainCard = (props) => {
  const heartIcon = props.alreadyFavorite ? 'đ' : 'đ¤';

  return (
    <div className="main-card">
      <img src={props.img} alt="ęł ěě´" width="400" />
      <button onClick={props.onHeartClick}>{heartIcon}</button>
    </div>
  );
};

export default MainCard;
