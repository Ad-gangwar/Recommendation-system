'use client';
import React, { useState } from 'react';
import styles from './login.module.css';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const userInfoStr = localStorage.getItem('userInfo');
    if (!userInfoStr) {
      setError('No user found. Please register first.');
      return;
    }
    const userInfo = JSON.parse(userInfoStr);
    if (userInfo.email === email && userInfo.password === password) {
      setError('');
      toast.success('Login successful!');
      router.push('/');
    } else {
      setError('Invalid email or password.');
    }
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>
        Hello! <span className={styles.primaryColor}>Welcome</span> Back 🎉
      </h3>
      <form className={styles.form} onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter your email"
          className={styles.input}
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter your password"
          className={styles.input}
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
        
        <button type="submit" className={styles.button}>
          Login
        </button>
        <p className={styles.signupText}>
          Don&apos;t have an account? <Link href="/register" className={styles.signupLink}>Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
