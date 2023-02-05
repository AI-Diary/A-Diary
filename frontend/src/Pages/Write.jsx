import React from 'react';
import styled from 'styled-components';
import Button from '../Components/Button';

const DrawDiary = styled.div`
  width: 30rem;
  height: 20rem;
  background-color: black;
`;

function Write() {
  return (
    <div>
      <DrawDiary />
    </div>
  );
}

export default Write;
