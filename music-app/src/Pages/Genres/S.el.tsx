import styled from "styled-components";
import {Page, SectionTitle} from "../../components/UI";

export const GenresItem = styled.div`
  padding: 6px;
  width: 50%;
  
  @media(min-width: 480px) {
    width: 33.33%;
  }
  @media (min-width: 768px) {
    padding: 13px;
    width: 25%;
  }
  @media (min-width: 1120px) {
    width: 20%;
  }
  @media (min-width: 1380px) {
    width: 16.6%;
  }
`;

export const WrapGenres = styled.div`
  margin-left: -6px;
  margin-right: -6px;
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  
  @media (min-width: 768px) {
    margin-left: -13px;
    margin-right: -13px;
  }
`;
export const PageGenres = styled(Page)`
  ${SectionTitle} {
    margin-bottom: 30px;
  }
`;