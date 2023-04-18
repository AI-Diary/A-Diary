// import React, { useState, useEffect, useRef } from 'react';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import Menu from '../Components/Menu';
import Button from '../Components/Button';
import Input from '../Components/Input';
import moment from 'moment';
import WordSpeech from '../Images/speech.png';
import Sunny from '../Images/sunny_default.png';
import Cloudy from '../Images/cloudy_default.png';
import Rain from '../Images/rain_default.png';
import Snow from '../Images/snow_default.png';
import Wind from '../Images/wind_default.png';
import Share from '../Images/share_default.png';
import Instargram from '../Images/instagram_default.png';
import Twitter from '../Images/twitter_default.png';
import Kakaotalk from '../Images/kakaotalk_default.png';
import SunnyGrey from '../Images/sunny_grey.png';
import CloudyGrey from '../Images/cloudy_grey.png';
import RainGrey from '../Images/rain_grey.png';
import SnowGrey from '../Images/snow_grey.png';
import WindGrey from '../Images/wind_grey.png';
import ShareGrey from '../Images/share_grey.png';
import InstargramGrey from '../Images/instagram_grey.png';
import TwitterGrey from '../Images/twitter_grey.png';
import KakaotalkGrey from '../Images/kakaotalk_grey.png';
import Plus from '../Images/drawplus_256.png';
import WriteModal from './WriteModal';

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
  width: fit-content;
  height: fit-content;
  float: right;
  margin-left: 2.5rem;
  margin-right: 1.5rem;
  margin-top: -0.15rem;
`;

const RadioLabel = styled.label`
  border: none;

  [type='radio'] {
    width: 0;
    height: 0;
  }
  [type='radio'] + img {
    cursor: pointer;
    width: 1.8rem;
    height: 1.8rem;
    /* border: 1px solid transparent; */
    background-image: url(${(props) => props.backgroundImage});
    background-size: 1.8rem;
    border: none;
    box-shadow: none;
  }
  [type='radio']:checked + img {
    background-image: url(${(props) => props.backgroundChecked});
    border: none;
  }
`;

const Weather = styled.input`
  width: 1.8rem;
  height: 1.8rem;
  margin-left: 1rem;
  border: none;
`;

const LabelImage = styled.img``;

const WrapTitle = styled.div`
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

const WrapPlus = styled.div`
  position: relative;
  width: 16rem;
  height: 16rem;
  margin: 3rem auto 0rem auto;
  border-radius: 10rem;
  background-image: url(${Plus});
  background-repeat: no-repeat;
  background-size: 16rem;
  transition: all 0.1s linear;
  &:hover {
    transform: scale(1.2);
  }
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

const WrapShare = styled.div`
  position: absolute;
  width: fit-content;
  height: fit-content;
  margin: 3.5rem 0rem 0rem 0.7rem;
  display: flex;
  z-index: 5;
`;
const ShareButton = styled.div`
  /* border: 2px solid black; */
  display: inline-block right;
  width: 1.8rem;
  height: 1.8rem;

  background-image: url(${Share});
  &:hover {
    background-image: url(${ShareGrey});
  }
`;

const WrapSNS = styled.div`
  width: 10rem;
  height: 2.1rem;
  display: flex;
  visibility: ${(props) => props.visibility};
  margin-top: -0.3rem;
  margin-left: 0.3rem;
  padding-top: 0.4rem;
  background-image: url(${WordSpeech});
  background-repeat: no-repeat;
  background-size: 10rem 2.5rem;
  /* border: 1px solid yellow; */
`;

const SNSButton = styled.div`
  width: 1.8rem;
  height: 1.8rem;
  margin-left: 1.25rem;
  background-size: 1.8rem;
  background-image: url(${(props) => props.backgroundImage});
  &:hover {
    background-image: url(${(props) => props.backgroundChecked});
  }
  /* border: 1px solid orange; */
`;

const WrapKeywordButton = styled.div`
  width: fit-content;
  height: fit-content;
  margin: 2rem auto 0rem auto;

  /* border: 2px solid black; */
