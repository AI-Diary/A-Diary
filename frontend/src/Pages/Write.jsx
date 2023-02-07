import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Button from '../Components/Button';
import Input from '../Components/Input';

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

const WrapButtons = styled.div`
  /* border: 1px solid black; */
  margin-left: 1rem;
  width: fit-content;
  height: fit-content;
  float: right;
`;

const WrapDiary = styled.div`
  box-sizing: border-box;
  width: fit-content;
  height: fit-content;
  margin: 7rem 0rem 5rem 18rem;
  padding: 3rem 7rem 5rem 7rem;
  border-radius: 1.5rem;
  background-color: rgba(256, 256, 256, 0.7);
`;

const WrapTop = styled.div`
  width: 40rem;
  height: 5rem;
  margin-bottom: 1rem;
  border-radius: 1.2rem;
  background-color: rgba(256, 256, 256, 0.8);
  border: 1.8px solid grey;
`;

const DateForm = styled.div`
  width: fit-content;
  margin: 1.2rem 0rem 0rem 2rem;
  /* border: 1px solid black; */
  /* white-space: pre-wrap; */
  /* word-spacing: 1rem; */
  font-size: 1.8rem;

  /* width: 5rem; */
`;

const DrawDiary = styled.div`
  width: 40rem;
  height: 25rem;
  background-color: white;
  margin-bottom: -1.8px;
  border-radius: 1.5rem 1.5rem 0rem 0rem;
  /* border-style: solid solid none solid; */
  border: 1.8px solid grey;
  /* margin: 2rem 27rem 0rem 27rem; */

  /* border-radius: 1.5rem; */
`;

const WriteDiary = styled.textarea`
  box-sizing: border-box;
  width: 40.2rem;
  height: 20rem;
  background-color: rgba(256, 256, 256, 0.8);
  /* margin: 2rem 27rem; */
  padding: 2.8rem 2rem 1rem 2rem;
  border: 1.8px solid grey;
  border-radius: 0rem 0rem 1.5rem 1.5rem;
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
  const now = new Date();
  const week = ['일', '월', '화', '수', '목', '금', '토'];
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const date = now.getDate();
  const day = week[now.getDay()];

  return (
    <div>
      <Wrap>
        <WrapButtons>
          <Button
            width='7rem'
            height='2.5rem'
            name='키워드 추출'
            color='white'
            margin='2rem 1rem'
            border='2px solid white'
            backgroundColor='transparent;'
          />
          <Button
            width='7rem'
            height='2.5rem'
            name='일기 저장'
            color='white'
            margin='2rem 1rem'
            border='2px solid white'
            backgroundColor='transparent;'
          />
          <Button
            width='7rem'
            height='2.5rem'
            name='SNS 공유'
            color='white'
            margin='2rem 2rem 2rem 1rem'
            border='2px solid white'
            backgroundColor='transparent;'
          />
        </WrapButtons>
        <WrapDiary>
          <WrapTop>
            <DateForm>
              {year}년 {month}월 {date}일 {day}요일
              <WrapButtons>
                <Button
                  width='1rem'
                  height='1.5rem'
                  background='transparent'
                  name='해'
                  margin='0rem 2px 0rem 0rem'
                />
                <Button
                  width='2rem'
                  height='1.5rem'
                  background='transparent'
                  name='구름'
                  margin='0rem 2px 0rem 0rem'
                />
                <Button
                  width='1rem'
                  height='1.5rem'
                  background='transparent'
                  name='비'
                  margin='0rem 2px 0rem 0rem'
                />
                <Button
                  width='2rem'
                  height='1.5rem'
                  background='transparent'
                  name='안개'
                  margin='0rem 2px 0rem 0rem'
                />
                <Button
                  width='1rem'
                  height='1.5rem'
                  background='transparent'
                  name='눈'
                  margin='0rem 2px 0rem 0rem'
                />
              </WrapButtons>
            </DateForm>
          </WrapTop>
          <DrawDiary />
          <WriteDiary />
        </WrapDiary>
      </Wrap>
    </div>
  );
}

export default Write;
