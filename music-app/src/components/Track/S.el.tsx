import styled from "styled-components";

export const TrackImg = styled.div`
  width: 225px;
  height: 225px;
  border-radius: 8px;
  overflow: hidden;
  background-color: var(--violetColor);

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

export const TrackName = styled.div`
  font-size: 16px;
  color: var(--textColor);
  text-align: left;
`;

export const TrackLikes = styled.div`
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

export const TrackContainer = styled.div`
  user-select: none;
  cursor: pointer;
  transition: all .3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
  
  ${TrackName} {
    margin-top: 10px;
  }
  
  ${TrackLikes} {
    margin-top: 5px;
  }
`;