import {useEffect, useState} from "react";

export type Validations = {
    isEmpty: boolean;
    minLength?: number;
    maxLength?: number;
    isEmail?: boolean;
}

export const useValidation = (value: string, validations: Validations) => {
    const [inputValid, setInputValid] = useState(false);
    const [textError, setTextError] = useState('')

    useEffect(() => {
        for (const validation in validations) {
            if (validation === 'minLength') {
                if ( value.length < validations.minLength!) {
                    setTextError(`The text must be ${validations.minLength} to ${validations.maxLength} characters long`)
                    return;
                }
                setTextError('');
            }

            if (validation === 'maxLength') {
                if (value.length > validations.maxLength!) {
                    setTextError(`The text must be ${validations.minLength} to ${validations.maxLength} characters long`)
                    return;
                }
            }

            if (validation === 'isEmpty') {
                if (!value.length) {
                    setTextError('Empty field')
                    return;
                }
            }

            if (validation === 'isEmail') {
                const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

                if (!re.test(String(value).toLowerCase())) {
                    setTextError('Invalid Email')
                    return;
                }
            }

            setTextError('');

        }
    },[value])

    useEffect(() => {
        if ( textError) {
            setInputValid(false);
        } else {
            setInputValid(true);
        }
    },[textError])

    return {
        inputValid,
        textError
    }
}
