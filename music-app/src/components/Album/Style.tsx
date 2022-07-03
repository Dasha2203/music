import styled from "styled-components";
import {breakPointDesc} from "../../constantes/variables";

export const AlbumImg = styled.div`
  width: 151px;
  height: 151px;
  border-radius: 8px;
  overflow: hidden;
  background-color: var(--violetColor);

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

  @media (min-width: ${breakPointDesc}) {
    width: 225px;
    height: 225px;
  }
`;

export const AlbumName = styled.div`
  font-size: 16px;
  color: var(--textColor);
  text-align: left;
`;

export const AlbumLikes = styled.div`
  display: flex;
  align-items: center;
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

export const AlbumContainer = styled.div`
  user-select: none;
  cursor: pointer;
  transition: all .3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
  
  ${AlbumName} {
    margin-top: 10px;
  }
  
  ${AlbumLikes} {
    margin-top: 5px;
  }
`

export const AddAlbumContainer = styled.div`
  user-select: none;
  width: 100%;
  height: 225px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 8px;
  border: 2px dashed var(--grayColor);
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
  
  ${AlbumName} {
    margin-top: 10px;
  }
  
  ${AlbumLikes} {
    margin-top: 5px;
  }
`;