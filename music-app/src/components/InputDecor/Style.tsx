import styled from "styled-components";
import {HelperText} from "../UI";

export const Input = styled.input`
  padding: 16.5px 20px;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.2;
  color: var(--textColor);
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 2px solid var(--grayColor);
  outline: none;
  transition: all .3s ease-in-out;
  background-color: var(--darkestColor);
  
  &:focus {
    border-bottom: 2px solid var(--blueColor);
    background-color: var(--darkestColor);
  }
  
  &::placeholder {
    font-size: 14px;
    font-weight: 400;
    line-height: 1.2;
    color: var(--grayColor);
    opacity: 0.5;
  }
`;

export const Textarea = styled.textarea`
  padding: 16.5px 20px;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.2;
  height: 200px;
  color: var(--textColor);
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 2px solid var(--grayColor);
  outline: none;
  transition: all .3s ease-in-out;
  background-color: var(--darkestColor);
  
  &:focus {
    border-bottom: 2px solid var(--blueColor);
    background-color: var(--darkestColor);
  }
  
  &::placeholder {
    font-size: 14px;
    font-weight: 400;
    line-height: 1.2;
    color: var(--grayColor);
    opacity: 0.5;
  }
`;

export const Label = styled.label`
  margin-bottom: 5px;
  display: block;
  font-size: 14px;
  font-weight: 300;
  text-align: left;
  color: var(--grayColor);
`;


export const InputDecorContainer = styled.div`
  padding-bottom: 15px;
  position: relative;
  display: flex;
  flex-direction: column;
  
  ${Label} {
    display: block;
    margin-bottom: 10px;
  }
  
  ${HelperText} {
    position: absolute;
    bottom: 0;
    left: 0;
  }
`;