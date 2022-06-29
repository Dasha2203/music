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
  width: 50px;
  height: 50px;
  overflow: hidden;
  background-color: var(--blueColor);
  border-radius: 8px;
  margin-left: 15px;
  
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
  position: fixed;
  display: flex;
  align-items: center;
  width: 100%;
  bottom: 30px;
  left: 50%;
  max-width: 90%;
  padding: 15px 25px;
  border-radius: 8px;
  background-color: var(--mediumDarkColor);
  transform: translateX(-50%);
`;