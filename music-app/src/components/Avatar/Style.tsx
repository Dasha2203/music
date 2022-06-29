import styled from "styled-components";

export const AvatarImg = styled.div`
  width: 85px;
  height: 85px;
  border-radius: 50%;
  overflow: hidden;
  background-color: var(--lightBlueColor);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const AvatarText = styled.div`
  font-size: 20px;
  color: var(--grayColor);
`;

export const AvatarName= styled.div`
  font-size: 32px;
  color: var(--textColor);
  font-weight: 700;
`;

export const AvatarContainer = styled.div`
  display: flex;
  align-items: center;
  
  ${AvatarImg} {
    margin-right: 30px;
  }
`;