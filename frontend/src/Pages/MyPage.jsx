import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AWS from 'aws-sdk';
import { Buffer } from 'buffer';
import axios from 'axios';
// import ShowDiary from './ShowDiary.jsx';
import styled from 'styled-components';
import Menu from '../Components/Menu';
import Button from '../Components/Button';

const Wrap = styled.div`
  width: 100vw;
  height: 100vh;
  min-width: 80rem;
  min-height: calc(100vh - 4rem);
  /* border: 0.1px solid transparent; */
  /* padding-bottom: 4rem; */
  font-family: 'NanumGothic';
  overflow-x: none;
  background: linear-gradient(
    to bottom,
    rgba(51, 153, 255),
    rgba(178, 102, 255)
  );
`;
const WrapList = styled.div`
  /* border: 2px solid black; */
  width: 78.5rem;
  height: calc(100vh - 5.2rem);
  margin: auto;
  /* display: inline; */
`;
const List = styled.div`
  /* border: 2px solid red; */
  /* width: 78.5rem;
  height: calc(100vh - 11.3rem); */
  width: 100%;
  height: calc(100% - 6.4rem);
  /* margin: auto; */
  /* padding: 2rem 0rem 2rem 0rem; */
  display: grid;

  grid-template-columns: repeat(3, 23rem);
  overflow: auto;
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
    background: white;
    border-radius: 10px;
  }
`;
const WrapDiary = styled.div`
  width: fit-content;
  height: fit-content;
  margin-bottom: 2rem;
  padding: 1.5rem;
  /* border: 2px solid red; */
  /* border: 0.1px solid transparent; */
  border-radius: 1rem;
  background-color: rgba(256, 256, 256, 0.7);
  box-shadow: 0.4rem 0.4rem 1rem rgba(120, 120, 120, 0.3);
`;
const DiaryImage = styled.div`
  width: 20rem;
  height: 13rem;
  background-color: white;
  background-size: 20rem 13rem;
  background-image: ${({ Image }) => `url(${Image})`};
  /* background-image: url('https://a-diary.s3.ap-northeast-2.amazonaws.com/a-diary/32023%2C06%2C15.png'); */
  border-radius: 1rem;
`;
const Date = styled.div`
  margin-top: 0.5rem;
  margin-bottom: 0.3rem;
  font-size: 0.85rem;
  font-family: 'NanumGothic';
`;
const Title = styled.div`
  font-family: 'NanumGothic';
`;

function MyPage() {
  const [diarys, getDiarys] = useState([]);
  const [show, setShow] = useState(false);
  const [keys, setKeys] = useState([]);
  const navigate = useNavigate();
  // const { state } = useLocation();
  // console.log(state);

  useEffect(() => {
    // console.log('localStorage : ', localStorage.userid);
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
    // console.log(e.currentTarget.id);
    // setShow(true);
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
    console.log(link);
    diary['img'] = link;
  });

  console.log(diarys);

  return (
    <div>
      <Wrap>
        <Menu minWidth='80rem' />

        <WrapList>
          <Button
            // width='5rem'
            // height='2.3rem'
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
            // hoverBorder='2px solid rgba(51, 153, 255)'
            onClick={NavigateToStatistics}
            float='right'
          />
          <List>
            {diarys.map((diary, index) => {
              const getDate = diary.date.split('-');

              const date =
                getDate[0] + '년 ' + getDate[1] + '월 ' + getDate[2] + '일';

              return (
                <WrapDiary
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
                >
                  <DiaryImage Image={diary.img} />
                  {/* <div>{diary.img}</div> */}
                  <Date>{date}</Date>
                  <Title>{diary.title}</Title>
                </WrapDiary>
              );
            })}
          </List>
        </WrapList>
      </Wrap>
    </div>
  );
}

export default MyPage;
