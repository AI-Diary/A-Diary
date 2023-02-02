import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import moment from 'moment';
// import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';
import Button from '../Components/Button';
// import Input from '../Components/Input';

const Wrap = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
    to bottom,
    rgba(51, 153, 255),
    rgba(178, 102, 255)
  );
`;

const WrapButtons = styled.div`
  width: fit-content;
  height: fit-content;
  float: right;
`;

const WrapCalendar = styled.div`
  width: 50rem;
  height: fit-content;
  margin: 10rem auto 0rem auto;
  padding: 2rem 3rem 3rem 3rem;
  border-radius: 1rem;
  text-align: center;
  background-color: rgba(256, 256, 256, 0.5);
  /* color: green; */
  .react-calendar__navigation__label {
    font-weight: bold;
    width: 15rem;
  }
  .react-calendar__navigation button {
    // 달력 위에 << < 년도 > >>
    background-color: transparent;
    border: none;
    margin: 1rem 1rem 3rem 1rem;
    font-size: 1.5rem;
  }
  .react-calendar__month_view__weekdays {
    color: white;
  }
  abbr[title] {
    // 일 월 화 수 목 금 토 꾸미기
    text-decoration: none;
    font-size: 1.1rem;
    /* background-color: white; */
    /* border: 1px solid black; */
  }
  /* 버튼 */
  button {
    /* height: 80px; */
    margin: 3px;
    /* background-color: #6f876f; */
    border-radius: 10px;
    color: white;
    font-size: 30px;
    padding: 5px 0;

    &:hover {
      /* background-color: #556b55; */
    }

    &:active {
      /* background-color: #a5c1a5; */
    }
  }

  /* 일자 그리드 스타일 */
  .react-calendar__month-view__days {
    display: grid !important;
    grid-template-columns: 14.3% 14.3% 14.3% 14.3% 14.3% 14.3% 14.3%;

    .react-calendar__tile {
      max-width: initial !important;
    }
  }
  /* .react-calendar__month-view__days {
    display: grid !important;
    grid-template-columns: repeat(7, 1fr);
  } */
  .react-calendar__tile {
    // react-calendar 내의 버튼들
    height: 6rem;
    max-width: initial !important;
    background-color: rgba(256, 256, 256, 0.2);
    border-color: rgba(256, 256, 256);
    border-radius: 0.5rem;
    border-style: none solid solid none;
    font-size: 1.2rem;
  }
  /* .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background: #f8f8fa;
    color: #6f48eb;
    border-radius: 6px;
  } */
  .react-calendar__tile--now {
    /* background: #6f48eb33; */
    /* border-radius: 6px; */
    font-weight: bold;
    /* color: #6f48eb; */
  }
  .react-calendar__month-view__days__day--neighboringMonth {
    opacity: 0.5;
  }
  .react-calendar__month-view__days__day--weekend {
    color: #6f48eb;
  }
`;

const ToDay = styled.div`
  font-size: 2rem;
`;

function Main() {
  const navigate = useNavigate();

  // 통계 페이지 이동
  const TransStatistics = () => {
    navigate(`/Statistics`);
  };

  // 글쓰기 페이지 이동
  const TransWrite = () => {
    navigate(`/Write`);
  };

  // 웰컴 페이지 이동
  const TransDefault = () => {
    navigate('/');
  };
  const [value, onChange] = useState(new Date());
  return (
    <div>
      <Wrap>
        <WrapButtons>
          <Button
            width='7rem'
            height='2.5rem'
            name='일기 쓰기'
            color='white'
            margin='2rem 1rem'
            backgroundColor='transparent'
            onClick={TransWrite}
          />
          <Button
            width='7rem'
            height='2.5rem'
            name='일기 통계'
            color='white'
            backgroundColor='transparent'
            onClick={TransStatistics}
          />
          <Button
            width='7rem'
            height='2.5rem'
            margin='2rem 1rem'
            name='로그아웃'
            color='white'
            backgroundColor='transparent'
            onClick={TransDefault}
          />
        </WrapButtons>
        <WrapCalendar>
          <Calendar
            onChange={onChange}
            value={value}
            calendarType='US'
            formatDay={(locale, date) => moment(date).format('DD')}
          />
        </WrapCalendar>
        <ToDay>{moment(value).format('YYYY년 MM일 DD일')}</ToDay>
      </Wrap>
    </div>
  );
}

export default Main;
