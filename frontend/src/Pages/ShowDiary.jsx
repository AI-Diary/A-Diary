import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Menu from '../Components/Menu';
import Sunny from '../Images/sunny_grey.png';
import Cloudy from '../Images/cloudy_grey.png';
import Rain from '../Images/rain_grey.png';
import Snow from '../Images/snow_grey.png';
import Wind from '../Images/wind_grey.png';

const Wrap = styled.div`
  position: absolute;
  width: 100vw;
  height: 80rem;
  min-width: 60rem;
  border: 0.1px solid transparent;
  /* padding-bottom: 4rem; */
  background: linear-gradient(
    to bottom,
    rgba(51, 153, 255),
    rgba(178, 102, 255)
  );
  font-family: 'NanumGothic';
`;

const WrapDiary = styled.div`
  box-sizing: border-box;
  width: fit-content;
  height: fit-content;
  margin: 3rem auto 5rem auto;
  padding: 3rem 8rem 5rem 8rem;
  border-radius: 1.5rem;
  background-color: rgba(256, 256, 256, 0.8);
  box-shadow: 0.4rem 0.4rem 1rem rgba(120, 120, 120, 0.3);
`;

const WrapTop = styled.div`
  box-sizing: border-box;
  width: 40rem;
  height: 4rem;
  padding: 1.1rem;
  margin-bottom: 1rem;
  border-radius: 1.2rem;
  background-color: rgba(256, 256, 256, 0.8);
  border: 1.8px solid grey;
`;

const DateForm = styled.div`
  width: fit-content;
  word-spacing: 0.8rem;
  font-size: 1.3rem;
  margin-left: 1.5rem;
`;

const WrapWeather = styled.div`
  /* position: absolute; */
  /* width:7rem */
  margin-top: -1.45rem;
  display: flex;
  margin-left: 18.5rem;
  /* border: 1px solid black; */
`;
const Weather = styled.div`
  height: 1.3rem;
`;

const WeatherIcon = styled.div`
  width: 1.7rem;
  height: 1.7rem;
  /* border: 1px solid black; */
  margin-top: -0.1rem;
  margin-left: 0.5rem;
  background-size: 1.7rem;
  background-color: white;
  /* background-image: url(${(props) => props.backgroundImage}); */
  /* background-image: url(${Sunny}); */
`;

const WeatherIcon1 = styled.div`
  width: 1.7rem;
  height: 1.7rem;
  /* border: 1px solid black; */
  margin-top: -0.1rem;
  margin-left: 0.5rem;
  background-size: 1.7rem;
  background-color: white;
  /* background-image: url(${(props) => props.backgroundImage}); */
  background-image: url(${Sunny});
`;

const WeatherIcon2 = styled.div`
  width: 1.7rem;
  height: 1.7rem;
  /* border: 1px solid black; */
  margin-top: -0.1rem;
  margin-left: 0.5rem;
  background-size: 1.7rem;
  background-color: white;
  /* background-image: url(${(props) => props.backgroundImage}); */
  background-image: url(${Cloudy});
`;

const WeatherIcon3 = styled.div`
  width: 1.7rem;
  height: 1.7rem;
  /* border: 1px solid black; */
  margin-top: -0.1rem;
  margin-left: 0.5rem;
  background-size: 1.7rem;
  background-color: white;
  /* background-image: url(${(props) => props.backgroundImage}); */
  background-image: url(${Rain});
`;

const WeatherIcon4 = styled.div`
  width: 1.7rem;
  height: 1.7rem;
  /* border: 1px solid black; */
  margin-top: -0.1rem;
  margin-left: 0.5rem;
  background-size: 1.7rem;
  background-color: white;
  /* background-image: url(${(props) => props.backgroundImage}); */
  background-image: url(${Snow});
`;

const WeatherIcon5 = styled.div`
  width: 1.7rem;
  height: 1.7rem;
  /* border: 1px solid black; */
  margin-top: -0.1rem;
  margin-left: 0.5rem;
  background-size: 1.7rem;
  background-color: white;
  /* background-image: url(${(props) => props.backgroundImage}); */
  background-image: url(${Wind});
`;

const Emotion = styled.div`
  /* position: absolute; */
  width: 2.5rem;
  height: 1.3rem;
  font-size: 1.3rem;
  /* border: 1px solid red; */
  /* margin-top: -1.5rem; */
  margin-left: 8.5rem;
`;

