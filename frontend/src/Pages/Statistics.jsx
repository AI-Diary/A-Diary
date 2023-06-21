import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Menu from '../Components/Menu';
import Button from '../Components/Button';
import {
  // Radar Chart 사용할 때 필요
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  // Bar Chart 사용할 때 필요
  BarChart,
  Bar,
  // Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  // Legend,
  // 모든 차트를 사용할 때 필요
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';

// 지우면 안됨!

// const COLORS = [
//   '#0088feb3', // 슬픔
//   '#00c49fb3', // 기쁨
//   '#ffbb28b3', // 당황
//   '#ff8042b3', // 불안
//   '#b9002bb3', // 분노
//   '#5321a9b3', // 상처
// ];

// const RADIAN = Math.PI / 180;
// const renderCustomizedLabel = ({
//   cx,
//   cy,
//   midAngle,
//   innerRadius,
//   outerRadius,
//   percent,
//   index,
// }) => {
//   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//   const x = cx + radius * Math.cos(-midAngle * RADIAN);
//   const y = cy + radius * Math.sin(-midAngle * RADIAN);
//   return (
//     <text
//       x={x}
//       y={y}
//       fill='white'
//       textAnchor={x > cx ? 'start' : 'end'}
//       dominantBaseline='central'
//     >
//       {`${(percent * 100).toFixed(0)}%`}
//     </text>
//   );
// };

const Wrap = styled.div`
  /* position: absolute; */
  width: 100vw;
  height: fit-content;
  min-width: 60rem;
  /* border: 0.1px solid transparent; */
  overflow-x: hidden;
  /* padding-bottom: 4rem; */
  background: linear-gradient(
    to bottom,
    rgba(51, 153, 255),
    rgba(178, 102, 255)
  );
`;

const WrapContent = styled.div`
  width: 40rem;
  height: 27rem;
  margin: 6rem auto;
`;

const Title = styled.div`
  /* border: 2px solid black; */
  width: fit-content;
  height: fit-content;
  /* font-family: 'LogoFont'; */
  font-family: 'NanumGothic';
  font-size: 2rem;
  color: white;
`;

const WrapChart = styled.div`
  box-sizing: border-box;
  display: flex;
  width: 40rem;
  height: 25rem;
  background-color: rgba(256, 256, 256, 0.85);
  border-radius: 3rem;
  margin: 1rem auto;
  padding: 2.3rem 2rem 2rem 2rem;
  box-shadow: 0.4rem 0.4rem 1rem rgba(120, 120, 120, 0.3);
`;

function Statics() {
  let EMOTIONS = [
    { emotion: '기쁨', value: 0 },
    { emotion: '슬픔', value: 0 },
    { emotion: '당황', value: 0 },
    { emotion: '불안', value: 0 },
    { emotion: '분노', value: 0 },
    { emotion: '상처', value: 0 },
    { emotion: '중립', value: 0 },
  ];

  let DATES = [
    { date: 'Mon', count: 0 },
    { date: 'Tue', count: 0 },
    { date: 'Wed', count: 0 },
    { date: 'Thu', count: 0 },
    { date: 'Fri', count: 0 },
    { date: 'Sat', count: 0 },
    { date: 'Sun', count: 0 },
  ];
  const navigate = new useNavigate();
  const NavigateToStatistics = () => {
    navigate(`/MyPage`);
  };
  const [emotions, setEmotions] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [days, setDays] = useState([0, 0, 0, 0, 0, 0, 0]);

  useEffect(() => {
    //e.preventDefault();
    axios
      .post(`http://127.0.0.1:5000/cal`, { userid: localStorage.userid })
      .then((res) => {
        console.log(res.data[0].date);
        console.log(res.data[0].mood);
        setDays(res.data[0].date);
        setEmotions(res.data[0].mood);
        //window.location.replace(`/Statistics`);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // console.log('days : ', days);
  // console.log('emotions : ', emotions);
  //console.log('emotions : ', emotions[1]);

  for (let i = 0; i < 7; i++) {
    EMOTIONS[i].value = emotions[i];
    DATES[i].count = days[i];
  }
  console.log('DATES : ', DATES);

  return (
    <div>
      <Wrap>
        <Menu minWidth='60rem' />
        <Button
          // width='5rem'
          // height='2.3rem'
          width='7rem'
          height='2.7rem'
          name='일기 확인'
          color='white'
          margin='1.5rem 3.5rem 1.5rem 0rem'
          border='2px solid white'
          borderRadius='10rem'
          backgroundColor='transparent;'
          hoverBackgroundColor='rgba(256,256,256)'
          hoverColor='rgba(51, 153, 255)'
          // hoverBorder='2px solid rgba(51, 153, 255)'
          onClick={NavigateToStatistics}
          float='right'
        />
        <WrapContent>
          <Title>감정 통계</Title>
          <WrapChart>
            <ResponsiveContainer width='100%' height='100%'>
              <RadarChart cx='50%' cy='50%' outerRadius='90%' data={EMOTIONS}>
                <PolarGrid />
                <PolarAngleAxis
                  dataKey='emotion'
                  margin={{
                    top: 20,
                  }}
                />
                <PolarRadiusAxis angle={30} />
                <Radar
                  name='emotion'
                  dataKey='value'
                  stroke='rgba(51, 153, 255, 0.8)'
                  fill='rgba(51, 153, 255, 0.8)'
                  // stroke='#8884d8'
                  // fill='#8884d8'
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ResponsiveContainer>
          </WrapChart>
        </WrapContent>

        <WrapContent>
          <Title>요일 통계</Title>
          <WrapChart>
            <ResponsiveContainer width='100%' height='100%'>
              <AreaChart
                width={500}
                height={300}
                data={DATES}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='date' />
                <YAxis />
                <Tooltip />
                <Area
                  dataKey='count'
                  stroke='rgb(136, 132, 216)'
                  fill='rgb(136, 132, 216, 0.63)'
                />
              </AreaChart>
            </ResponsiveContainer>
          </WrapChart>
        </WrapContent>
      </Wrap>
    </div>
  );
}

export default Statics;
