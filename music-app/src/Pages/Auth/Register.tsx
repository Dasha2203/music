import React from 'react';

import {Page} from "../../components/UI";
import {Container} from "../../components/Container";
import {RegisterForm} from "../../components/AuthForm/RegisterForm";

export const Register = () => {
    return (
        <Container>
            <RegisterForm/>
        </Container>
    )
}