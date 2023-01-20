import React from 'react';

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

export default Form;
