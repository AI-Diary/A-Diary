import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import moment from 'moment';
import 'react-calendar/dist/Calendar.css';
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
  width: fit-content;
  height: 30rem;
  margin: 10rem auto 0rem auto;
  /* border: 1px solid green; */
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
  const [value, onChange] = useState(new Date());
  return (
    <div>
      <Wrap>
        <WrapButtons>
          <Button
            width='7rem'
            height='2.5rem'
            // margin='4rem 1rem'
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
          />
        </WrapButtons>
        <WrapCalendar>
          <Calendar onChange={onChange} value={value} calendarType='US' />
        </WrapCalendar>
        <ToDay>{moment(value).format('YYYY년 MM일 DD일')}</ToDay>
      </Wrap>
    </div>
  );
}

export default Main;
