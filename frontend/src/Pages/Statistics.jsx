import React, { useCallback, useState, PureComponent } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  // 모든 차트를 사용할 때 필요
  ResponsiveContainer,
} from 'recharts';

const EMOTIONS = [
  { emotion: '기쁨', value: 10 },
  { emotion: '슬픔', value: 8 },
  { emotion: '당황', value: 4 },
  { emotion: '불안', value: 9 },
  { emotion: '분노', value: 7 },
  { emotion: '상처', value: 2 },
];

const DATES = [
  { date: 'Mon', count: 9 },
  { date: 'Tue', count: 5 },
  { date: 'Wed', count: 4 },
  { date: 'Thu', count: 3 },
  { date: 'Fri', count: 6 },
  { date: 'Sat', count: 1 },
  { date: 'Sun', count: 11 },
];

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
  const navigate = new useNavigate();
  const NavigateToStatistics = () => {
    navigate(`/MyPage`);
  };
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
              <BarChart
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
                <Bar dataKey='count' stroke='#8884d8e3' fill='#8884d8a0' />
              </BarChart>
            </ResponsiveContainer>
          </WrapChart>
        </WrapContent>
      </Wrap>
    </div>
  );
}

export default Statics;
