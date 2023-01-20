import React from 'react';
import './App.css';

const jsonLocalStorage = {
  setItem: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  getItem: (key) => {
    return JSON.parse(localStorage.getItem(key));
  },
};

const fetchCat = async (text) => {
  const OPEN_API_DOMAIN = 'https://cataas.com';
  const response = await fetch(`${OPEN_API_DOMAIN}/cat/says/${text}?json=true`);
  const responseJson = await response.json();
  return `${OPEN_API_DOMAIN}/${responseJson.url}`;
};

const Title = (props) => {
  return <h1>{props.children}</h1>;
};

const Form = (props) => {
  const includesHangul = (text) => /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/i.test(text);
  const [value, setValue] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  const handleInputChange = (event) => {
    const userValue = event.target.value;
    setErrorMessage('');

    if (includesHangul(userValue)) {
      setErrorMessage('한글은 입력할 수 없습니다.');
    }
    setValue(userValue.toUpperCase());
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setErrorMessage('');

    if (value.trim() === '') {
      setErrorMessage('빈 값으로 만들 수 없습니다.');
      return;
    }
    props.updateMainImage(value);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        type="text"
        name="name"
        placeholder="영어 대사를 입력해주세요"
        value={value}
        onChange={handleInputChange}
      />
      <button type="submit">생성</button>
      <p style={{ color: 'red' }}>{errorMessage}</p>
    </form>
  );
};

const MainCard = (props) => {
  const heartIcon = props.alreadyFavorite ? '💖' : '🤍';

  return (
    <div className="main-card">
      <img src={props.img} alt="고양이" width="400" />
      <button onClick={props.onHeartClick}>{heartIcon}</button>
    </div>
  );
};

const CatItem = (props) => {
  return (
    <li>
      <img src={props.img} alt="" />
    </li>
  );
};

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

const App = () => {
  const CAT1 = 'https://cataas.com/cat/HSENVDU4ZMqy7KQ0/says/react';

  const [counter, setCounter] = React.useState(() => {
    return jsonLocalStorage.getItem('counter');
  });
  const [mainImage, setMainImage] = React.useState(CAT1);
  const [favorties, setFavorites] = React.useState(() => {
    return jsonLocalStorage.getItem('favorites') || [];
  });

  const alreadyFavorite = favorties.includes(mainImage);

  const setInitialImage = async () => {
    const newImage = await fetchCat('First Cat');
    setMainImage(newImage);
  };

  React.useEffect(() => {
    setInitialImage();
  }, []);

  const updateMainImage = async (value) => {
    const newImage = await fetchCat(value);

    setMainImage(newImage);
    setCounter((prev) => {
      const nextCounter = prev + 1;
      jsonLocalStorage.setItem('counter', nextCounter);
      return nextCounter;
    });
  };

  const handleHeartClick = () => {
    const nextFavorties = [...favorties, mainImage];
    setFavorites(nextFavorties);
    jsonLocalStorage.setItem('favorites', nextFavorties);
  };

  const counterTitle = counter ? `${counter}번째 ` : '';

  return (
    <div>
      <Title>{counterTitle}고양이 가라사대</Title>
      <Form updateMainImage={updateMainImage} />
      <MainCard
        img={mainImage}
        onHeartClick={handleHeartClick}
        alreadyFavorite={alreadyFavorite}
      />
      <Favorites favorties={favorties} />
    </div>
  );
};

export default App;
