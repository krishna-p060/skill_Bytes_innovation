// components/Login.tsx
"use client";
import React, { useState, ChangeEvent, FormEvent } from 'react';
import styles from './login.module.css';
import Link from "next/link";

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });

  const validate = () => {
    let tempErrors = { email: '', password: '' };
    if (!email) {
      tempErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = 'Email is invalid';
    }
    if (!password) {
      tempErrors.password = 'Password is required';
    }
    setErrors(tempErrors);
    return Object.values(tempErrors).every(x => x === '');
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log({ email, password });
      // Handle login logic here
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.info}>
        <h2>
          Get ready to experience
        </h2>
        <h1 >
          Byte-sized learning
        </h1>
        <p >
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem, sapiente. Unde repellat modi nesciunt voluptate laboriosam mollitia atque aperiam dolor! Ea, quo architecto. Commodi animi deleniti velit fugiat. Hic aliquam eius quidem voluptate neque a ea mollitia provident in tenetur.
        </p>
      </div>
      <div className={styles.login_cont}>
        <h2>Login</h2>
        <form className={styles.login_form} onSubmit={handleSubmit}>
          <div className={styles.form_element}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              />
            <div className={styles.form_element_error}>{errors.email}</div>
          </div>
          <div className={styles.form_element}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              value={password}
              onChange={handleChange}
            />
            <div className={styles.form_element_error}>{errors.password}</div>
          </div>
          <button className={styles.login_btn_email} type="submit">Login</button>
        </form>
        <div className={styles.redirect}> New user? <Link href="/signup">Signup</Link></div>
        <span>or</span>
        <button className={styles.login_btn_google}>Continue with Google</button>
      </div>
    </div>
  );
};

export default Login;
