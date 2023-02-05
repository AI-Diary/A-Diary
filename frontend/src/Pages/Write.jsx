import React from 'react';
import styled from 'styled-components';
import Button from '../Components/Button';

const DrawDiary = styled.div`
  width: 30rem;
  height: 20rem;
  /* background-color: black; */
`;
const WriteDiary = styled.textarea`
  width: 30rem;
  height: 20rem;
  letter-spacing: 0.5rem;
  resize: none;
  font-size: 1.2rem;
`;

function Write() {
  return (
    <div>
      <DrawDiary></DrawDiary>
      <WriteDiary></WriteDiary>
    </div>
  );
}

export default Write;
