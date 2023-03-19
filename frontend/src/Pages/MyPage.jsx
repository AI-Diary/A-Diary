import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Menu from '../Components/Menu';
import Button from '../Components/Button';

const Wrap = styled.div`
  width: 100vw;
  height: fit-content;
  min-width: 60rem;
  min-height: calc(100vh - 4rem);
  border: 0.1px solid transparent;
  padding-bottom: 4rem;
  font-family: 'NanumGothic';
  overflow-x: none;
  background: linear-gradient(
    to bottom,
    rgba(51, 153, 255),
    rgba(178, 102, 255)
  );
`;
const WrapList = styled.div`
  width: fit-content;
  height: 100vh;
  padding: 2rem 5.5rem 2rem 5.5rem;
  display: grid;
  /* border: 2px solid black; */
  grid-template-columns: repeat(3, 25rem);
  overflow: auto;
  overflow-x: hidden;
  gap: 1rem;
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
  padding: 1.5rem;
  /* border: 2px solid red; */
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
        <Button
          width='5rem'
          height='2.3rem'
          name='일기 통계'
          color='white'
          margin='2rem 1rem'
          border='2px solid white'
          backgroundColor='transparent;'
          onClick={NavigateToStatistics}
        />
        <WrapList>
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
        </WrapList>
      </Wrap>
    </div>
  );
}

export default MyPage;
