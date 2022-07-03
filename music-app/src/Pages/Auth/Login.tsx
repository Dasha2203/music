import React from 'react';
import {Page} from "../../components/UI";
import {AuthForm} from "../../components/AuthForm/AuthForm";
import {Container} from "../../components/Container";

export const Login = () => {
    return (
        <Container>
            <AuthForm/>
        </Container>
    )
}