`;

function Write() {
  // Main에서 가져온 정보
  const { state } = useLocation();

  // 날씨 저장
  const [weather, setWeather] = useState('');

  // 제목 저장
  const [title, setTitle] = useState('');

  // 일기글 저장
  const [write, setWrite] = useState('');

  // 키워드 받아온 거 저장
  const [keyword, setKeyword] = useState([]);

  // SNS 공유 창 보이기
  const [visibleShare, setVisibleShare] = useState(false);

  // WriteModal 보이기
  const [visibleModal, setVisibleModal] = useState(false);

  // WriteModal에서 받아온 Uri 저장
  const [jpgUrl, setJpgUrl] = useState('');

  const week = ['일', '월', '화', '수', '목', '금', '토'];
  let date = '';
  let year = '';
  let month = '';
  let day = '';
  let dayOfWeek = '';

  // 날짜 저장
  const onClickWeather = (e) => {
    setWeather(e.target.value);
  };

  // 제목 저장
  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  // 일기글 저장
  const onChangeText = (e) => {
    setWrite(e.target.value);
  };

  // 서버로 값 보내기
  const onClickSave = () => {
    console.log('weather : ', weather, 'title : ', title, 'write : ', write);
  };

  // SNS 연동
  const onClickInsta = () => {
    console.log('insta');
  };
  const onClickTwitter = () => {
    console.log('twitter');
  };
  const onClickKakao = () => {
    console.log('kakao');
  };

  const onClickKeyword = () => {
    axios
      .post(`http://127.0.0.1:5001/keyword`, { text: write })
      .then((res) => {
        console.log(res);
        setKeyword(...res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onChangeUrl = (url) => {
    setJpgUrl(url);
    console.log(url);
    document.getElementById('imageId').style.backgroundImage = `url(${url})`;
    // document.getElementById('imageId').style.zIndex = 7;
    // document.getElementById('plus').style.zIndex = -1;
    // document.getElementById('imageId').setAttribute('src', url);
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
    date = state.date.split('-');
    year = date[0];
    month = date[1];
    day = date[2];
    dayOfWeek = week[new Date(date).getDay()];
  }

  const data =
    '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ORHIi8H5ABG2MgMB8zEmgCv8Ev8AkkOhf9vH/pRJXoFcH8LZm+weJbBRGlpp3iO+tbSGONUWGLeHCAADjc7fnjoAK7ygAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACvN/ix9s8OWdr490byF1LSMwTpNkJc28pCbHC4L7XKMoLAD5jycV6RXk/x2sbjX9F0Lw1pkfn6vfag01vb7gu9IoZDIdzYUY3r1IznjNAG58MoJrZ/GiTxSROfFF44V1Kkqyxsp57FSCD3BBrvK8/8Jf8le+Iv/cM/wDSdq9AoAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigArz/AFH/AImfx30Wzm+WPSNEn1C3KcFpJZBAwbPVQoyAMHPcjivQK8/8Hf8AE0+JnjnWh+/tYpbfTLWd+TG0SZniUHlV3lScYVjyM9aADx3/AMUv4h0jx7Hxb22NN1f3s5XG1+5/dyENhF3NuxkAV6BWfrmjWfiHQ73SL9N9rdxNE+ACVz0ZcggMDgg44IBrn/h3rN5faHLpGsPnXdElNjfZJzLt/wBXMNx3FZEwQ7AbjuIGKAOwooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACvP/g//pnhC81/7n9vard6l5HXyN0mzZu/i/1ec4HXpxVj4pX1wfC6+HdMkxq/iCVdPtlChsIx/fOw5IjEe4MwB27geOo7CwsbfTNOtrCzj8u1tYkhhTcTtRQAoyeTgAdaALFed+LdA1rQfEEvjnwisl1duirq2kMxK38SDAZOu2VVHGOvYE5V/RKKAMfwx4n0vxdocOr6RP5tvJwytw8TjqjjswyPzBBIIJ2K8z8V6U3gPxAfH2hW129pK+PEGnWm3bNFhv8ASQp6OjEE465JJUF2PoGlarY65pdvqemXMdzZ3Cb4pU6MP5gg5BB5BBBwRQBcooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAoorL8Sa3D4c8NalrM/llLO3eUI8gjEjAfKm49CzYUcHkjg0Acna/8VR8YZ75P3umeGLRrSJ/4RfTf60oy8NtjwjKx+ViPl716BXJ/DnRJtG8HW8l75h1TU3bUtRaSMxsbibDMCnRSowuAAPlzgZNdZQAUUUUAFeV6rpV98K9UuPEfhy2kufCtw/mavo0XW1Pe4gHQAD7y9AB2UAx+qUUAZ+ja5pfiHTkv9Iv4L21bA3wvnaSAdrDqrYIypwRnkVoVh6r4S0jVXuLjyZLLUJ02tqOnyG2uvu4GZEwWAwp2tlcquQcCqf2Hxjpk+6z1ex1q1aXJh1OL7NMqbMYE0K7ThwDgw9CRngUAdRRXL/8J5pdpP5GuW99oMhl8pW1OHZC52bxidC0PIzxvzlSMZrpIJ4bq3iuLeWOaCVA8ckbBldSMggjggjnNAElFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABXn/AI+/4n3ijwr4QT54bi7Opago/eL9ngGQksfeORyFBbjco4Y8V6BXn/w+/wCKh1zxB45PzWuoyiz0sv8AMVtYMqWUnlFkfcxQgYK5Ocg0AegUUUUAFFFFABRRRQAUUUUAFc3J4K02F4ZNFnu9AeN923SXWKJ8qVO+BlaJicj5im75V54FdJRQBy8MPjjT/s6NdaHrUYiKSNLHLYSFxtw+V85Wz82QFXBxjjiiHxfcQfZ01nwvrmnSSxF2aK3F7GHG3KZty7D73BZVyAeh4rqKKAMfRvFfh/xDsGka1Y3sjRCbyYZ1Mioccsmdy9QDkDBODzWxWfqehaPrflf2tpVjf+Tny/tdukuzOM43A4zgdPQVjr4E06z8s6Lf6rovlyvKsdjeMYRu3blEEu+EKSxOAgwQMYoA6iiuXW08a6d5Yg1TStZhWV9yX1u1pMYzuK5li3IWU7RxCAQD0NC+K9Rs/LXWvCmq2u6V4mnsQt9CMbirARHztrBRyYhgsAcdaAOoorD0vxj4c1m4W1stYtGvGd0+xyP5VwGQkMDC+HBG08FRwM9K3KACiiigAooooAKKKKACiiigAorH1nxX4f8AD28avrVjZSLEZvJmnUSMgzyqZ3N0IGAckYHNZ9z4xeTdFo3hzXNSuvKeRVezayjUjAAaS4CDkn+EMcAnHFAHUVXvr+z0yzkvL+7gtLWPG+aeQRouSAMseBkkD8a5/wCw+MdTn3Xmr2Oi2qy5EOmRfaZmTZjBmmXaMuScCHoAM8mpNP8AAmgWNxDeTWsmp6hCkarfapM13OChJVlaQnYdxLfIFGT04GADj2vNa+LqXtrplxJo/gouITfCIi61MBiJFjyQEiIyMkE5GCDl0X0jStKsdD0u30zTLaO2s7dNkUSdFH8ySckk8kkk5Jq5RQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFAFPUtJ03WbdbfVNPtL6BXDrHdQrKobBGQGBGcEjPuaw18CadZ+WdFv8AVdF8uV5VjsbxjCN27cogl3whSWJwEGCBjFdRRQBy7ad4x0/zGsdesdUj81HSHVbPypCnyh086EhR0Yg+ScEgHIobxNrOn+Z/a/hK+EaSon2jSpkvYyjbRv2/JMcFjkCI4CkjIrqKKAObj8f+FGeaKfXLSxnhfZJBqJNnKp2hh+7mCtghgQcYNSf8J14TbiLxJpU8h4WG3u0lkkPZURCWdj0CqCSeACa3JoIblAk8UcqB1cK6hgGVgynnuGAIPYgGpKAObn8badDbyypp/iCd0QssUehXgZyB90bogMnpyQPUig634kubhIrLwjJCmxmkl1TUIYVBBGFXyfOJJyTyFA29TmukooA5dNL8Y3kVqL/xLY2WMPcLpWm4cnaRsWSZ5F27iDnywTt7ZqSbwTpmoIBrFxqWrEuryC7vZBFKVYFd0CFYSBheNmDjJySSekooAz9M0LR9E83+ydKsbDzseZ9kt0i34zjO0DOMnr6mtCiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//9k=';

  return (
    <div>
      <Wrap>
        {visibleModal && (
          <WriteModal
            setVisibleModal={setVisibleModal}
            onChange={onChangeUrl}
          />
        )}
        <Menu minWidth='60rem' />

        <WrapDiary>
          <WrapTop>
            <DateForm>
              {year}년 {month}월 {day}일 {dayOfWeek}요일
              <WrapWeather>
                <RadioLabel
                  backgroundImage={Sunny}
                  backgroundChecked={SunnyGrey}
                >
                  <Weather
                    type='radio'
                    name='weather'
                    value='sun'
                    onClick={onClickWeather}
                  />
                  <LabelImage />
                </RadioLabel>

                <RadioLabel backgroundImage={Rain} backgroundChecked={RainGrey}>
                  <Weather
                    type='radio'
                    name='weather'
                    value='rain'
                    onClick={onClickWeather}
                  />
                  <LabelImage />
                </RadioLabel>

                <RadioLabel
                  backgroundImage={Cloudy}
                  backgroundChecked={CloudyGrey}
                >
                  <Weather
                    type='radio'
                    name='weather'
                    value='cloudy'
                    onClick={onClickWeather}
                  />
                  <LabelImage />
                </RadioLabel>

                <RadioLabel backgroundImage={Wind} backgroundChecked={WindGrey}>
                  <Weather
                    type='radio'
                    name='weather'
                    value='wind'
                    onClick={onClickWeather}
                  />
                  <LabelImage />
                </RadioLabel>

                <RadioLabel backgroundImage={Snow} backgroundChecked={SnowGrey}>
                  <Weather
                    type='radio'
                    name='weather'
                    value='snow'
                    onClick={onClickWeather}
                  />
                  <LabelImage />
                </RadioLabel>
              </WrapWeather>
            </DateForm>
          </WrapTop>
          <WrapTitle>
            <WrapTitleContents>
              <Title>제목 : </Title>
              <Input
                width='28rem'
                height='3rem'
                border='none'
                fontSize='1.3rem'
                onChange={onChangeTitle}
                maxLength='24'
                placeholder='24자내의 제목을 작성해주세요'
              />
            </WrapTitleContents>
          </WrapTitle>
          <DrawDiary id='imageId'>
            <WrapPlus
              id='plus'
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setVisibleModal(true);
              }}
            />
            <WrapShare>
              <ShareButton
                onClick={() => {
                  setVisibleShare(!visibleShare);
                }}
              />
              {visibleShare && (
                <WrapSNS>
                  <SNSButton
                    backgroundImage={Instargram}
                    backgroundChecked={InstargramGrey}
                    onClick={onClickInsta}
                  />
                  <SNSButton
                    backgroundImage={Twitter}
                    backgroundChecked={TwitterGrey}
                    onClick={onClickTwitter}
                  />
                  <SNSButton
                    backgroundImage={Kakaotalk}
                    backgroundChecked={KakaotalkGrey}
                    onClick={onClickKakao}
                  />
                </WrapSNS>
              )}
            </WrapShare>
          </DrawDiary>

          <WriteDiary onChange={onChangeText} />

          <WrapKeywordButton>
            <Button
              width='7rem'
              height='2.7rem'
              name='키워드 추출'
              color='rgba(138, 80, 255, 0.6)'
              border='2px solid rgba(138, 80, 255, 0.6)'
              borderRadius='10rem'
              backgroundColor='white'
              hoverBackgroundColor='rgba(138, 80, 255, 0.6)'
              hoverColor='white'
              onClick={onClickKeyword}
            />
            <Button
              width='7rem'
              height='2.7rem'
              name='일기 저장'
              margin='0rem 0rem 0rem 2rem'
              color='rgba(138, 80, 255, 0.6)'
              border='2px solid rgba(138, 80, 255, 0.6)'
              borderRadius='10rem'
              backgroundColor='white'
              hoverBackgroundColor='rgba(138, 80, 255, 0.6)'
              hoverColor='white'
              onClick={onClickSave}
            />
          </WrapKeywordButton>
        </WrapDiary>
        {/* <img
          src={`data:image/jpeg;base64,${data}`}
          style={{ width: '4rem', height: '4rem', backgroundSize: '4rem' }}
        /> */}
      </Wrap>
    </div>
  );
}

export default Write;
