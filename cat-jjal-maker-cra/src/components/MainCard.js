const MainCard = (props) => {
  const heartIcon = props.alreadyFavorite ? '💖' : '🤍';

  return (
    <div className="main-card">
      <img src={props.img} alt="고양이" width="400" />
      <button onClick={props.onHeartClick}>{heartIcon}</button>
    </div>
  );
};

export default MainCard;
