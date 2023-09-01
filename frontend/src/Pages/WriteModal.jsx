import React, { useState, useEffect, useRef } from 'react';
// import ReactDOM from 'react-dom/client';
// import html2canvas from 'html2canvas';
import * as htmlToImage from 'html-to-image';
// import { useSpring, animated } from 'react-spring';
// import { useDrag } from '@use-gesture/react';
// import { Resizable } from 're-resizable';
import { Rnd } from 'react-rnd';
import axios from 'axios';
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
// import Cookie from '../Images/cookie.png';

const Wrap = styled.div`
  position: absolute;
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
  margin: 1rem auto;
`;

const KeywordLabel = styled.div`
  width: fit-content;
  height: fit-content;
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
`;

const Cancel = styled.div`
  position: absolute;
  width: 4rem;
  height: 4rem;
  background-color: transparent;
  background-size: 4rem;
  float: right;
  top: 10.5rem;
  right: calc((100% - 61rem) / 2);

  background-image: url(${Close});
  &:hover {
    background-image: url(${CloseGrey});
  }
`;

const WrapCanvas = styled.div`
  position: relative;
  width: 52rem;
  height: 32.7rem;
  border: 1.8px solid grey;
  margin: 0.5rem auto 0rem auto;
  background-color: white;
`;

const WrapPng = styled.div`
  width: fit-content;
  height: fit-content;
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
  width: 768px;
  height: 1.8rem;
  border: 1.8px solid grey;
  border-radius: 0rem 0rem 0.5rem 0.5rem;
  background-color: white;
  margin: -1.8px auto 0rem auto;
  padding: 0.7rem 0.5rem 0.7rem 0rem;
  display: flex;
  padding-left: 3.5rem;
`;

const Content = styled.input`
  width: 1.8rem;
  height: 1.8rem;
  border: none;
`;

const WrapRange = styled.div`
  width: fit-content;
  height: fit-content;
  margin-top: 0.2rem;
  margin-left: 2rem;
`;

const PenWidthState = styled.div`
  width: 1.5rem;
  font-size: 0.8rem;
  margin-top: 0.35rem;
  margin-left: 0.8rem;
  margin-right: 1rem;
`;

const WrapSaveDraw = styled.div`
  width: 7rem;
  height: 2.7rem;
  margin: 1rem auto;
`;

const FixFrame = styled.div`
  width: fit-content;
  height: fit-content;
`;

const Delete = styled.div`
  /* position: absolute;
  width: 1rem;
  height: 1rem;
  top: -0.5rem;
  left: -0.5rem;
  border-radius: 1rem;
  background-color: grey;
  color: white;
  font-size: 0.8rem;
  align-content: center; */
`;

const Resize = styled.div`
  /* position: absolute;
  width: 1rem;
  height: 1rem;
  top: calc(100% - 0.5rem);
  left: calc(100% - 0.5rem);
  border-radius: 1rem;
  background-color: grey;
  color: white;
  font-size: 0rem;
  align-content: center; */
`;

