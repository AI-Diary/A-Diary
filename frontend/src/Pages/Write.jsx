import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Button from '../Components/Button';

const Wrap = styled.div`
  /* position: absolute; */
  width: 100vw;
  height: fit-content;
  border: 0.1px solid transparent;
  /* padding-bottom: 4rem; */
  background: linear-gradient(
    to bottom,
    rgba(51, 153, 255),
    rgba(178, 102, 255)
  );
`;

const DrawDiary = styled.div`
  width: 40rem;
  height: 25rem;
  background-color: white;
  margin: 2rem 27rem 0rem 27rem;

  border-radius: 1.5rem;
`;

const WriteDiary = styled.textarea`
  box-sizing: border-box;
  width: 40rem;
  height: 25rem;
  background-color: rgba(256, 256, 256, 0.8);
  margin: 2rem 27rem;
  padding: 2.8rem 2rem 1rem 2rem;
  border: 1.8px solid grey;
  border-radius: 1.5rem;
  font-size: 25px;
  resize: none;

  background-attachment: local;
  background-image: linear-gradient(to right, white 10px, transparent 10px),
    linear-gradient(to left, white 10px, transparent 10px),
    repeating-linear-gradient(
      white,
      white 39px,
      #ccc 39px,
      #ccc 40px,
      white 40px
    );
  line-height: 40px;
`;

function Write() {
  return (
    <div>
      <Wrap>
        <DrawDiary />
        <WriteDiary />
      </Wrap>
    </div>
  );
}

export default Write;
