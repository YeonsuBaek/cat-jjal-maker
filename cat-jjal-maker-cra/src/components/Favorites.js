import CatItem from './CatItem';

const Favorites = (props) => {
  if (props.favorties.length === 0) {
    return <div>사진 위에 하트를 눌러 고양이 사진을 저장해봐요!</div>;
  }

  return (
    <ul className="favorites">
      {props.favorties.map((cat) => {
        return <CatItem img={cat} key={Math.random()} />;
      })}
    </ul>
  );
};

export default Favorites;
