import React, { useState} from "react";
import {useValidation, Validations} from "./useValidation";

export const useInput = (initialValue: string, validations: Validations) => {
    const [value, setValue] = useState(initialValue);
    const [isDirty, setIsDirty] = useState(false);
    const valid = useValidation(value, validations)
    const [isEmpty, setIsEmpty] = useState(!!initialValue.length)

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
        setIsEmpty(!e.target.value.length)
    }

    const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        setIsDirty(true)
        setIsEmpty(!e.target.value.length)
    }

    return {
        value,
        onChange,
        onBlur,
        isDirty,
        isEmpty,
        ...valid
    }
}