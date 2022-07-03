import styled from "styled-components";

import { ListTrackContainer } from "./ListTracks/S.el";
import { ArtistNavigation } from "../Pages/Artist/S.el";

import { Button } from "./Button";

import { breakPointDesc } from "../constantes/variables";

import bg from "../assets/background.jpeg";

export const Blur = styled.div<{ login?: boolean; img?: string }>`
  position: absolute;
  left: -10px;
  top: -10px;
  right: -10px;
  bottom: -10px;
  background-image: ${(props) =>
    props.login
      ? `linear-gradient(185deg, rgba(202,66,242,1) 0%, rgba(66,181,242,1) 37%)`
      : props.img
      ? `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${props.img})`
      : `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${bg})`};
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  filter: blur(5px);
  z-index: 1;
`;

export const Page = styled.div<{ login?: boolean; img?: string }>`
  position: relative;
  padding-top: 120px;
  padding-bottom: 80px;
  width: 100%;
  background-color: var(--darkestColor);
  background-image: ${(props) =>
    props.login
      ? `linear-gradient(185deg, rgba(202,66,242,1) 0%, rgba(66,181,242,1) 37%)`
      : props.img
      ? `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${props.img})`
      : `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${bg})`};

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

  @media (min-width: ${breakPointDesc}) {
    padding-top: 139px;
  }
`;

export const SectionTitle = styled.div<{ center?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.center ? "center" : "flex-start")};
  font-size: 24px;
  font-weight: bold;
  color: var(--textColor);
  text-align: ${(props) => (props.center ? "center" : "left")};
  
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
