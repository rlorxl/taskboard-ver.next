import Link from 'next/link';
import React, { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';

import { BsArrowRightShort } from 'react-icons/bs';
import classes from './login.module.css';

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
    <div className={classes.signinWrap}>
      <h1>Planit</h1>
      <div className={classes.linkWrap}>
        <Link href='/signup' className={classes.signupLink}>
          <span>Signup</span>
          <BsArrowRightShort />
        </Link>
      </div>
      <form onSubmit={loginHandler}>
        <input
          type='text'
          placeholder='이메일'
          autoFocus
          ref={emailInputRef}
          onChange={touchedHandler}
        />
        <input
          type='password'
          placeholder='패스워드'
          ref={passwordInputRef}
          onChange={touchedHandler}
        />
        {isAllTouched && <button>Press Enter</button>}
      </form>
    </div>
  );
};

export default Login;
