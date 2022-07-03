import styled from "styled-components";
import {breakPointDesc} from "../../constantes/variables";

export const AddSmallCardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: 2px dashed var(--grayColor);
  cursor: pointer;
  transition: all .3s ease;
  
  .plus {
    width: 30px;
    height: 30px;
    
    rect {
      transition: all .3s ease;
    }
  }

  &:hover {
    transform: scale(1.05);
    border: 2px dashed var(--lightBlueColor);
    
    .plus {
      rect {
        fill: var(--lightBlueColor);
      }
    }
  }
  
  @media (min-width: ${breakPointDesc}) {
    max-width: 225px;
    height: 128px;
    max-height: 128px;
  }
`;

export const SmallCardContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: 8px;
  user-select: none;
  cursor: pointer;
  transition: all .3s ease;
  z-index: 5;
  max-width: 225px;
  height: 96px;
  max-height: 88px;

  &:hover {
    transform: scale(1.05);
  }

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    transition: all .3s ease;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    display: block;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 0, 0, 0.5);
    background-image: linear-gradient(131deg, rgba(45,206,239,0.3) 25%, rgba(155,45,239,0.3) 64%);
  }
  
  @media (min-width: ${breakPointDesc}) {
    height: 128px;
    max-height: 128px;
  }
`;


export const Title = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  font-size: 28px;
  color: var(--textColor);
  font-weight: 900;
  z-index: 15;
`;