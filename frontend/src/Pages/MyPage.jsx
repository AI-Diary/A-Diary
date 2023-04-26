import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import ShowDiary from './ShowDiary.jsx';
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
const DiaryImage = styled.img`
  width: 20rem;
  height: 13rem;
  background-color: white;
  background-image: url(${(props) => props.backgroundImage});
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
  const { state } = useLocation();
  console.log(state);

  useEffect(() => {
    axios
      .post(`http://127.0.0.1:5000/mypage`, { userid: 1 })
      .then((res) => {
        console.log(res.data);
        getDiarys(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onClickDiary = () => {
    setShow(true);
  };
  const navigate = new useNavigate();
  const NavigateToStatistics = () => {
    navigate(`/Statistics`);
  };
  console.log('diary확인', diarys);
  let i = 0;
  for (i = 0; i < 1; i += 1) {
    console.log(i + ' : ' + diarys);
  }

  // let reader = new FileReader();

  // reader.readAsDataURL(blob);
  // reader.onloadend = () => {
  //   var base64data = reader.result;
  //   console.log(base64data);
  // };
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
            {diarys.map((diary) => {
              {
                /* let reader = new FileReader(); */
              }
              {
                /* var img; */
              }
              console.log(typeof diary.img);
              console.log(diary.img);

              {
                /* reader.readAsDataURL(diary.img);
              reader.onloadend = () => {
                var base64data = reader.result;
                console.log(base64data);
              }; */
              }

              return (
                <WrapDiary onClick={onClickDiary}>
                  <DiaryImage backgroundIamge={diary.img} />
                  {/* <div>{diary.img}</div> */}
                  <Date>{diary.date}</Date>
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
