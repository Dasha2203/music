import React from 'react';
import {Modal} from "./Modal";
import {ModalTitle} from "./S.el";
import Lottie from 'react-lottie';
import error from "../../data/animations/error.json"

type Props = {
    onClose: () => void;
    title: string;
}
export const ModalError = ({onClose, title}: Props) => {
    return (
        <Modal onClose={onClose}>
            <ModalTitle>{title}</ModalTitle>
            <Lottie
                options={{
                    autoplay: true,
                    loop: false,
                    animationData: error
                }}
                height={400}
                width={400}
            />
        </Modal>
    )
}