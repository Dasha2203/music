import styled from "styled-components";
import {breakPointDesc} from "../../constantes/variables";


export const ArtistImg = styled.div`
  width: 225px;
  height: 225px;
  border-radius: 50%;
  overflow: hidden;
  background-color: var(--lightBlueColor);

  img {
    object-fit: cover;
    width: 120%;
    height: 120%;
    
    transition: all .3s ease;
  }
`;

export const ArtistName = styled.div`
  font-size: 16px;
  text-align: center;
  color: var(--textColor);
`;

export const ArtistLikes = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  line-height: 1.2;
  color: var(--grayColor);

  svg {
    margin-right: 5px;
    path {
      fill: var(--grayColor);
    }
  }
`;

export const ArtistContainer = styled.div`
  width: 225px;
  user-select: none;
  cursor: pointer;
  transition: all .3s ease;
  
  &:hover {
    transform: scale(1.05);
    
    ${ArtistImg} {
      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  ${ArtistName} {
    margin-top: 10px;
  }
  
  ${ArtistLikes} {
    margin-top: 5px;
  }
`;

export const AddArtistContainer = styled.div`
  display: flex;
  width: 225px;
  height: 225px;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
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

`;