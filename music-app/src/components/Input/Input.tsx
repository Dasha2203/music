import React from 'react';

import {InputContainer} from "./S.el";

import {Label, HelperText} from "../UI";
import {Input as InputUI} from "../Input";

type Props = {
    label: string,
    placeHolder: string,
    type: string,
    value: string,
    changeValue: (e: React.ChangeEvent<HTMLInputElement>) => void,
    blurEvent?: (e: React.FocusEvent<HTMLInputElement>) => void,
    error: string
}

export const Input = ({label, placeHolder, type, value, changeValue, error, blurEvent}: Props) => {
    return (
        <InputContainer>
            <Label>{label}</Label>
            <InputUI
                type={type}
                placeholder={placeHolder}
                value={value}
                onChange={(e) => changeValue(e)}
                onBlur={(e) => blurEvent ?  blurEvent(e): {}}
            />
            {error && <HelperText>{error}</HelperText>}
        </InputContainer>
    )
}