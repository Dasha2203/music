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
    error: string
}

export const TextArea = ({label, placeHolder, type, value, changeValue, error}: Props) => {
    return (
        <InputContainer>
            <Label>{label}</Label>
            <InputUI
                type={type}
                placeholder={placeHolder}
                value={value}
                onChange={(e) => changeValue(e)}
            />
            {error && <HelperText>{error}</HelperText>}
        </InputContainer>
    )
}