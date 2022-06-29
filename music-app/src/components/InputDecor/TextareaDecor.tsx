import React from 'react';
import {Textarea, InputDecorContainer, Label} from "./Style";
import {HelperText} from "../UI";

type Props = {
    label: string,
    placeHolder: string,
    value: string,
    changeValue: (e: React.ChangeEvent<HTMLTextAreaElement>) => void,
    error: string
}

export const TextareaDecor = ({label, placeHolder,value, changeValue, error}: Props) => {
    return (
        <InputDecorContainer>
            <Label>{label}</Label>
            <Textarea
                maxLength={1000}
                placeholder={placeHolder}
                value={value}
                onChange={(e) => changeValue(e)}
            />
            {error && <HelperText>{error}</HelperText>}
        </InputDecorContainer>
    )
}