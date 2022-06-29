import styled from "styled-components";
import {breakPointDesc, breakPointTab} from "../constantes/variables";
import {ListTrackContainer} from "./ListTracks/S.el";
import {ArtistNavigation} from "../Pages/Artist/S.el";
import {Button} from "./Button";

export const Page = styled.div<{login?: boolean}>`
  padding-top: 84px;
  padding-bottom: 80px;
  width: 100%;
  background-color: var(--darkestColor);
  background-image: ${props => props.login ? `linear-gradient(185deg, rgba(202,66,242,1) 0%, rgba(66,181,242,1) 37%)` : `transparent`};
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%;
  background-attachment: fixed;
  min-height: 100vh;
  
  .artist-page {
    ${ListTrackContainer} {
      margin-top: 57px;
    }
    
    ${ArtistNavigation} {
      display: flex;
      margin-bottom: 40px;
    }
  }
  
  @media (min-width: ${breakPointTab}) {
    
  }

  @media (min-width: ${breakPointDesc}) {
    padding-top: 139px;
    //height: calc(100vh - 139px);
  }
`;

export const SectionTitle = styled.div<{center?: boolean}>`
  font-size: 24px;
  font-weight: bold;
  color: var(--textColor);
  text-align: ${props => props.center ? 'center' : 'left'};
  display: flex;
  align-items: center;
  justify-content: ${props => props.center ? 'center' : 'flex-start'};
  ${Button} {
    margin-left: 15px;
  }
`;


export const Label = styled.label`
  font-size: 14px;
  font-weight: 400;
  color: var(--darkestColor);
  text-align: left;
`;

export const HelperText = styled.div`
  font-size: 12px;
  color: rgba(255, 0, 0, 0.7);
`;