import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Menu from '../Components/Menu';
import Button from '../Components/Button';
import moment from 'moment';
import Sunny from '../Images/sunny_default.png';
import Cloudy from '../Images/cloudy_default.png';
import Rain from '../Images/rain_default.png';
import Snow from '../Images/snow_default.png';
import Wind from '../Images/wind_default.png';
import Share from '../Images/share_default.png';
import SunnyGrey from '../Images/sunny_grey.png';
import CloudyGrey from '../Images/cloudy_grey.png';
import RainGrey from '../Images/rain_grey.png';
import SnowGrey from '../Images/snow_grey.png';
import WindGrey from '../Images/wind_grey.png';
import ShareGrey from '../Images/share_grey.png';

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
  font-family: 'NanumGothic';
`;

const WrapDiary = styled.div`
  box-sizing: border-box;
  width: fit-content;
  height: fit-content;
  margin: 3rem auto 5rem auto;
  padding: 3rem 7rem 5rem 7rem;
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
  width: fit-content;
  height: fit-content;
  float: right;
  margin-left: 2.5rem;
  margin-right: 1.5rem;
  margin-top: -0.15rem;
`;

const WeatherLabel = styled.label`
  [type='radio'] {
    width: 0;
    height: 0;
    border: 0;
  }
  [type='radio'] + img {
    cursor: pointer;
    width: 1.8rem;
    height: 1.8rem;
    border: 1px solid white;
    background-image: url(${(props) => props.backgroundImage});
    background-size: 1.8rem;
    border: 0;
  }
  [type='radio']:checked + img {
    background-image: url(${(props) => props.backgroundChecked});
    border: 0;
  }
`;

const Weather = styled.input`
  width: 1.8rem;
  height: 1.8rem;
  margin-left: 1rem;
  border: 0;
`;

const WeatherImage = styled.img``;

const ShareButton = styled.div`
  position: absolute;
  /* left: 40rem; */
  display: inline-block right;
  width: 1.8rem;
  height: 1.8rem;
  /* border: 2px solid black; */
  background-image: url(${Share});
  &:hover {
    background-image: url(${ShareGrey});
  }
  &:after {
    background-image: url(${ShareGrey});
  }
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
  margin: 2rem auto 0rem auto;
  /* border: 2px solid black; */
`;
function Write() {
  const { state } = useLocation();
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  // 날씨 저장
  const [weather, setWeather] = useState();
  // 일기글 저장
  const [write, setWrite] = useState('');

  const [ctx, setCtx] = useState();
  const [isDrawing, setIsDrawing] = useState(false);

  const week = ['일', '월', '화', '수', '목', '금', '토'];
  let date = '';
  let year = '';
  let month = '';
  let day = '';
  let dayOfWeek = '';

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 643;
    canvas.height = 403;

    const context = canvas.getContext('2d');
    context.strokeStyle = 'black';
    // context.strokeStyle = 'transparent';
    context.lineWidth = 2;
    contextRef.current = context;

    setCtx(contextRef.current);
  }, []);

  const startDrawing = () => {
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    setIsDrawing(false);
  };

  const drawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    if (ctx) {
      if (!isDrawing) {
        ctx.beginPath();
        ctx.moveTo(offsetX, offsetY);
      } else {
        ctx.lineTo(offsetX, offsetY);
        ctx.stroke();
      }
    }
  };

  const onChangeText = (e) => {
    setWrite(e.target.value);
  };
  const onClickWeather = (e) => {
    setWeather(e.target.value);
  };

  if (state === null) {
    // 오늘의 일기 작성 버튼 눌렀을 때
    const today = new Date();
    const momentDate = moment(today).format().slice(0, 10);
    date = momentDate.split('-');
    year = date[0];
    month = date[1];
    day = date[2];
    dayOfWeek = week[new Date(date).getDay()];
  } else {
    // 원하는 날짜 버튼 눌렀을 때
    date = state.split('-');
    year = date[0];
    month = date[1];
    day = date[2];
    dayOfWeek = week[new Date(date).getDay()];
  }

  return (
    <div>
      <Wrap>
        <Menu />

        <WrapDiary>
          <WrapTop>
            <DateForm>
              {year}년 {month}월 {day}일 {dayOfWeek}요일
              <WrapWeather>
                <WeatherLabel
                  backgroundImage={Sunny}
                  backgroundChecked={SunnyGrey}
                >
                  <Weather
                    type='radio'
                    name='weather'
                    value='sun'
                    onClick={onClickWeather}
                  />
                  <WeatherImage />
                </WeatherLabel>

                <WeatherLabel
                  backgroundImage={Rain}
                  backgroundChecked={RainGrey}
                >
                  <Weather
                    type='radio'
                    name='weather'
                    value='rain'
                    onClick={onClickWeather}
                  />
                  <WeatherImage />
                </WeatherLabel>

                <WeatherLabel
                  backgroundImage={Cloudy}
                  backgroundChecked={CloudyGrey}
                >
                  <Weather
                    type='radio'
                    name='weather'
                    value='cloudy'
                    onClick={onClickWeather}
                  />
                  <WeatherImage />
                </WeatherLabel>

                <WeatherLabel
                  backgroundImage={Wind}
                  backgroundChecked={WindGrey}
                >
                  <Weather
                    type='radio'
                    name='weather'
                    value='wind'
                    onClick={onClickWeather}
                  />
                  <WeatherImage />
                </WeatherLabel>

                <WeatherLabel
                  backgroundImage={Snow}
                  backgroundChecked={SnowGrey}
                >
                  <Weather
                    type='radio'
                    name='weather'
                    value='snow'
                    onClick={onClickWeather}
                  />
                  <WeatherImage />
                </WeatherLabel>
              </WrapWeather>
            </DateForm>
          </WrapTop>

          <DrawDiary>
            <ShareButton />
            <canvas
              ref={canvasRef}
              onMouseDown={startDrawing}
              onMouseUp={finishDrawing}
              onMouseMove={drawing}
              onMouseLeave={finishDrawing}
            ></canvas>
          </DrawDiary>
          {/* <Button width='3rem' height='2.5rem' name='지우개' /> */}
          <WriteDiary onChange={onChangeText} />

          <WrapKeywordButton>
            <Button
              width='5rem'
              height='2.5rem'
              name='키워드 추출'
              color='rgba(138, 80, 255, 0.6)'
              border='2px solid rgba(138, 80, 255, 0.6)'
              // color='grey'
              // border='2px solid grey'
              backgroundColor='transparent;'
              hoverBackgroundColor='rgba(256, 256, 256, 0.4)'
            />
            <Button
              width='5rem'
              height='2.5rem'
              name='일기 저장'
              margin='0rem 0rem 0rem 2rem'
              color='rgba(138, 80, 255, 0.6)'
              border='2px solid rgba(138, 80, 255, 0.6)'
              // color='grey'
              // border='2px solid grey'
              backgroundColor='transparent;'
              hoverBackgroundColor='rgba(256, 256, 256, 0.4)'
            />
          </WrapKeywordButton>
        </WrapDiary>
      </Wrap>
    </div>
  );
}

export default Write;
