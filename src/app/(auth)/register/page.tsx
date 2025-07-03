'use client';
import React, { useState } from 'react';
import styles from './register.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    const userInfo = { name, email, password };
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    setError('');
    toast.success('Registration successful! You can now log in.');
    router.push('/login');
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>
        Create your <span className={styles.primaryColor}>Account</span>
      </h3>
      <form className={styles.form} onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Full Name"
          className={styles.input}
          value={name}
          onChange={e => setName(e.target.value)}
        />
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
        <input
          type="password"
          placeholder="Confirm your password"
          className={styles.input}
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
        />
        {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
        <button type="submit" className={styles.button}>
          Register
        </button>
        <p className={styles.signupText}>
          Already have an account? <Link href="/login" className={styles.signupLink}>Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
