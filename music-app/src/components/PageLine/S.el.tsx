import styled from 'styled-components';
import {ArtistContainer} from "../Artist/Styled.elements";
import {TrackContainer} from "../Track/S.el";
import {SmallCardContainer} from "../SmallCard/S.el";

export const PageLineShowAll = styled.span`
  text-transform: uppercase;
  font-weight: 400;
  color: var(--lightGrayColor);
  transition: all .3s ease-in-out;
`;

export const PageLineText = styled.span`
  font-size: 14px;
  line-height: 1.2;
  font-weight: 400;
  color: var(--grayColor);
`;

export const PageLineSubtitleText = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: var(--textColor);
  transition: all .3s ease-in-out;

`;

export const PageLineSubtitle = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const PageLineDescription = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const PageLineLink = styled.a`
  margin-bottom: 30px;
  display: block;

  &:hover {
    ${PageLineSubtitleText} {
      color: var(--lightBlueColor);
    }

    ${PageLineShowAll} {
      color: var(--lightBlueColor);
    }
  }
`;

export const PageLineAlbums = styled.div`
  display: flex;
  overflow-x: scroll;

  ${TrackContainer} {
    &:not(:last-child) {
      margin-right: 26px;
    }
  }

  ${SmallCardContainer} {
    &:not(:last-child) {
      margin-right: 26px;
    }
  }

  ${ArtistContainer} {

    &:not(:last-child) {
      margin-right: 26px;
    }
  }
`;

export const PageLineContainer = styled.div`
  display: block;
  
  ${PageLineDescription} {
    margin-top: 5px;
  }
`;