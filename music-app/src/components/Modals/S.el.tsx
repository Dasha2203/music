import styled from 'styled-components';
import {UploadImgContainer} from "../UploadImg/Style";
import {RadioListsContainer} from "../RadioLists/Style";
import {UploadMusicContainer} from "../UploadMusic/Style";

export const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .4);
  z-index: 1000;
  ${RadioListsContainer} {
    margin-bottom: 20px;
  }
  ${UploadMusicContainer} {
    margin-bottom: 20px;
  }
  ${UploadImgContainer} {
    margin-bottom: 20px;
  }
`;

export const ModalWrapApp = styled.div`
  position: relative;
  padding: 20px 50px 40px;
  background-color: var(--darkColor);
  min-width: 600px;
  border-radius: 4px;
  z-index: 1000;

  .close {
    position: absolute;
    top: 15px;
    right: 15px;
    width: 30px;
    height: 30px;
    transition: all .3s ease;
    cursor: pointer;
    
    path {
      fill: var(--textColor);
    }

    &:hover {
      transform: scale(1.05);
    }
  }
`;

export const ModalWrap = styled.div`
  position: relative;
  padding: 60px 50px 40px;
  background-color: var(--textColor);
  min-width: 600px;
  border-radius: 4px;
  z-index: 1010;
  
  .close {
    position: absolute;
    top: 15px;
    right: 15px;
    width: 30px;
    height: 30px;
    transition: all .3s ease;
    cursor: pointer;
    
    &:hover {
      transform: scale(1.05);
    }
  }
`;

export const ModalTitle = styled.div`
  font-size: 32px;
  text-align: center;
  color: var(--darkestColor);
`;

export const ModalTitleApp = styled.div`
  margin-bottom: 30px;
  font-size: 26px;
  text-align: left;
  color: var(--textColor);
`;

export const ModalTextApp = styled.div`
  margin-bottom: 40px;
  font-size: 20px;
  max-width: 300px;
  color: var(--textColor);
  max-height: 300px;
  overflow-y: scroll;
  margin-left: auto;
  margin-right: auto;
`;

export const Buttons = styled.div`
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;