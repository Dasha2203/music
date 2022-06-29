import styled from "styled-components";


export const ListTitle = styled.div`
    margin-bottom: 31px;
    font-size: 16px;
    color: var(--textColor);
    text-align: left;
`;

export const ListTrackContainer = styled.div`
  
`;

export const AdminButton = styled.div`
  display: none;
  align-items: center;
  justify-content: center;
  svg {
    width: 18px;
    height: 18px;
    path {
      fill: var(--textColor);
      transition: all .3s ease;
    }
  }
  
  .like {
    opacity: 0.3;
    path {
      fill: var(--grayColor);
    }

    &.like-active {
      opacity: 1;
      path {
        fill: #e83225;
      }
    }
  }
  
  
  
  .text {
    width: 14px;
    height: 14px;
  }
  .trash {
    path {
      
      
    }
  }
  
  &:hover {
    .trash {
      path {
        fill: red;
      }
    }
    
    .text {
      path {
        fill: var(--blueColor)
      }
    }
  }
`;

export const AdminTrackButtons = styled.div`
  display: flex;
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  
  ${AdminButton} {
    margin-left: 15px;
  }
`;



export const ListTrackCell = styled.div`
  padding-left: 8px;
  padding-right: 8px;
  display: flex;
  align-items: center;
  font-size: 15px;
  font-weight: 400;
  color: var(--textColor);
  
  &.options {
    margin-left: auto;
  }
  
  &.opacity {
    color: var(--grayColor);
  }
`;

export const ListTrackImg = styled.div`
  position: relative;
  margin-right: 14px;
  width: 35px;
  height: 35px;
  border-radius: 4px;
  overflow: hidden;
  transition: all .3s ease;
  
  .play {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 15px;
    height: 15px;
    z-index: 10000;
    opacity: 0;
    transition: all .3s ease;
    
    rect {
      fill: #fff;
    }
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const ListTrackRow = styled.div`
  position: relative;
  padding-top: 12px;
  padding-bottom: 12px;
  display: flex;
  border-radius: 6px;
  cursor: pointer;
  ${ListTrackCell} {
    &:nth-child(1) {
      width: 60px;
    }

    &:nth-child(2) {
      width: 30%;
    }
    &:nth-child(3) {
      width: 20%;
    }
    &:nth-child(4) {
      width: 20%;
    }
    &:nth-child(5) {
      width: 60px;
    }
  }
  
  
  &:hover {
    &:not(.header) {
      background-color: var(--lighterDarkColor);
    }

    ${AdminButton} {
      display: flex;
    }
    
    .play {
      opacity: 1;
    }
    
    ${ListTrackImg} {
      img {
        opacity: .5;
      }
    }
  }
  &.header {
    text-transform: uppercase;
    font-size: 32px;
    font-weight: bold;
    color: var(--grayColor);
  }
`;

export const ListTrackBody = styled.div`

`;
export const ListTrackHeader = styled.div`
  display: flex;
`;
export const ListContainer = styled.div`
  width: 100%;
`;