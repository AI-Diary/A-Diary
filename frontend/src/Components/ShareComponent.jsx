import React, { useState } from 'react';
import styled from 'styled-components';
import WordSpeech from '../Images/speech.png';
import Share from '../Images/share_default.png';
import Instargram from '../Images/instagram_default.png';
import Twitter from '../Images/twitter_default.png';
import Kakaotalk from '../Images/kakaotalk_default.png';

import ShareGrey from '../Images/share_grey.png';
import InstargramGrey from '../Images/instagram_grey.png';
import TwitterGrey from '../Images/twitter_grey.png';
import KakaotalkGrey from '../Images/kakaotalk_grey.png';

const WrapShare = styled.div`
  position: absolute;
  width: fit-content;
  height: 2.5rem;
  align-items: center;
  bottom: 0.7rem;
  left: 0.7rem;
  display: flex;
  z-index: 5;
`;
const ShareButton = styled.div`
  width: 1.8rem;
  height: 1.8rem;
  background-image: url(${Share});

  cursor: pointer;
  &:hover {
    background-image: url(${ShareGrey});
  }
`;

const WrapSNS = styled.div`
  box-sizing: border-box;
  width: 10rem;
  height: 2.5rem;
  display: flex;
  visibility: ${(props) => props.visibility};
  padding: 0 0.8rem 0 1.5rem;
  margin-left: 0.3rem;
  justify-content: space-between;
  background-image: url(${WordSpeech});
  background-repeat: no-repeat;
  background-size: 10rem 2.5rem;
  align-items: center;
`;

const SNSButton = styled.div`
  width: 1.8rem;
  height: 1.8rem;
  background-size: 1.8rem;
  background-image: url(${(props) => props.backgroundImage});
  background-size: ${(props) => props.backgroundSize || '100%'};
  background-position: center;
  &:hover {
    background-image: url(${(props) => props.backgroundChecked});
  }
`;

export default function ShareComponent() {
  // SNS 공유 창 보이기
  const [visibleShare, setVisibleShare] = useState(false);

  // SNS 연동
  const onClickInsta = () => {
    const insta = 'https://www.instagram.com/';
    window.open(insta);
  };

  const onClickTwitter = () => {
    const twitter =
      'https://twitter.com/i/flow/login?input_flow_data=%7B%22requested_variant%22%3A%22eyJsYW5nIjoia28ifQ%3D%3D%22%7D';
    window.open(twitter);
  };

  const onClickKakao = () => {
    const kakao = 'https://developers.kakao.com/product/message';
    window.open(kakao);
  };

  return (
    <WrapShare>
      <ShareButton
        onClick={() => {
          setVisibleShare(!visibleShare);
        }}
      />
      {visibleShare && (
        <WrapSNS>
          <SNSButton
            backgroundImage={Instargram}
            backgroundChecked={InstargramGrey}
            backgroundSize='115%'
            onClick={onClickInsta}
          />
          <SNSButton
            backgroundImage={Twitter}
            backgroundChecked={TwitterGrey}
            backgroundSize='115%'
            onClick={onClickTwitter}
          />
          <SNSButton
            backgroundImage={Kakaotalk}
            backgroundChecked={KakaotalkGrey}
            onClick={onClickKakao}
          />
        </WrapSNS>
      )}
    </WrapShare>
  );
}
