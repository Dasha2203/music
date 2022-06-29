import React from 'react';
import {Input, InputDecorContainer, Label} from "./Style";
import {HelperText} from "../UI";

type Props = {
    label: string,
    placeHolder: string,
    type: string,
    value: string,
    changeValue: (e: React.ChangeEvent<HTMLInputElement>) => void,
    error: string
}

export const InputDecor = ({label, placeHolder, type, value, changeValue, error}: Props) => {
    return (
        <InputDecorContainer>
            <Label>{label}</Label>
            <Input
                type={type}
                placeholder={placeHolder}
                value={value}
                onChange={(e) => changeValue(e)}
            />
            {error && <HelperText>{error}</HelperText>}
        </InputDecorContainer>
    )
}