import React from 'react';
import {ModalContainer, ModalWrapApp} from "./S.el";
import {ReactComponent as IconClose} from "../../assets/close.svg";
import {Portal} from "../Portal/Portal";

type Props = {
    children: React.ReactNode,
    onClose: () => void,
};

export const ModalApp = ({children, onClose}: Props) => {

    const closeModal = (e: any) => {
        e.stopPropagation();
        onClose();
    }

    return (

            <ModalContainer onClick={onClose}>
                <ModalWrapApp onClick={(e) => e.stopPropagation()}>
                    <IconClose className="close" onClick={closeModal}/>
                    { children }
                </ModalWrapApp>
            </ModalContainer>

    )
}