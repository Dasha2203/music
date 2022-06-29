import React from "react";
import {LoaderContainer, LoaderWrap} from "./Style";
import Lottie from 'react-lottie';
import error from "../../data/animations/loader.json";
import { Portal } from "../Portal/Portal";

export const Loader = () => {
    return (
        <Portal>
        <LoaderContainer>
            <LoaderWrap>
                <Lottie
                    options={{
                        autoplay: true,
                        loop: true,
                        animationData: error
                    }}
                    height={200}
                    width={200}
                />
            </LoaderWrap>
        </LoaderContainer>
        </Portal>
    )
}