function WriteModal({ setVisibleModal, onChange, keyword }) {
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
  // 키워드 컴포넌트 저장
  const [components, setComponents] = useState([]);

  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const domEl = useRef(null);

  // 펜 두께 초기 설정
  const [penWidth, setPenWidth] = useState(1);

  // 펜 색 초기 설정
  const [penColor, setPenColor] = useState('black');

  // 현재 마우스가 어떤 버튼을 눌렀는지
  const [mouseState, setMouseState] = useState('draw');

  const [idNum, setIdNum] = useState(0);

  // let id_num = 0;

  const [ctx, setCtx] = useState();
  const [isDrawing, setIsDrawing] = useState(false);
  const [keywords, setKeywords] = useState([]);

  // const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));

  // const bind = useDrag(
  //   ({ down, offset: [ox, oy] }) =>
  //     api.start({ x: ox, y: oy, immediate: down }),
  //   { bounds: { left: 0, right: 732, top: 0, bottom: 422 } }
  // );

  useEffect(() => {
    setKeywords(keyword);
    const canvas = canvasRef.current;
    canvas.width = 832; // 640 52rem
    canvas.height = 522.6; // 402 32.7rem

    const context = canvas.getContext('2d');
    context.strokeStyle = penColor;
    context.lineWidth = penWidth;
    contextRef.current = context;

    setCtx(contextRef.current);
    localStorage.getItem('components');
    // eslint-disable-next-line
  }, []);

  const startDrawing = () => {
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    setIsDrawing(false);
  };

  const drawing = ({ nativeEvent }, e) => {
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
    e.preventDefault();
    setPenWidth(e.target.value);
    console.log(penWidth);
  };

  const onClickTools = (e) => {
    setMouseState(e.target.value);
  };

  const onClickColor = (e) => {
    e.preventDefault();
    setPenColor(e.target.value);
    console.log(penColor);
  };

  const onClickCancel = (e) => {
    setVisibleModal(false);
  };

  const onClickBackgrounds = (e) => {
    // console.log(infos);
    e.preventDefault();
    let background = '';
    for (let i = 0; i < 9; i++) {
      if (infos[i].place.includes(e.target.id)) {
        // console.log(infos[i].place);
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

  const onClickSavePicture = async () => {
    const dataUrl = await htmlToImage.toPng(domEl.current);
    if (window.confirm('그림을 저장하시겠습니까?')) {
      onChange(dataUrl);
      setVisibleModal(false);
    } else {
      console.log(components);
    }
  };

  const onClickGetPictures = (key, e) => {
    console.log(key);
    let data = '';
    axios
      .post(`http://127.0.0.1:5001/drawpic`, { keyword: key })
      .then((res) => {
        // console.log(res.data.img);
        data = res.data.img;
        // const newComponentId = components.length + 1;
        console.log('id_num', idNum);
        const newComponentId = idNum;
        setIdNum(idNum + 1);
        const newComponents = [
          ...components,
          {
            id: newComponentId,
            img: data,
            x: 0,
            y: 0,
            width: 100,
            height: 100,
          },
        ];
        setComponents(newComponents);
        console.log('components : ', components);
        localStorage.setItem(
          idNum,
          JSON.stringify({
            x: 0,
            y: 0,
            width: 100,
            height: 100,
          })
        );
        // localStorage.setItem('components', newComponents);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const DraggableDiv = ({ data, id }) => {
    // 그림 삭제
    // 사이즈 조절
    // 그림 다시 받아오기 (선택)
    const [selectedDiv, setSelectedDiv] = useState(null);

    const onClickDelete = (e, params) => {
      e.preventDefault();
      const id = parseInt(e.target.id);
      console.log(typeof id);
      setComponents(components.filter((component) => component.id !== id));
    };

    const onClickPicture = (e) => {
      const clickedDivId = e.target.id;
      setSelectedDiv((prevId) =>
        prevId === clickedDivId ? null : clickedDivId
      );
    };

    // const handleClick = (e) => {
    //   const id = e.target.id;
    //   console.log(components[0].id);
    // };

    const handleDragStop = (e, id) => {
      console.log(id);
    };

    const handleResizeStop = (e, id) => {
      console.log(id);
    };

    return (
      <div id={id}>
        <Rnd
          style={{
            backgroundImage: `url('data:image/jpeg;base64,${data}')`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
          }}
          default={{ x: 0, y: 0, width: 100, height: 100 }}
          lockAspectRatio={true}
          onDragStop={handleDragStop({ id })}
          onResizeStop={handleResizeStop({ id })}
        >
          <Delete
            style={{
              display: parseInt(selectedDiv) === id ? 'block' : 'none',
              position: 'absolute',
              width: '1.3rem',
              height: '1.3rem',
              top: '-1.3rem',
              left: '-1.3rem',
              borderRadius: '1rem',
              backgroundColor: 'lightgrey',
              color: 'white',
              fontSize: '1rem',
              textAlign: 'center',
            }}
            id={id}
            onClick={onClickDelete}
          >
            X
          </Delete>
          <FixFrame
            style={{
              width: '100%',
              height: '100%',
              border:
                parseInt(selectedDiv) === id ? '1px solid lightgrey' : 'none',
            }}
            id={id}
            onClick={onClickPicture}
          />
        </Rnd>
      </div>
    );
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
              {keywords.map((keyword, index) => (
                <GetPictures
                  key={keyword.id}
                  id={keyword.English}
                  onClick={() => {
                    onClickGetPictures(keyword.English);
                  }}
                >
                  {keyword.korea}
                </GetPictures>
              ))}
            </Keyword>
          </WrapKeyword>
        </WrapKeywordBackground>

        <WrapCanvas>
          <WrapPng id='wrapCanvas' ref={domEl}>
            {components.map((component, index) => (
              <DraggableDiv
                key={index}
                data={component.img}
                id={component.id}
              />
            ))}
            <canvas
              id='canvas'
              ref={canvasRef}
              onMouseDown={startDrawing}
              onMouseUp={finishDrawing}
              onMouseMove={drawing}
              onMouseLeave={finishDrawing}
            ></canvas>
          </WrapPng>
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
            onClick={onClickSavePicture}
          />
        </WrapSaveDraw>
      </Wrap>
    </div>
  );
}

export default WriteModal;
