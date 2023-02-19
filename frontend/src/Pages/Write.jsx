import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../Components/Button';
import Input from '../Components/Input';
import Sunny from '../Images/sunny_grey.png';
import Cloudy from '../Images/cloudy_grey.png';
import Rain from '../Images/rain_grey.png';
import Snow from '../Images/snow_grey.png';
import Wind from '../Images/wind_grey.png';

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
  /* margin-left: 1rem; */
  width: fit-content;
  height: fit-content;
  float: right;
`;

const WrapDiary = styled.div`
  box-sizing: border-box;
  width: fit-content;
  height: fit-content;
  margin: 7rem auto 5rem auto;
  padding: 3rem 7rem 5rem 7rem;
  border-radius: 1.5rem;
  background-color: rgba(256, 256, 256, 0.8);
  box-shadow: 0.4rem 0.4rem 1rem rgba(120, 120, 120, 0.3);
`;

const WrapTop = styled.div`
  box-sizing: border-box;
  width: 40rem;
  height: 4rem;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 1.2rem;
  background-color: rgba(256, 256, 256, 0.7);
  border: 1.8px solid grey;
`;

const DateForm = styled.div`
  width: fit-content;
  word-spacing: 0.4rem;
  font-size: 1.5rem;
  margin-left: 1rem;
`;

const WrapWeather = styled.div`
  width: fit-content;
  height: fit-content;
  float: right;
  margin-left: 3.5rem;
`;
const Weather = styled.button`
  width: 1.8rem;
  height: 1.8rem;
  margin-left: 1rem;
  border: none;
  background-color: transparent;
  background: ${(props) => `url(${props.backgroundImage}) no-repeat center`};
  background-size: 1.8rem;
`;

const DrawDiary = styled.div`
  width: 40rem;
  height: 25rem;
  background-color: white;
  margin-bottom: -1.8px;
  border-radius: 1.5rem 1.5rem 0rem 0rem;
  border: 1.8px solid grey;
`;

const WriteDiary = styled.textarea`
  box-sizing: border-box;
  width: 40.2rem;
  height: 20rem;
  background-color: rgba(256, 256, 256, 0.7);
  padding: 2.8rem 2rem 1rem 2rem;
  border: 1.8px solid grey;
  border-radius: 0rem 0rem 1.5rem 1.5rem;
  font-size: 1rem;
  font-family: 'NanumGothic';
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
  &:focus {
    outline: none;
  }
`;

const WrapKeywordButton = styled.div`
  width: fit-content;
  height: fit-content;
  margin: 1rem auto 0rem auto;
`;
function Write() {
  // const time = new Date();
  const { state } = useLocation();
  const week = ['일', '월', '화', '수', '목', '금', '토'];
  // const year = now.getFullYear();
  // const month = now.getMonth() + 1;
  // const date = now.getDate();
  // const day = week[now.getDay()];
  const date = state.split('-');
  const daynum = new Date(state).getDay();
  const day = week[daynum];
  console.log(state);

  return (
    <div>
      <Wrap>
        <WrapButtons>
          <Button
            width='5rem'
            height='2.5rem'
            name='일기 저장'
            color='white'
            margin='2rem 1rem 0rem 0rem'
            border='2px solid white'
            backgroundColor='transparent;'
          />
          <Button
            width='5rem'
            height='2.5rem'
            name='SNS 공유'
            color='white'
            margin='2rem 4rem 0rem 1rem'
            border='2px solid white'
            backgroundColor='transparent;'
          />
        </WrapButtons>
        {/* WrapDiary 중앙정렬하기 */}
        <WrapDiary>
          <WrapTop>
            <DateForm>
              {date[0]}년 {date[1]}월 {date[2]}일 {day}요일
              <WrapWeather>
                <Weather backgroundImage={Sunny} />
                <Weather backgroundImage={Rain} />
                <Weather backgroundImage={Cloudy} />
                <Weather backgroundImage={Snow} />
                <Weather backgroundImage={Wind} />
              </WrapWeather>
            </DateForm>
          </WrapTop>
          <DrawDiary />
          <WriteDiary />
          <WrapKeywordButton>
            <Button
              width='8rem'
              height='2.5rem'
              name='키워드 추출'
              // color='rgba(138, 80, 255, 0.5)'
              // border='2px solid rgba(138, 80, 255, 0.5)'
              color='grey'
              border='2px solid grey'
              backgroundColor='transparent;'
            />
          </WrapKeywordButton>
        </WrapDiary>
      </Wrap>
    </div>
  );
}

export default Write;
