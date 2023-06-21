import React, { useState, useEffect, useRef } from 'react';
// import ReactDOM from 'react-dom/client';
import html2canvas from 'html2canvas';
import * as htmlToImage from 'html-to-image';
import { useSpring, animated } from 'react-spring';
import { useDrag } from '@use-gesture/react';
import { Resizable } from 're-resizable';
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

  let key = 0;

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
        const newComponentId = components.length + 1;
        const newComponents = [
          ...components,
          { id: newComponentId, img: data },
        ];
        setComponents(newComponents);
        // console.log('components : ', components);
        localStorage.setItem('components', newComponents);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // console.log('components : ', components);
  // console.log(keywords);
  // const data =
  // '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utUnM5jZnD5jj4jjIKqAURcBRQBTj8Uax4j2f8IppW2xfa39r6tG8ULKfLbMUPEkuVdsE+WuV+8aki8CW148E/ifUbvxHPEiYjvgi2quFYF1t0UISd7cuHIGMHiusooAKKKKACiiigAooooAKKKKACuL8UeBG1DVH8SeHNRk0bxQlu0KXMYUxXA4ws6FSGGBgHGR8pw2xQO0ooA4vwl49XVriLQvEFpJo3ilUYyWEyMqzBDgyQseHQ4YgAk/K3ULuPaVl614c0jxCkK6pYxzvA4eCYEpLAwZWzHIpDocqvKkZxWPa2Hivw86xQX0fiHS0T7l8wivowqoAFlUbJicOfnCHLDL9TQB1lFc/pXjHS9T1E6XL5+m6uMn+ztQTypmALjcnJWVf3bHdGzDHUiugoArzWFncXlteTWkEl1a7vs8zxgvFuGG2seVyODjrViiigAooooAKKKKACiiufvvHPhbT5ZIJtesXuklEBtYJRNOZCwTYIky5bccYAyKAOgormx4ua5uHi07w14gvUjRWeU2i2igkn5R9paIsflydoIGRzzUaXPji+itSNO0PSN+Hnaa6lvXjG0nZ5apEpbdtBIkIGDjPFAHUVj6t4p0bRLyCyvbz/TrjmGzgieedxhjuEUYZ9uEb5sY461nv4b16+iul1HxlfReflQmlWsNskaFQMKXWWQNnJ3b+M8YxWpovhzSPDyTLpdjHA87l55iS8s7FmbMkjEu5yzcsTjNAGHHdeLvE2x7W3/4RjTG2t5t2iTX8q/u2wIuY4cgyLly7Dj5BWho3gvQtEnS8itPtWpjBbU75jcXbtsCEmV8sMqMYXC8nAGa6CigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAM/WdD0vxDpz2Gr2EF7atk7JkztJBG5T1VsE4YYIzway4fCt5aoYrXxf4gjg3syRu1vOUBYnbvlhd2AzgbmJwAM10lFAHP/wBl+Jbb5LPxLBPGeS2p6assgPoDC8K7enBUnOeSMARm18bfaEVdZ8PmAoxdzpMwYNkbQF+04II3ZORjA4OeOkooA5/7H4w/6Duh/wDgmm/+SqPsfjD/AKDuh/8Agmm/+Sq6CigDn/sfjD/oO6H/AOCab/5Kqu/hvXr6K6XUfGV9F5+VCaVaw2yRoVAwpdZZA2cndv4zxjFdRRQBzZ8BeG5rhJ72wk1J40ZIxql1NeqgYgnaszuFJ2jkDPFbljYWemWcdnYWkFpax52QwRiNFySThRwMkk/jViigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD//Z';
  const DraggableDiv = ({ data, id }) => {
    // 그림 삭제
    // 사이즈 조절
    // 그림 다시 받아오기 (선택)
    const [selectedDiv, setSelectedDiv] = useState(null);
    const [width, setWidth] = useState(100);
    const [height, setHeight] = useState(100);
    const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));

    const bind = useDrag(
      ({ down, offset: [ox, oy] }) => {
        api.start({ x: ox, y: oy, immediate: down });
        console.log('ox : ', ox, 'oy : ', oy);
      },
      {
        bounds: { left: 0, right: 732, top: 0, bottom: 422 },
      }
    );

    const onClickDelete = (e, params) => {
      e.preventDefault();
      //console.log("params : ", params);
      //console.log("e.target.id : ",e.target.id);
      const id = parseInt(e.target.id);
      console.log(typeof id);
      setComponents(components.filter((component) => component.id !== id));
    };

    const onClickPicture = (e) => {
      const clickedDivId = e.target.id;
      setSelectedDiv((prevId) =>
        prevId === clickedDivId ? null : clickedDivId
      );

      // console.log(selectedDiv, id);
      // console.log(typeof selectedDiv, typeof id);
    };

    return (
      <>
        <animated.div
          {...bind()}
          style={{
            // top: dragging ? position.y : finalPosition.x,
            // left: dragging ? position.x : finalPosition.y,
            x,
            y,
            position: 'absolute',
            width: 100,
            height: 100,
            backgroundImage: `url('data:image/jpeg;base64,${data}')`,
            backgroundSize: 100,
            touchAction: 'none',
            boxSizing: 'content-box',
            // overflow: 'auto',
            // resize: 'both',
          }}
        >
          <Resizable
            style={{
              position: 'absolute',
              backgroundColor: 'black',
            }}
            size={{ width, height }}
            onResizeStop={(e, direection, ref, d) => {
              setWidth(width + d.width);
              setHeight(height + d.height);
            }}
          />
          <Delete
            style={{
              display: parseInt(selectedDiv) === id ? 'block' : 'none',
              position: 'absolute',
              width: '1rem',
              height: '1rem',
              top: '0.5rem',
              left: '0.2rem',
              borderRadius: '1rem',
              backgroundColor: 'grey',
              color: 'white',
              fontSize: '0.8rem',
            }}
            id={id}
            onClick={onClickDelete}
          >
            D
          </Delete>
          <FixFrame
            style={{
              width: '100%',
              height: '100%',
              border:
                parseInt(selectedDiv) === id ? '1px solid transparent' : 'none',
            }}
            id={id}
            onClick={onClickPicture}
          />
        </animated.div>
      </>
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

              {/* <GetPictures>브라우니</GetPictures>
              <GetPictures>바게트</GetPictures>
              <GetPictures onClick={onClickTest}>수박</GetPictures> */}
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
        {/* <div
          id='imageId'
          src=''
          alt='captured'
          style={{
            width: '52rem',
            height: '32.7rem',
            backgroundSize: '52rem 32.7rem',
            backgroundColor: 'transparent',
            border: '1.8px solid grey',
            marginLeft: '8rem',
            backgroundPosition: 'left',
            backgroundImage: `url('data:image/png;base64,${data}')`,
          }}
        /> */}
      </Wrap>
    </div>
  );
}

export default WriteModal;
