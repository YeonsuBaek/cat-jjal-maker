import React from 'react';
import './App.css';
import Title from './components/Title';
import Form from './components/Form';
import MainCard from './components/MainCard';
import Favorites from './components/Favorites';

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
