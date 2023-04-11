import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import moment from 'moment';
// import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';
import Menu from '../Components/Menu';
import Button from '../Components/Button';

// import Input from '../Components/Input';

const Wrap = styled.div`
  width: 100vw;
  height: fit-content;
  min-width: 60rem;
  min-height: calc(100vh - 4rem);
  /* border: 0.1px solid transparent; */
  padding-bottom: 4rem;
  font-family: 'NanumGothic';
  overflow-x: none;
  background: linear-gradient(
    to bottom,
    rgba(51, 153, 255),
    rgba(178, 102, 255)
  );
`;

const WrapCalendar = styled.div`
  width: fit-content;
  height: fit-content;
  margin: 3rem auto 0rem auto;
`;
const CustomCalendar = styled.div`
  width: 50rem;
  height: fit-content;
  /* margin: 9rem auto 0rem auto; */
  padding: 2rem 3rem 3rem 3rem;
  border-radius: 1rem;
  text-align: center;
  font-family: 'NanumGothic';
  background-color: rgba(256, 256, 256, 0.5);

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
    cursor: pointer;
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
    border-radius: 1rem;
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
    display: inline-block;
    height: 6rem;
    max-width: initial !important;
    padding: 0.5rem;
    line-height: 50%;
    /* padding-bottom: 4rem; */
    background-color: rgba(256, 256, 256, 0.3);
    border-color: rgba(256, 256, 256);
    border-radius: 0.5rem;
    border-style: none solid solid none;
    font-size: 1.2rem;
    text-align: left;
    cursor: pointer;
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
    background-color: rgba(114, 92, 255, 0.3);
    border-color: #6f48eb8c;
    border-style: none solid solid none;
    vertical-align: top;
    /* color: #6f48eb; */
  }
  .react-calendar__month-view__days__day--neighboringMonth {
    opacity: 0.5;
  }
  .react-calendar__month-view__days__day--weekend {
    color: #6f48eb;
  }
`;

function Main() {
  // console.log('--------------- Main ---------------');

  const [value, onChange] = useState(new Date());
  const navigate = useNavigate();

  // 선택한 날짜로 글쓰기 페이지 이동
  const NavigateToWrite = (date) => {
    const show = false;
    navigate(`/Write`, { state: { date, show } });
  };

  return (
    <div>
      <Wrap>
        <Menu minWidth='60rem' />

        <WrapCalendar>
          <CustomCalendar>
            <Calendar
              onChange={onChange}
              value={value}
              calendarType='US'
              formatDay={(locale, date) => moment(date).format('DD')}
              // onClickDay={NavigateToWrite}
              onClickDay={(value, e) => {
                const momentDate = moment(value).format().slice(0, 10);
                NavigateToWrite(momentDate);
              }}
            />
          </CustomCalendar>
        </WrapCalendar>
      </Wrap>
    </div>
  );
}

export default Main;
