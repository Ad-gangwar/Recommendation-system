import React from 'react';
import styles from './login.module.css';
import Link from 'next/link';

const Login: React.FC = () => {
  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>
        Hello! <span className={styles.primaryColor}>Welcome</span> Back 🎉
      </h3>
      <form className={styles.form}>
        <input
          type="email"
          placeholder="Enter your email"
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Enter your password"
          className={styles.input}
        />
        <div className={styles.buttonWrapper}>
          <button type="submit" className={styles.button}>
            Login
          </button>
        </div>
        <p className={styles.signupText}>
          Don&apos;t have an account? <Link href="/register" className={styles.signupLink}>Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
