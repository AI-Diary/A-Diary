import React from 'react';
import styled from 'styled-components';

const Wrap = styled.div`
  /* position: absolute; */
  width: 100vw;
  height: fit-content;
  border: 0.1px solid transparent;
  /* padding-bottom: 4rem; */
  background: linear-gradient(
    to bottom,
    rgba(51, 153, 255),
    rgba(178, 102, 255)
  );
`;

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
  background-color: coral;
  margin: auto;
`;
const Days1 = styled.div`
  box-sizing: border-box;
  width: 5rem;
  height: 10rem;
  margin: auto auto 2rem auto;
  padding: 0.8rem;
  border-radius: 0.4rem;
  background-color: skyblue;
  text-align: center;
`;
const Days2 = styled.div`
  box-sizing: border-box;
  width: 5rem;
  height: 8rem;
  margin: auto auto 2rem auto;
  padding: 0.8rem;
  border-radius: 0.4rem;
  background-color: skyblue;
  text-align: center;
`;
const Days3 = styled.div`
  box-sizing: border-box;
  width: 5rem;
  height: 7rem;
  margin: auto auto 2rem auto;
  padding: 0.8rem;
  border-radius: 0.4rem;
  background-color: skyblue;
  text-align: center;
`;
const Days4 = styled.div`
  box-sizing: border-box;
  width: 5rem;
  height: 6rem;
  margin: auto auto 2rem auto;
  padding: 0.8rem;
  border-radius: 0.4rem;
  background-color: skyblue;
  text-align: center;
`;
const Days5 = styled.div`
  box-sizing: border-box;
  width: 5rem;
  height: 7rem;
  margin: auto auto 2rem auto;
  padding: 0.8rem;
  border-radius: 0.4rem;
  background-color: skyblue;
  text-align: center;
`;
const Days6 = styled.div`
  box-sizing: border-box;
  width: 5rem;
  height: 7rem;
  margin: auto auto 2rem auto;
  padding: 0.8rem;
  border-radius: 0.4rem;
  background-color: skyblue;
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
        <WrapChart>
          {/* 원차트 가져오기 */}
          <Chart />
        </WrapChart>
        <WrapChart>
          {/* 막대 그래프로 횟수 보여주기 */}
          <Days1></Days1>
          <Days2></Days2>
          <Days3></Days3>
          <Days4></Days4>
          <Days5></Days5>
          <Days6></Days6>
          <Days7></Days7>
        </WrapChart>
      </Wrap>
    </div>
  );
}

export default Statics;
