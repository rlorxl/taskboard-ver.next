import React, { useRef, useState } from 'react';
import { useRouter } from 'next/router';

import { BsArrowRightShort } from 'react-icons/bs';
import classes from './signup.module.css';
import { createUser } from '../lib/signup';

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
    <div className={classes.signupWrap}>
      <h1>Signup</h1>
      <form onSubmit={submitHandler}>
        <input
          type='email'
          placeholder='이메일 입력'
          ref={emailInputRef}
          onChange={emailValidateHandler}
        />
        <input
          type='password'
          placeholder='패스워드 입력'
          ref={passwordInputRef}
          onChange={passwordValidateHandler}
        />
        {<p className={classes.errorMessage}>{errorMessage}</p>}
        <button className={classes.signupBtn}>
          Create account
          <BsArrowRightShort />
        </button>
      </form>
    </div>
  );
};

export default SignUp;
