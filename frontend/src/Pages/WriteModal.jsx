import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Button from '../Components/Button';
import Input from '../Components/Input';
import Eraser from '../Images/eraser_default.png';
import EraserGrey from '../Images/eraser_grey.png';
import Draw from '../Images/draw_default.png';
import DrawGrey from '../Images/draw_grey.png';

const Wrap = styled.div`
  position: absolute;
  width: 100vw;
  height: 80rem;
  background-color: rgba(128, 128, 128, 0.4);
  z-index: 10;
`;

const WrapKeywordBackground = styled.div`
  width: 100vw;
  height: 10rem;
  background-color: white;
  border: 1.8px solid grey;
  border-radius: 0.5rem 0rem 0rem 0.5rem;
  margin: -1.8px auto 0rem auto;
`;

const WrapKeyword = styled.div`
  width: 90%;
  height: 3rem;
  /* background-color: red; */
  margin: 1rem auto;
`;

const KeywordLabel = styled.div`
  width: fit-content;
  height: fit-content;
  /* background-color: red; */
  margin-bottom: 0.5rem;
  font-weight: bold;
`;

const Keyword = styled.div``;

const WrapCanvas = styled.div`
  width: fit-content;
  height: fit-content;
  border: 1.8px solid grey;
  margin: 6rem auto 0rem auto;
  background-color: white;
`;

const RadioLabel = styled.label`
  border: none;

  [type='radio'] {
    width: 0;
    height: 0;
  }
  [type='radio'] + img {
    cursor: pointer;
    width: 1.8rem;
    height: 1.8rem;
    /* border: 1px solid transparent; */
    background-image: url(${(props) => props.backgroundImage});
    background-color: ${(props) => props.backgroundColor};
    background-size: 1.8rem;
    border: none;
    box-shadow: none;
  }
  [type='radio']:checked + img {
    width: 27px;
    height: 27px;
    background-image: url(${(props) => props.backgroundChecked});
    border: 1.8px solid grey;
  }
`;
const LabelImage = styled.img``;

const WrapDrawTools = styled.div`
  /* position: absolute; */
  width: 768px;
  height: 1.8rem;
  border: 1.8px solid grey;
  border-radius: 0rem 0rem 0.5rem 0.5rem;
  background-color: white;
  margin: -1.8px auto 0rem auto;
  padding: 0.7rem 0.5rem 0.7rem 0rem;
  display: flex;
  /* box-sizing: border-box; */
  padding-left: 3.5rem;
  /* margin-left: 50rem; */
  /* margin-top: -60.3rem; */
`;

const Content = styled.input`
  width: 1.8rem;
  height: 1.8rem;
  /* margin-top: 0.5rem; */
  border: none;
`;

const WrapRange = styled.div`
  width: fit-content;
  height: fit-content;
  /* border: 1px solid grey; */
  margin-top: 0.2rem;
  margin-left: 2rem;
  /* transform: rotate(-90deg); */
`;

const PenWidthState = styled.div`
  width: 1.5rem;
  font-size: 0.8rem;
  margin-top: 0.35rem;
  margin-left: 0.8rem;
  margin-right: 1rem;
`;

const WrapSaveDraw = styled.div`
  /* margin: 0rem auto 0rem auto; */
  width: 7rem;
  height: 2.7rem;
  margin: 1rem auto;
`;

