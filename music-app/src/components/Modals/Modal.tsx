import React from 'react';
import {ModalContainer, ModalWrap} from "./S.el";
import {ReactComponent as IconClose} from "../../assets/close.svg";

type Props = {
    children: React.ReactNode,
    onClose: () => void,
};

export const Modal = ({children, onClose}: Props) => {
    return (
        <ModalContainer onClick={onClose}>
            <ModalWrap>
                <IconClose className="close" onClick={onClose}/>
                {children}
            </ModalWrap>
        </ModalContainer>
    )
}