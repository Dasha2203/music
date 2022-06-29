import styled from "styled-components";
import {Page} from "../../components/UI";
import {AvatarContainer} from "../../components/Avatar/Style";
import {Button} from "../../components/Button";

export const InformationContainer = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 800px;
  
  ${Button} {
    margin-top: 30px;
    min-width: 200px;
  }
`;

export const Wrap = styled(Page)`
    ${AvatarContainer} {
      margin-bottom: 50px;
    }
`;