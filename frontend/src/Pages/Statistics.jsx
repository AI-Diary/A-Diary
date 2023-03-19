import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import Menu from '../Components/Menu';
import { PieChart, Pie, Cell } from 'recharts';

const Wrap = styled.div`
  /* position: absolute; */
  width: 100vw;
  height: fit-content;
  min-width: 60rem;
  border: 0.1px solid transparent;
  /* padding-bottom: 4rem; */
  background: linear-gradient(
    to bottom,
    rgba(51, 153, 255),
    rgba(178, 102, 255)
  );
`;

const COLORS = [
  '#0088feb3', // 슬픔
  '#00c49fb3', // 기쁨
  '#ffbb28b3', // 당황
  '#ff8042b3', // 불안
  '#b9002bb3', // 분노
  '#5321a9b3', // 상처
];

const WrapChart = styled.div`
  box-sizing: border-box;
  display: flex;
  width: 40rem;
  height: 20rem;
  background-color: rgba(256, 256, 256, 0.7);
  border-radius: 4rem;
  margin: 4rem auto 2rem auto;
  padding: 2rem;
`;
const Chart = styled.div`
  width: 15rem;
  height: 15rem;
  border-radius: 20rem;
  background-color: rgba();
  margin: auto;
`;
const Days1 = styled.div`
  box-sizing: border-box;
  width: 5rem;
  height: 10rem;
  margin: auto auto 2rem auto;
  padding: 0.8rem;
  border-radius: 0.4rem;
  background-color: #0088feb3;
  /* background-color: rgba(0, 136, 254, 0.7); */
  text-align: center;
`;
const Days2 = styled.div`
  box-sizing: border-box;
  width: 5rem;
  height: 8rem;
  margin: auto auto 2rem auto;
  padding: 0.8rem;
  border-radius: 0.4rem;
  background-color: #00c49fb3;
  /* background-color: rgba(0, 196, 159, 0.7); */
  text-align: center;
`;
const Days3 = styled.div`
  box-sizing: border-box;
  width: 5rem;
  height: 7rem;
  margin: auto auto 2rem auto;
  padding: 0.8rem;
  border-radius: 0.4rem;
  background-color: #ffbb28b3;
  /* background-color: rgba(255, 187, 40, 0.7); */

  text-align: center;
`;
const Days4 = styled.div`
  box-sizing: border-box;
  width: 5rem;
  height: 6rem;
  margin: auto auto 2rem auto;
  padding: 0.8rem;
  border-radius: 0.4rem;
  background-color: #ff8042b3;
  /* background-color: rgba(255, 128, 66, 0.7); */

  text-align: center;
`;
const Days5 = styled.div`
  box-sizing: border-box;
  width: 5rem;
  height: 7rem;
  margin: auto auto 2rem auto;
  padding: 0.8rem;
  border-radius: 0.4rem;
  background-color: #b9002bb3;
  /* background-color: rgba(185, 0, 43, 0.7); */
  text-align: center;
`;
const Days6 = styled.div`
  box-sizing: border-box;
  width: 5rem;
  height: 7rem;
  margin: auto auto 2rem auto;
  padding: 0.8rem;
  border-radius: 0.4rem;
  background-color: #5321a9b3;
  /* background-color: rgba(83, 33, 169, 0.7); */
  text-align: center;
`;
const Days7 = styled.div`
  box-sizing: border-box;
  width: 5rem;
  height: 9rem;
  margin: auto auto 2rem auto;
  padding: 0.8rem;
  border-radius: 0.4rem;
  background-color: skyblue;
  text-align: center;
`;

function Statics() {
  return (
    <div>
      <Wrap>
        <Menu />
        <WrapChart>
          {/* 원차트 가져오기 */}
          <Chart />
        </WrapChart>
        <WrapChart>
          {/* 막대 그래프로 횟수 보여주기 */}
          <Days1>슬픔</Days1>
          <Days2>기쁨</Days2>
          <Days3>당황</Days3>
          <Days4>불안</Days4>
          <Days5>분노</Days5>
          <Days6>상처</Days6>
          <Days7></Days7>
        </WrapChart>
      </Wrap>
    </div>
  );
}

export default Statics;
