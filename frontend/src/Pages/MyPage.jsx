import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Menu from '../Components/Menu';
import Button from '../Components/Button';

const Wrap = styled.div`
  width: 100vw;
  height: 100vh;
  min-width: 60rem;
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
`;
const DiaryImage = styled.img`
  width: 20rem;
  height: 13rem;
  background-color: white;
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
  const navigate = new useNavigate();
  const NavigateToStatistics = () => {
    navigate(`/Statistics`);
  };
  return (
    <div>
      <Wrap>
        <Menu />

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
            <WrapDiary>
              <DiaryImage />
              <Date>2022.02.22</Date>
              <Title>오늘은 롯데월드에 갔다</Title>
            </WrapDiary>

            <WrapDiary>
              <DiaryImage />
              <Date>2022.02.23</Date>
              <Title>좀 있으면 개강한대</Title>
            </WrapDiary>

            <WrapDiary>
              <DiaryImage />
              <Date>2022.02.24</Date>
              <Title>너무 슬프다</Title>
            </WrapDiary>

            <WrapDiary>
              <DiaryImage />
              <Date>2022.02.25</Date>
              <Title>우헤헤</Title>
            </WrapDiary>

            <WrapDiary>
              <DiaryImage />
              <Date>2022.02.26</Date>
              <Title>긱사가기 귀찮아아</Title>
            </WrapDiary>

            <WrapDiary>
              <DiaryImage />
              <Date>2022.02.27</Date>
              <Title>이게 진짜 일리 없어</Title>
            </WrapDiary>

            <WrapDiary>
              <DiaryImage />
              <Date>2022.02.28</Date>
              <Title>눈물도 나지 않는게</Title>
            </WrapDiary>

            <WrapDiary>
              <DiaryImage />
              <Date>2022.03.01</Date>
              <Title>오늘은 노는 날~</Title>
            </WrapDiary>

            <WrapDiary>
              <DiaryImage />
              <Date>2022.03.02</Date>
              <Title>오늘은 개강날ㅠㅠ</Title>
            </WrapDiary>
          </List>
        </WrapList>
      </Wrap>
    </div>
  );
}

export default MyPage;
