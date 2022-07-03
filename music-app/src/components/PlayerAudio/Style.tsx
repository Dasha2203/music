import styled from "styled-components";


export const BtnLike = styled.div`
  cursor: pointer;
`;

export const PlayerAudioText = styled.div`
  font-size: 16px;
  color: var(--grayColor);
`
export const PlayerAudioTitle = styled.div`
  font-size: 20px;
  color: var(--textColor);
`

export const PlayerAudioImg = styled.div`
  margin-right: 15px;
  margin-left: 15px;
  width: 50px;
  height: 50px;
  overflow: hidden;
  background-color: var(--blueColor);
  border-radius: 8px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const BlockText = styled.div`

`

export const PlayerAudioLogo = styled.div`
  display: flex;
`;

export const  PlayerAudioContainer = styled.div`
  padding: 15px 25px;
  position: fixed;
  left: 50%;
  bottom: 30px;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 90%;
  border-radius: 8px;
  background-color: var(--mediumDarkColor);
  transform: translateX(-50%);
  z-index: 1000;
`;

export const AudioControlsContainer = styled.div`
  width: 100%;
  max-width: 500px;
  margin-left: 50px;
`;

export const BtnsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;


export const ProgressContainer = styled.div`
  position: relative;
  width: 100%;
  
  .current-progress, .duration-progress {
    position: absolute;
    color: yellow;
    font-size: 10px;
  }

  .current-progress {
    color: var(--textColor);
    top: 50%;
    left: -5px;
    transform: translate(-100%, -3px);
  }
  .duration-progress {
    right: -5px;
    color: var(--grayColor);
    top: 50%;
    transform: translate(100%, -3px);
  }
`;
export const Progress = styled.input<{percentageValue: number}>`
  width: 100%;
  background: -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${props => props.percentageValue}, green), color-stop(${props => props.percentageValue}, red));
  &::-webkit-slider-runnable-track {
    //background: #053a5f;
    height: 3px;
  }

  &::-moz-range-track {
    //background: #053a5f;
    height: 3px;
  }

  &::-webkit-slider-thumb {
    margin-top: -6px; /* Centers thumb on the track */
    height: 4px;
    width: 4px;
    -webkit-appearance: none; /* Override default look */
    appearance: none;
    background-color: green;
    cursor: pointer;
  }
`;

export const AudioControlsButton = styled.button`
  margin: 0 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all .3s ease;
  
  &:hover {
    opacity: 0.6;
    svg {
      transform: scale(1.1);
    }
    transform: scale(1.1);
  }
  
  svg {
    width: 16px;
    height: 18px;
    
    path {
      fill: var(--textColor);
    }
    
    rect {
      fill: var(--textColor);
    }
  }
`;