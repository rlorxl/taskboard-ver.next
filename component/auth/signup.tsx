import React, { useRef, useState } from 'react';
import { useRouter } from 'next/router';

import styled from 'styled-components';
import { BsArrowRightShort } from 'react-icons/bs';
import { createUser } from '../../lib/signup';
import { Button } from '../../styles/theme';
import Input from '../ui/input';

const SignUp = () => {
  const [emailIsValid, setEmailIsValid] = useState<boolean>(false);
  const [passwordIsValid, setPasswordIsValid] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const emailValidateHandler = () => {
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

    if (
      !emailRegex.test(emailInputRef.current!.value) &&
      emailInputRef.current!.value.length > 0
    ) {
      setErrorMessage('이메일 형식에 맞게 입력해주세요.');
    } else {
      setErrorMessage('');
      setEmailIsValid(true);
    }
  };

  const passwordValidateHandler = () => {
    if (
      passwordInputRef.current!.value.length > 0 &&
      passwordInputRef.current!.value.length < 7
    ) {
      setErrorMessage('패스워드를 7자리 이상 입력해주세요.');
    } else {
      setErrorMessage('');
      setPasswordIsValid(true);
    }
  };

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current!.value;
    const enteredPassword = passwordInputRef.current!.value;

    if (!emailIsValid || !passwordIsValid) {
      return;
    }

    try {
      const result = await createUser(enteredEmail, enteredPassword);
      console.log(result);
      router.replace('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <h1>Signup</h1>
      <form onSubmit={submitHandler}>
        <Input
          type='email'
          placeholder='이메일 입력'
          ref={emailInputRef}
          onChange={emailValidateHandler}
        />
        <Input
          type='password'
          placeholder='패스워드 입력'
          ref={passwordInputRef}
          onChange={passwordValidateHandler}
        />
        {<ErrorMessage>{errorMessage}</ErrorMessage>}
        <SignupBtn>
          Create account
          <BsArrowRightShort />
        </SignupBtn>
      </form>
    </Container>
  );
};

const Container = styled.div`
  width: 450px;
  height: 250px;
  margin: 0 auto;
  position: fixed;
  top: 35%;
  left: 50%;
  transform: translatex(-50%);
  text-align: center;
`;

const SignupBtn = styled(Button)`
  font-size: 1.1em;
  font-weight: bold;
  margin-top: 25px;
  color: #fff;
  &:hover {
    color: ${({ theme }) => theme.color.carrot};
  }
  svg {
    font-size: 1.7em;
  }
`;

const ErrorMessage = styled.p`
  font-size: 0.8em;
  color: ${({ theme }) => theme.color.carrot};
  padding-left: 8px;
`;

export default SignUp;
