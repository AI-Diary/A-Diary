import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AWS from 'aws-sdk';
import { Buffer } from 'buffer';
import axios from 'axios';
// import ShowDiary from './ShowDiary.jsx';
import DiaryCard from '../Components/DiaryCard';
import styled from 'styled-components';
import Menu from '../Components/Menu';
import Button from '../Components/Button';

const Wrap = styled.div`
  width: 100vw;
  height: 100vh;
  min-width: 80rem;
  min-height: calc(100vh - 4rem);
  font-family: 'NanumGothic';
  overflow-x: none;
  background: linear-gradient(
    to bottom,
    rgba(51, 153, 255),
    rgba(178, 102, 255)
  );
`;

const WrapList = styled.div`
  width: 78.5rem;
  height: calc(100vh - 5.1rem);
  margin: auto;
`;

const List = styled.div`
  display: grid;
  width: 100%;
  height: calc(100% - 6.4rem);

  grid-template-columns: repeat(3, 23rem);
  overflow-y: auto;
  overflow-x: hidden;
  grid-column-gap: 4rem;
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.7);
    border-radius: 10px;
  }
`;

function MyPage() {
  const [diarys, getDiarys] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .post(`http://127.0.0.1:5000/mypage`, { userid: localStorage.userid })
      .then((res) => {
        console.log(res.data);
        getDiarys(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onClickDiary = (e) => {
    console.log('id', e.currentTarget.id);
    navigate(`/ShowDiary`, { state: { info: e.currentTarget.id } });
  };

  const NavigateToStatistics = () => {
    navigate(`/Statistics`);
  };

  diarys.map((diary) => {
    const DATE = diary.date.split('-');
    const link =
      'https://a-diary.s3.ap-northeast-2.amazonaws.com/a-diary/' +
      localStorage.userid +
      DATE[0] +
      '%2C' +
      DATE[1] +
      '%2C' +
      DATE[2] +
      '.png';
    // console.log(link);
    diary['img'] = link;
    diary['date'] = DATE[0] + '년 ' + DATE[1] + '월 ' + DATE[2] + '일';
  });

  // console.log('diarys:', diarys);

  return (
    <div>
      <Wrap>
        <Menu minWidth='80rem' />

        <WrapList>
          <Button
            width='7rem'
            height='2.7rem'
            name='일기 통계'
            color='white'
            margin='1.5rem 0rem'
            border='2px solid white'
            borderRadius='10rem'
            backgroundColor='transparent;'
            hoverBackgroundColor='rgba(256,256,256)'
            hoverColor='rgba(51, 153, 255)'
            onClick={NavigateToStatistics}
            float='right'
          />
          <List>
            {diarys.map((diary, index) => {
              return (
                <DiaryCard
                  diary={diary}
                  onClick={onClickDiary}
                  key={index}
                  id={
                    diary.date +
                    '`' +
                    diary.day +
                    '`' +
                    diary.diary +
                    '`' +
                    diary.img +
                    '`' +
                    diary.mood +
                    '`' +
                    diary.title +
                    '`' +
                    diary.weather +
                    '`' +
                    diary.diarynum
                  }
                />
              );
            })}
          </List>
        </WrapList>
      </Wrap>
    </div>
  );
}

export default MyPage;
