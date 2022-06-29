import React, {useContext, useState} from "react";
import {FormTitle, FormWrap} from "./Styled.elements";
import {Button} from "../Button";
import {Input} from "../Input/Input";
import axios from "axios";
import {AppContext} from "../../context/AppContext";
import {ModalSuccess} from "../Modals/ModalSuccess";
import {ModalError} from "../Modals/ModalError";
import {PATTERN_EMAIL} from "../../constantes/patterns";
import checkEmail from "../../helpers/check/checkEmail";
import {useNavigate} from "react-router-dom";

enum ErrorsLogin {
    Email,
    Password
}

export const RegisterForm = () => {
    const {signIn} = useContext(AppContext);
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [nameError, setNameError] = useState('');
    const [loginError, setLoginError] = useState('');
    const [modal, setModal] = useState<'success' | 'error' | null>(null)
    const navigate = useNavigate();

    const register = async () => {
        try {
            let res = await axios.post('/auth/registration', {userName, email, password})

            // if (res.status === 200) {
            setModal('success')
            // navigate("/login");
            // }
        } catch (err: any) {

            setModal('error')
            if (err.response.status === 400) {
                const errorData = err.response.data;

                if (errorData.type === ErrorsLogin.Email) {
                    setLoginError(errorData.message)
                }

                if (errorData.type === ErrorsLogin.Password) {
                    setPasswordError(errorData.message);
                }
            }
        }
    }

    const closeModal = () => {
        setModal(null)
    }

    const submit = () => {
        resetError();

        if (!userName.trim()) {
            setNameError('Enter your name');
            return;
        }

        let validEmail = checkEmail(email);

        if (validEmail !== true) {
            setLoginError(validEmail);
            return
        }

        if (!password.trim()) {
            setPasswordError('Enter password')
            return;
        }

        if (password.trim().length < 3 || password.trim().length > 8) {
            setPasswordError('The password must be 6-8 characters long');
            return;
        }

        register();
    }

    function resetError() {
        setNameError('');
        setLoginError('');
        setPasswordError('');
    }

    return (
        <FormWrap>
            <FormTitle>Registration</FormTitle>
            <Input
                type="text"
                placeHolder={'Enter your name'}
                label={'Name'}
                value={userName}
                error={nameError}
                changeValue={(e) => setUserName(e.target.value)}
            />
            <Input
                type="email"
                placeHolder={'Enter your email'}
                label={'Login'}
                value={email}
                error={loginError}
                changeValue={(e) => setEmail(e.target.value)}
            />
            <Input
                type="password"
                placeHolder={'Enter your password'}
                label={'Password'}
                value={password}
                error={passwordError}
                changeValue={(e) => setPassword(e.target.value)}
            />
            <Button type={"button"} onClick={submit}>Sign up</Button>

            { modal === 'success' ? <ModalSuccess onClose={() => {closeModal(); navigate('/login')}} title={'Registration was successful'}/> : null}
            { modal === 'error' ? <ModalError onClose={closeModal} title={'Failed to register!'}/> : null}
        </FormWrap>
    )
}