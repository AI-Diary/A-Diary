import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Button from '../Components/Button';
import TextArea from '../Components/TextArea';
import Menu from '../Components/Menu';

const Wrap = styled.div`
  position: absolute;
  width: 100vw;
  height: 80rem;
  min-width: 60rem;
  border: 0.1px solid transparent;
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
  display: flex;
  box-sizing: border-box;
  width: 40rem;
  height: 4rem;
  padding: 1.1rem 3rem;
  margin-bottom: 1rem;
  border: 1.8px solid grey;
  border-radius: 1.2rem;
  background-color: rgba(256, 256, 256, 0.8);
`;

const DateForm = styled.div`
  width: fit-content;
  margin-right: 2rem;
  word-spacing: 0.8rem;
  font-size: 1.3rem;
`;

const Weather = styled.div`
  height: 1.3rem;

  font-size: 1.3rem;
`;

const Emotion = styled.div`
  width: fit-content;
  height: 1.3rem;
  margin-left: auto;
  font-size: 1.3rem;
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
  width: fit-content;
  height: fit-content;
  margin: 0.4rem auto 0rem auto;
  display: flex;
`;

const Title = styled.div`
  width: fit-content;
  height: fit-content;
  margin-top: 0.75rem;
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
  border: 1.8px solid grey;
  background-size: 40rem 25rem;
`;

const Diary = styled.div`
  position: absolute;
  width: 40rem;
  height: 25rem;
  background-color: transparent;
  background-image: ${({ Image }) => `url(${Image})`};
  background-size: 40rem 25rem;
`;

const WrapDelete = styled.div`
  width: fit-content;
  height: fit-content;
  margin: 2rem auto 0rem auto;
`;

function ShowDiary() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const info = state.info.split('`');
  console.log('info: ', info);

  const date = info[0].split('-');
  const year = date[0];
  const month = date[1];
  const day = date[2];
  const diarynum = info[7];

  let weather = '';

  switch (info[6]) {
    case 'Sunny':
      weather = '맑음';
      break;
    case 'Rain':
      weather = '비';
      break;
    case 'Wind':
      weather = '바람';
      break;
    case 'Snow':
      weather = '눈';
      break;
    default:
      break;
  }

  const onClickDelete = () => {
    const check = window.confirm('일기를 삭제하시겠습니까?');
    if (check) {
      console.log('삭제');
      console.log('diarynum : ', diarynum);
      axios
        .post(`http://127.0.0.1:5000/delete`, { diarynum: diarynum })
        .then((res) => {
          // const S3 = new AWS.S3();

          // const params = {
          //   Bucket: 'a-diary/a-diary',
          //   Key: info[3],
          // };

          // S3.deleteObject(params, (err, data) => {
          //   if (err) console.error(err);
          //   else console.log('Object deleted successfully');
          // });
          alert('삭제 완료 되었습니다.');
          navigate(-1);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div>
      <Wrap>
        <Menu minWidth='60rem' />
        <WrapDiary>
          <WrapTop>
            <DateForm>
              {year} {month} {day} {info[1]}요일
            </DateForm>
            <Weather>{weather}</Weather>
            <Emotion>{info[4]}</Emotion>
          </WrapTop>

          <WrapTitle>
            <WrapTitleContents>
              <Title>{info[5]}</Title>
            </WrapTitleContents>
          </WrapTitle>
          <DrawDiary>
            <Diary Image={info[3]} />
          </DrawDiary>
          <TextArea content={info[2]} readOnly />
          <WrapDelete>
            <Button
              width='7rem'
              height='2.7rem'
              name='일기 삭제'
              color='rgba(138, 80, 255, 0.6)'
              marginTop='2rem'
              border='2px solid rgba(138, 80, 255, 0.6)'
              borderRadius='10rem'
              backgroundColor='white'
              hoverBackgroundColor='rgba(138, 80, 255, 0.6)'
              hoverColor='white'
              onClick={onClickDelete}
            />
          </WrapDelete>
        </WrapDiary>
      </Wrap>
    </div>
  );
}

export default ShowDiary;