const WrapTitle = styled.div`
  display: flex;
  width: 40rem;
  height: 3.8rem;
  margin-bottom: -1.8px;
  background-color: white;
  border: 1.8px solid grey;
  border-radius: 1.5rem 1.5rem 0rem 0rem;
`;

const WrapTitleContents = styled.div`
  /* border: 2px solid red; */
  width: fit-content;
  height: fit-content;
  margin: 0.4rem auto 0rem auto;
  display: flex;
`;

const Title = styled.div`
  width: fit-content;
  height: fit-content;
  margin-top: 0.75rem;
  /* border: 2px solid black; */
  font-size: 1.3rem;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  display: table-cell;
`;

const DrawDiary = styled.div`
  position: relative;
  width: 40rem;
  height: 25rem;
  background-color: white;
  margin-bottom: -1.8px;
  /* border-radius: 1.5rem 1.5rem 0rem 0rem; */
  border: 1.8px solid grey;
  background-size: 40rem 25rem;
`;

const Diary = styled.div`
  position: absolute;
  width: 40rem;
  height: 25rem;
  background-color: transparent;
  background-image: url(${(props) => props.backgroundImage})
  background-size: 40rem 25rem;
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

function ShowDiary() {
  const { state } = useLocation();
  const info = state.info.split('`');

  const date = info[0].split('-');
  const year = date[0];
  const month = date[1];
  const day = date[2];

  let weather, background;

  if (info[6] === 'Sunny') {
    weather = '맑음';
    // document.getElementById('weather').style.backgroundImage = `url(${Sunny})`;
  } else if (info[6] === 'Rain') {
    weather = '비';
    // document.getElementById('weather').style.backgroundImage = `url(${Rain})`;
  } else if (info[6] === 'Cloudy') {
    weather = '흐림';
    // document.getElementById('weather').style.backgroundImage = `url(${Cloudy})`;
  } else if (info[6] === 'Wind') {
    weather = '바람';
    // document.getElementById('weather').style.backgroundImage = `url(${Wind})`;
  } else if (info[6] === 'Snow') {
    weather = '눈';
    // document.getElementById('weather').style.backgroundImage = `url(${Snow})`;
  }

  return (
    <div>
      <Wrap>
        <Menu minWidth='60rem' />
        <WrapDiary>
          <WrapTop>
            <DateForm>
              {year}년 {month}월 {day}일 {info[1]}요일{' '}
              <WrapWeather>
                <Weather>{weather}</Weather>
                {/* <WeatherIcon id='weather' /> */}
                {() => {
                  if (info[6] === 'Sunny') {
                    {
                      /* weather = '맑음';
                    document.getElementById(
                      'weather'
                    ).style.backgroundImage = `url(${Sunny})`; */
                    }
                    return <WeatherIcon1 />;
                  } else if (info[6] === 'Rain') {
                    {
                      /* weather = '비';
                    document.getElementById(
                      'weather'
                    ).style.backgroundImage = `url(${Rain})`; */
                    }
                    return <WeatherIcon2 />;
                  } else if (info[6] === 'Cloudy') {
                    {
                      /* weather = '흐림'; 
                    document.getElementById(
                      'weather'
                    ).style.backgroundImage = `url(${Cloudy})`;
                    console.log(background);*/
                    }
                    return <WeatherIcon3 />;
                  } else if (info[6] === 'Wind') {
                    {
                      /* weather = '바람'; 
                    document.getElementById(
                      'weather'
                    ).style.backgroundImage = `url(${Wind})`;*/
                    }
                    return <WeatherIcon4 />;
                  } else if (info[6] === 'Snow') {
                    {
                      /* weather = '눈'; 
                    document.getElementById(
                      'weather'
                    ).style.backgroundImage = `url(${Snow})`;*/
                    }
                    return <WeatherIcon5 />;
                  }
                }}
                <Emotion>{info[4]}</Emotion>
              </WrapWeather>
            </DateForm>
          </WrapTop>
          <WrapTitle>
            <WrapTitleContents>
              <Title>{info[5]}</Title>
            </WrapTitleContents>
          </WrapTitle>
          <DrawDiary>
            <Diary backgrundImage={info[3]} />
          </DrawDiary>
          <WriteDiary readOnly>{info[2]}</WriteDiary>
        </WrapDiary>
      </Wrap>
    </div>
  );
}

export default ShowDiary;
