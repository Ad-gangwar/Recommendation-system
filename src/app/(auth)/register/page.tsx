import React from 'react';
import styles from './register.module.css';
import Link from 'next/link';

const Register: React.FC = () => {
  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>
        Create your <span className={styles.primaryColor}>Account</span>
      </h3>
      <form className={styles.form}>
        <input
          type="text"
          placeholder="Full Name"
          className={styles.input}
        />
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
        <input
          type="password"
          placeholder="Confirm your password"
          className={styles.input}
        />
        <div className={styles.buttonWrapper}>
          <button type="submit" className={styles.button}>
            Register
          </button>
        </div>
        <p className={styles.signupText}>
          Already have an account? <Link href="/login" className={styles.signupLink}>Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
