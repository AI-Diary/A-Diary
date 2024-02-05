// import React, { useState, useEffect, useRef } from 'react';
import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Lottie from 'lottie-react';
import axios from 'axios';
import Menu from '../Components/Menu';
import Button from '../Components/Button';
import Input from '../Components/Input';
import TextArea from '../Components/TextArea';
import ShareComponent from '../Components/ShareComponent';
import moment from 'moment';
import AWS from 'aws-sdk';
import { Buffer } from 'buffer';
import Sunny from '../Images/sunny_default.png';
import Cloudy from '../Images/cloudy_default.png';
import Rain from '../Images/rain_default.png';
import Snow from '../Images/snow_default.png';
import Wind from '../Images/wind_default.png';
import SunnyGrey from '../Images/sunny_grey.png';
import CloudyGrey from '../Images/cloudy_grey.png';
import RainGrey from '../Images/rain_grey.png';
import SnowGrey from '../Images/snow_grey.png';
import WindGrey from '../Images/wind_grey.png';
import Plus from '../Images/drawplus_256.png';
import Loading from '../Images/Loading.json';
import WriteModal from './WriteModal';

const Wrap = styled.div`
  /* box-sizing: border-box; */
  /* position: fixed; */
  width: 100vw;
  height: 80rem;
  min-width: 60rem;
  /* border: 0.1px solid transparent; */
  /* padding-bottom: 4rem; */
  /* overflow: scroll; */
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
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
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
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
  }
  [type='radio']:checked + img {
    background-image: url(${(props) => props.backgroundChecked});
    border: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
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

const LoadingBackground = styled.div`
  position: absolute;
  width: 40rem;
  height: 25rem;
  background-color: rgba(256, 256, 256, 0.7);
  z-index: 10;
`;

const WrapLoading = styled.div`
  width: 22rem;
  height: 22rem;
  margin: 0 auto;
`;

const Diary = styled.div`
  position: absolute;
  width: 40rem;
  height: 25rem;
  background-color: transparent;
  background-size: 40rem 25rem;
  /* border: 2px solid black; */
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
  cursor: pointer;
  &:hover {
    transform: scale(1.2);
  }
`;

const WrapKeywordButton = styled.div`
  width: fit-content;
  height: fit-content;
  margin: 2rem auto 0rem auto;

  /* border: 2px solid black; */
`;

const Emotion = styled.div`
  position: absolute;
  width: 2.5rem;
  height: 1.3rem;
  font-size: 1.3rem;
  /* border: 1px solid red; */
  margin-top: 0.8rem;
  margin-left: 31rem;
