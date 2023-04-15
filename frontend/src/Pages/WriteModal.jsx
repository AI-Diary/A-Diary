import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Button from '../Components/Button';
import Input from '../Components/Input';
import Eraser from '../Images/eraser_default.png';
import EraserGrey from '../Images/eraser_grey.png';
import Draw from '../Images/draw_default.png';
import DrawGrey from '../Images/draw_grey.png';
import Close from '../Images/closedefault.png';
import CloseGrey from '../Images/closegrey.png';
import LivingRoom1 from '../Images/LivingRoom1.png';
import LivingRoom2 from '../Images/LivingRoom2.png';
import Room1 from '../Images/Room1.png';
import Room2 from '../Images/Room2.png';
import Room3 from '../Images/Room3.png';
import Kitchen1 from '../Images/Kitchen1.png';
import Kitchen2 from '../Images/Kitchen2.png';
import Yarn1 from '../Images/Yarn1.png';
import None from '../Images/None.png';
import Cookie from '../Images/cookie.png';

const Wrap = styled.div`
  position: absolute;
  /* display: flex; */
  width: 100vw;
  height: 80rem;
  min-width: 60rem;
  background-color: rgba(128, 128, 128, 0.4);
  z-index: 10;
`;

const WrapKeywordBackground = styled.div`
  width: 52rem;
  height: 10rem;
  background-color: white;
  border: 1.8px solid grey;
  border-radius: 0rem 0rem 0.5rem 0.5rem;
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
  font-weight: 700;
`;

const Keyword = styled.div`
  width: fit-content;
  height: 1.5rem;
  display: flex;
  overflow-x: auto;
`;

const Backgrounds = styled.div`
  margin-right: 0.8rem;
  justify-content: center;
`;

const GetPictures = styled.div`
  margin-right: 0.8rem;
  justify-content: center;
  /* border: 1px solid black; */
`;

const Cancel = styled.div`
  position: absolute;
  width: 4rem;
  height: 4rem;
  /* font-size: 2rem; */
  background-color: transparent;
  float: right;
  top: 10.1rem;
  right: calc((100vw - 61rem) / 2);

  background-image: url(${Close});
  &:hover {
    background-image: url(${CloseGrey});
  }
`;

const WrapCanvas = styled.div`
  width: fit-content;
  height: fit-content;
  border: 1.8px solid grey;
  margin: 0.5rem auto 0rem auto;
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

function WriteModal({ setVisibleModal }) {
  const infos = [
    {
      id: 1,
      place: LivingRoom1,
    },
    {
      id: 2,
      place: LivingRoom2,
    },
    {
      id: 3,
      place: Room1,
    },
    {
      id: 4,
      place: Room2,
    },
    {
      id: 5,
      place: Room3,
    },
    {
      id: 6,
      place: Kitchen1,
    },
    {
      id: 7,
      place: Kitchen2,
    },
    {
      id: 8,
      place: Yarn1,
    },
    {
      id: 9,
      place: None,
    },
  ];
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  // 펜 두께 초기 설정
  const [penWidth, setPenWidth] = useState(1);

  // 펜 색 초기 설정
  const [penColor, setPenColor] = useState('black');

  // 현재 마우스가 어떤 버튼을 눌렀는지
  const [mouseState, setMouseState] = useState('draw');

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
    // eslint-disable-next-line
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
          ctx.clearRect(offsetX, offsetY, penWidth * 3.5, penWidth * 3.5);
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
  const onClickCancel = (e) => {
    setVisibleModal(false);
  };
  const onClickBackgrounds = (e) => {
    console.log(infos);
    let background = '';
    for (let i = 0; i < 9; i++) {
      if (infos[i].place.includes(e.target.id)) {
        console.log(infos[i].place);
        background = infos[i].place;
      }
    }

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const backgroundImage = new Image();
    backgroundImage.src = background;
    backgroundImage.onload = () => {
      ctx.drawImage(backgroundImage, 0, 0, 832, 552.6);
    };
  };

  return (
    <div>
      <Wrap>
        <Cancel onClick={onClickCancel} />
        <WrapKeywordBackground>
          <WrapKeyword>
            <KeywordLabel>배경</KeywordLabel>
            <Keyword>
              <Backgrounds id='LivingRoom1' onClick={onClickBackgrounds}>
                거실1
              </Backgrounds>
              <Backgrounds id='LivingRoom2' onClick={onClickBackgrounds}>
                거실2
              </Backgrounds>
              <Backgrounds id='Room1' onClick={onClickBackgrounds}>
                방1
              </Backgrounds>
              <Backgrounds id='Room2' onClick={onClickBackgrounds}>
                방2
              </Backgrounds>
              <Backgrounds id='Room3' onClick={onClickBackgrounds}>
                방3
              </Backgrounds>
              <Backgrounds id='Kitchen1' onClick={onClickBackgrounds}>
                부엌1
              </Backgrounds>
              <Backgrounds id='Kitchen2' onClick={onClickBackgrounds}>
                부엌2
              </Backgrounds>
              <Backgrounds id='Yarn1' onClick={onClickBackgrounds}>
                마당
              </Backgrounds>
              <Backgrounds id='None' onClick={onClickBackgrounds}>
                없음
              </Backgrounds>
            </Keyword>
          </WrapKeyword>
          <WrapKeyword>
            <KeywordLabel>키워드</KeywordLabel>
            <Keyword>
              <GetPictures>쿠키</GetPictures>
              <GetPictures>브라우니</GetPictures>
              <GetPictures>바게트</GetPictures>
              <GetPictures>수박</GetPictures>
            </Keyword>
          </WrapKeyword>
        </WrapKeywordBackground>
        <WrapCanvas>
          <canvas
            id='canvas'
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
              min='1'
              max='50'
              step='1'
              onChange={onChangePenWidth}
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
            color='rgba(157, 108, 255)'
            border='2px solid rgba(157, 108, 255)'
            borderRadius='10rem'
            backgroundColor='white'
            hoverBackgroundColor='rgba(157, 108, 255)'
            hoverColor='white'
          />
        </WrapSaveDraw>
      </Wrap>
    </div>
  );
}

export default WriteModal;