function WriteModal() {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  // 펜 두께 초기 설정
  const [penWidth, setPenWidth] = useState(1.5);

  // 펜 색 초기 설정
  const [penColor, setPenColor] = useState('black');

  // 현재 마우스가 어떤 버튼을 눌렀는지
  const [mouseState, setMouseState] = useState('draw');

  // WriteModal 없애기
  const [visibleModal, setVisibleModal] = useState(true);

  const [ctx, setCtx] = useState();
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 832; // 640
    canvas.height = 522.6; // 402

    const context = canvas.getContext('2d');
    context.strokeStyle = penColor;
    context.lineWidth = penWidth;
    contextRef.current = context;

    setCtx(contextRef.current);
  }, []);

  const startDrawing = () => {
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    setIsDrawing(false);
  };

  const drawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    if (ctx) {
      if (!isDrawing) {
        ctx.beginPath();
        ctx.moveTo(offsetX, offsetY);
      } else {
        if (mouseState === 'draw') {
          ctx.strokeStyle = penColor;
          ctx.lineWidth = penWidth;
          ctx.lineTo(offsetX, offsetY);
          ctx.stroke();
        } else if (mouseState === 'eraser') {
          // ctx.strokeStyle = 'transparent';
          // ctx.lineWidth = penWidth;
          // ctx.lineTo(offsetX, offsetY);
          // ctx.stroke();
          ctx.clearRect(offsetX, offsetY, penWidth * 3, penWidth * 3);
        }
      }
    }
  };
  const onChangePenWidth = (e) => {
    setPenWidth(e.target.value);
    console.log(penWidth);
  };
  const onClickTools = (e) => {
    setMouseState(e.target.value);
  };
  const onClickColor = (e) => {
    setPenColor(e.target.value);
    console.log(penColor);
  };
  return (
    <div>
      <Wrap>
        <WrapCanvas>
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseUp={finishDrawing}
            onMouseMove={drawing}
            onMouseLeave={finishDrawing}
          ></canvas>
        </WrapCanvas>
        <WrapDrawTools>
          <RadioLabel backgroundImage={Draw} backgroundChecked={DrawGrey}>
            <Content
              type='radio'
              name='tools'
              value='draw'
              onClick={onClickTools}
              // checked='checked'
            />
            <LabelImage />
          </RadioLabel>
          <RadioLabel backgroundImage={Eraser} backgroundChecked={EraserGrey}>
            <Content
              type='radio'
              name='tools'
              value='eraser'
              onClick={onClickTools}
            />
            <LabelImage />
          </RadioLabel>

          <WrapRange>
            <Input
              width='10rem'
              type='range'
              min='0'
              max='10'
              step='1'
              onClick={onChangePenWidth}
            />
          </WrapRange>
          <PenWidthState>{penWidth}</PenWidthState>
          <RadioLabel backgroundColor='red'>
            <Content
              type='radio'
              name='colors'
              value='red'
              onClick={onClickColor}
            />
            <LabelImage />
          </RadioLabel>
          <RadioLabel backgroundColor='orange'>
            <Content
              type='radio'
              name='colors'
              value='orange'
              onClick={onClickColor}
            />
            <LabelImage />
          </RadioLabel>

          <RadioLabel backgroundColor='yellow'>
            <Content
              type='radio'
              name='colors'
              value='yellow'
              onClick={onClickColor}
            />
            <LabelImage />
          </RadioLabel>
          <RadioLabel backgroundColor='green'>
            <Content
              type='radio'
              name='colors'
              value='green'
              onClick={onClickColor}
            />
            <LabelImage />
          </RadioLabel>
          <RadioLabel backgroundColor='blue'>
            <Content
              type='radio'
              name='colors'
              value='blue'
              onClick={onClickColor}
            />
            <LabelImage />
          </RadioLabel>
          <RadioLabel backgroundColor='navy'>
            <Content
              type='radio'
              name='colors'
              value='navy'
              onClick={onClickColor}
            />
            <LabelImage />
          </RadioLabel>

          <RadioLabel backgroundColor='indigo'>
            <Content
              type='radio'
              name='colors'
              value='indigo'
              onClick={onClickColor}
            />
            <LabelImage />
          </RadioLabel>

          <RadioLabel backgroundColor='purple'>
            <Content
              type='radio'
              name='colors'
              value='purple'
              onClick={onClickColor}
            />
            <LabelImage />
          </RadioLabel>

          <RadioLabel backgroundColor='black'>
            <Content
              type='radio'
              name='colors'
              value='black'
              onClick={onClickColor}
              // checked='checked'
            />
            <LabelImage />
          </RadioLabel>

          <RadioLabel backgroundColor='white'>
            <Content
              type='radio'
              name='colors'
              value='white'
              onClick={onClickColor}
            />
            <LabelImage />
          </RadioLabel>
        </WrapDrawTools>
        <WrapSaveDraw>
          <Button
            width='7rem'
            height='2.7rem'
            name='그림 저장'
            color='rgba(138, 80, 255)'
            border='2px solid rgba(138, 80, 255, 0.6)'
            borderRadius='10rem'
            backgroundColor='white'
            hoverBackgroundColor='rgba(138, 80, 255, 0.6)'
            hoverColor='white'
          />
        </WrapSaveDraw>
      </Wrap>
    </div>
  );
}

export default WriteModal;
