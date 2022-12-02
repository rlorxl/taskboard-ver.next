import Link from 'next/link';
import React, { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';

import { BsArrowRightShort } from 'react-icons/bs';
import styled from 'styled-components';
import Input from '../ui/input';
import { Button } from '../../styles/theme';

const Login = () => {
  const [isAllTouched, setIsAllTouched] = useState<boolean>(false);

  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const touchedHandler = () => {
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

    const valid =
      emailRegex.test(emailInputRef.current!.value) &&
      passwordInputRef.current!.value.length > 4;

    if (valid) {
      setIsAllTouched(true);
    } else {
      setIsAllTouched(false);
    }
  };

  const loginHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current!.value;
    const enteredPassword = passwordInputRef.current!.value;

    const result = await signIn('credentials', {
      redirect: false,
      email: enteredEmail,
      password: enteredPassword,
    });

    if (!result?.error) {
      await router.replace('/home');
    }
  };

  return (
    <Container>
      <h1>Planit</h1>
      <LinkWrapper>
        <SignupLink href='/signup'>
          <span>Signup</span>
          <BsArrowRightShort />
        </SignupLink>
      </LinkWrapper>
      <form onSubmit={loginHandler}>
        <Input
          type='text'
          placeholder='이메일'
          autoFocus
          ref={emailInputRef}
          onChange={touchedHandler}
        />
        <Input
          type='password'
          placeholder='패스워드'
          ref={passwordInputRef}
          onChange={touchedHandler}
        />
        {isAllTouched && <LoginBtn>Press Enter</LoginBtn>}
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
  p {
    color: ${({ theme }) => theme.color.carrot};
    font-size: 0.8em;
  }
`;

const LoginBtn = styled(Button)`
  color: ${({ theme }) => theme.color.carrot};
  font-size: 1.3em;
  margin-top: 40px;
  animation: fadeIn 0.7s ease;
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 100;
    }
  }
`;

const LinkWrapper = styled.div`
  width: 100%;
  height: 27px;
  position: relative;
`;

const SignupLink = styled(Link)`
  display: flex;
  justify-content: end;
  align-items: center;
  color: #fff;
  text-align: end;
  padding-right: 8px;
  width: 80px;
  position: absolute;
  right: 0;
  &:hover {
    text-decoration: underline;
  }
  svg {
    font-size: 1.6em;
  }
`;

export default Login;
