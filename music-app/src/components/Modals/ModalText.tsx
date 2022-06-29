import React from 'react';
import {Modal} from "./Modal";
import {ModalTextApp, ModalTitle, ModalTitleApp} from "./S.el";
import Lottie from 'react-lottie';
import success from "../../data/animations/success.json"
import {ModalApp} from "./ModalApp";
import {Button} from "../Button";
type Props = {
    onClose: () => void;
    title: string;
    text: string
}
export const ModalText = ({onClose, title, text}: Props) => {
    return (
        <ModalApp onClose={onClose}>
            <ModalTitleApp>{title}</ModalTitleApp>
            <ModalTextApp>
                {text}
            </ModalTextApp>
            <Button border onClick={onClose}>Hide</Button>
        </ModalApp>
    )
}