`;

function Write() {
  // Main에서 가져온 정보
  const { state } = useLocation();
  const navigate = useNavigate();

  // console.log(state.userid);

  // 날씨 저장
  const [weather, setWeather] = useState('');

  // 제목 저장
  const [title, setTitle] = useState('');

  // 일기글 저장
  const [write, setWrite] = useState('');

  // 감정 저장
  const [emotion, setEmotion] = useState('');

  // 키워드 받아온 거 저장
  const [keyword, setKeyword] = useState([]);

  // WriteModal 보이기
  const [visibleModal, setVisibleModal] = useState(false);

  // WriteModal에서 받아온 Uri 저장
  const [jpgUrl, setJpgUrl] = useState('');

  const [getAipic, setGetAipic] = useState('');

  const [loading, setLoading] = useState(false);

  const diaryRef = useRef(null);

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

  // 일기 저장 눌렀을 때
  const onClickSave = () => {
    if (weather.length === 0) {
      alert('날씨를 선택해주세요 🫠');
    } else if (title.length === 0) {
      alert('제목을 작성해주세요 🫠');
    } else if (emotion.length === 0) {
      alert('키워드 추출을 눌러주세요 🫠');
    } else {
      AWS.config.update({
        accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
        secretAccessKey: process.env.REACT_APP_SECRET_ACCEESS_KEY,
        region: process.env.REACT_APP_REGION,
      });

      // const getBackgroundImageUrl = () => {
      //   if (diaryRef.current) {
      //     const backgroundImage = window.getComputedStyle(
      //       diaryRef.current
      //     ).backgroundImage;
      //     console.log(backgroundImage);

      //     return backgroundImage;
      //   }
      // };
      const s3 = new AWS.S3();
      let base64Image = window
        .getComputedStyle(diaryRef.current)
        .backgroundImage.replace('url("data:image/png;base64,', '');
      base64Image = base64Image.replace('")', '');
      // console.log('base64Image : ', base64Image);

      const params = {
        Bucket: 'a-diary/a-diary',
        Key: localStorage.userid + date + '.png',
        Body: Buffer.from(String(base64Image), 'base64'),
        ACL: 'public-read',
        ContentEncoding: 'base64',
        ContentType: 'image/png',
      };

      s3.upload(params, (err, data) => {
        if (err) console.log('S3 업로드 중 에러 발생 : ', err);
        else {
          // console.log('S3 업로드 완료');
          // console.log('업로드 된 이미지의 공개 URL : ', data.Location);
        }
      });
      axios
        .post(`http://127.0.0.1:5000/write`, {
          userid: localStorage.userid,
          date: date,
          weather: weather,
          title: title,
          diary: write,
          emotion: emotion,
          day: dayOfWeek,
        })
        .then((res) => {
          console.log(res);
          alert('일기 저장에 성공했습니다 :)');
          navigate(`/Main`);
        })
        .catch((err) => {
          console.log(err);
          alert('일기 저장에 실패했습니다 :(');
        });
    }
  };

  // 키워드 추출 눌렀을 때
  const onClickKeyword = () => {
    if (write.length === 0) {
      alert('일기를 적어주세요 🫠');
    } else {
      axios
        .post(`http://127.0.0.1:5001/keyword`, { text: write })
        .then((res) => {
          console.log(res);

          alert('키워드 추출에 성공했습니다 :)');
          setKeyword(res.data.word);
          setEmotion(res.data.emotion);
          document.getElementById('emotion').innerText = res.data.emotion;
        })
        .catch((err) => {
          console.log(err);
          alert('키워드 추출에 실패했습니다 :(');
        });
    }
  };

  // 키워드 합쳐서 AI 그림 그리는 기능
  const onClickSendKeywords = () => {
    const koreakeywords = keyword.map((key) => key.korea);
    let data = '';
    for (let i = 0; i < koreakeywords.length; i++) {
      if (i === koreakeywords.length - 1) {
        data += koreakeywords[i];
        break;
      }
      data += koreakeywords[i] + ', ';
    }

    console.log(data);
    setLoading(true);
    axios
      .post(`http://127.0.0.1:5001/aipic`, { data: [data] })
      .then((res) => {
        const aipic = res.data.data;
        setGetAipic(aipic);
        setLoading(false);
        document.getElementById(
          'diary'
        ).style.backgroundImage = `url(data:image/png;base64,${res.data.data})`;
      })
      .catch((err) => {
        setLoading(false);
        alert('그림 생성에 실패했습니다.');
      });
  };

  // WriteModal 닫혔을 때
  const onChangeUrl = (url) => {
    setJpgUrl(url);
    document.getElementById('diary').style.backgroundImage = `url(${url})`;
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
  return (
    <div>
      <Wrap>
        {visibleModal && (
          <WriteModal
            setVisibleModal={setVisibleModal}
            onChange={onChangeUrl}
            keyword={keyword}
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
                    value='Sunny'
                    onClick={onClickWeather}
                  />
                  <LabelImage />
                </RadioLabel>

                <RadioLabel backgroundImage={Rain} backgroundChecked={RainGrey}>
                  <Weather
                    type='radio'
                    name='weather'
                    value='Rain'
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
                    value='Cloudy'
                    onClick={onClickWeather}
                  />
                  <LabelImage />
                </RadioLabel>

                <RadioLabel backgroundImage={Wind} backgroundChecked={WindGrey}>
                  <Weather
                    type='radio'
                    name='weather'
                    value='Wind'
                    onClick={onClickWeather}
                  />
                  <LabelImage />
                </RadioLabel>

                <RadioLabel backgroundImage={Snow} backgroundChecked={SnowGrey}>
                  <Weather
                    type='radio'
                    name='weather'
                    value='Snow'
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
              <Emotion id='emotion' />
            </WrapTitleContents>
          </WrapTitle>
          <DrawDiary>
            <Diary id='diary' ref={diaryRef}></Diary>
            {loading ? (
              <LoadingBackground>
                <WrapLoading>
                  <Lottie animationData={Loading}></Lottie>
                </WrapLoading>
              </LoadingBackground>
            ) : (
              <div></div>
            )}
            <WrapPlus
              id='plus'
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setVisibleModal(true);
              }}
            />
            <ShareComponent />
          </DrawDiary>

          <TextArea onChange={onChangeText} />

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
            <Button
              width='7rem'
              height='2.7rem'
              name='그림 그리기'
              margin='0rem 0rem 0rem 2rem'
              color='rgba(138, 80, 255, 0.6)'
              border='2px solid rgba(138, 80, 255, 0.6)'
              borderRadius='10rem'
              backgroundColor='white'
              hoverBackgroundColor='rgba(138, 80, 255, 0.6)'
              hoverColor='white'
              onClick={onClickSendKeywords}
            />
          </WrapKeywordButton>
        </WrapDiary>
      </Wrap>
    </div>
  );
}

export default Write;
