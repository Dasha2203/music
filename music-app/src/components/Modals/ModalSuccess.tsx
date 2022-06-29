import React from 'react';
import {Modal} from "./Modal";
import {ModalTitle} from "./S.el";
import Lottie from 'react-lottie';
import success from "../../data/animations/success.json"
type Props = {
    onClose: () => void;
    title: string;
}
export const ModalSuccess = ({onClose, title}: Props) => {
    return (
        <Modal onClose={onClose}>
            <ModalTitle>{title}</ModalTitle>
            <Lottie
               options={{
                   autoplay: true,
                   loop: false,
                   animationData: success
               }}
                height={400}
                width={400}
            />
        </Modal>
    )
}