import React, { useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { FormTitle, FormWrap } from "./Styled.elements";

import { Button } from "../Button";
import { Input } from "../Input/Input";

import { AppContext } from "../../context/AppContext";
import { useInput } from "../../hooks/useInput";
import { ErrorsLogin } from "../../types/login";

export const AuthForm = () => {
  const email = useInput("", { isEmpty: true, isEmail: true });
  const password = useInput("", { isEmpty: true, minLength: 3, maxLength: 6 });
  const { signIn } = useContext(AppContext);
  const navigate = useNavigate();

  const login = async () => {
    try {
      let res = await axios.post("/auth/login", {
        email: email.value,
        password: password.value,
      });

      if (res.status === 200) {
        signIn(res.data);
        navigate("/");
      }
    } catch (err: any) {
      if (err.response.status === 400) {
        const errorData = err.response.data;

        if (errorData.type === ErrorsLogin.Email) {
          // setLoginError(errorData.message)
        }

        if (errorData.type === ErrorsLogin.Password) {
          // setPasswordError(errorData.message);
        }
      }
    }
  };

  const submit = () => {
    if (!password.textError && !email.textError) {
      login();
    }
  };

  return (
    <FormWrap>
      <FormTitle>Sign in {email.isDirty}</FormTitle>
      <Input
        type="email"
        placeHolder={"Enter your email"}
        label={"Login"}
        value={email.value}
        blurEvent={email.onBlur}
        error={email.isDirty ? email.textError : ""}
        changeValue={(e) => email.onChange(e)}
      />
      <Input
        type="password"
        placeHolder={"Enter your password"}
        label={"Password"}
        value={password.value}
        blurEvent={password.onBlur}
        error={password.isDirty ? password.textError : ""}
        changeValue={(e) => password.onChange(e)}
      />
      <Button
        type={"button"}
        disabled={
          !password.value.length ||
          !email.value.length 
        }
        onClick={submit}
      >
        Sign up
      </Button>
    </FormWrap>
  );
};
