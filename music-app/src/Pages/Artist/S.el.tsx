import styled from "styled-components";
import {IconButton} from "../../components/ButtonIcon";
import {Button} from "../../components/Button";


export const ListTrackOptions = styled.div`
  display: flex;
  ${IconButton} {
    &:not(:last-child) {
      margin-right: 20px;
    }
  }
`;
export const ArtistPromoImg = styled.div`
  width: 225px;
  height: 225px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 40px;
  background-color: var(--lightBlueColor);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const ArtistFollowers = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  color: var(--grayColor);
  
  svg {
    path {
      fill: var(--grayColor);
    }
    
  }
`;

export const ArtistBtns = styled.div`
  display: flex;
  ${Button} {
    margin-left: 15px;
  }
  ${IconButton} {
    margin-left: 15px;
  }

`;

export const ArtistText = styled.span`
  font-size: 50px;
  font-weight: bold;
  color: var(--textColor);
`

export const ArtistTitle = styled.div`
  margin-bottom: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const Hint = styled.div`
  margin-bottom: 10px;
  text-align: left;
  color: var(--textColor);
  font-size: 18px;
  font-weight: 400;
`

export const ArtistPromoContent = styled.div`
  flex: 1 1 auto;
`;

export const ArtistPromo = styled.div`
  margin-bottom: 30px;
  position: relative;
  display: flex;
  align-items: flex-end;

`;

export const NavigationItem = styled.div<{active?: boolean}>`
  position: relative;
  color: var(--textColor);
  padding-bottom: 12px;
  cursor: pointer;
  transition: all .3s ease;
  
  &::before {
    content: '';
    position: absolute;
    left: 50%;
    bottom: 0;
    display: block;
    width: 100%;
    height: 2px;
    transform: translateX(-50%);
    background-image: ${props => props.active ? 'linear-gradient(99deg, rgba(202,66,242,1) 0%, rgba(66,181,242,1) 54%)' : 'linear-gradient(99deg, transparent 0%, transparent 54%)'};
    transition: all .3s ease;
  }
  &:hover {
    transform: scale(1.05);
    &::before {
      background-image: linear-gradient(99deg, rgba(202,66,242,1) 0%, rgba(66,181,242,1) 54%);
      
    }
  }
`;

export const ArtistNavigation = styled.div`
  display: flex;
  margin-bottom: 40px;
  ${NavigationItem} {
    margin-right: 30px;
  }
`;