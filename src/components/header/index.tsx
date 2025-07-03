'use client';
import React, { useEffect, useState } from 'react';
import styles from './header.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [user, setUser] = useState<{ name: string } | null>(null);
  const router = useRouter();
  
  useEffect(() => {
    const userInfoStr = localStorage.getItem('userInfo');
    if (userInfoStr) {
      const userInfo = JSON.parse(userInfoStr);
      setUser({ name: userInfo.name });
    } else {
      setUser(null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    setUser(null);
    router.push('/login');
  };

  return (
    <header className={styles.header}>
      <div className={styles.title}>Recommendation System</div>
      <div>
        {user ? (
          <>
            <span style={{ marginRight: 12 }}>Hello, {user.name}</span>
            <button onClick={handleLogout} style={{ padding: '8px 14px', borderRadius: 4, border: 'none', background: 'white', color: 'blue', cursor: 'pointer' }}>
              Log out
            </button>
          </>
        ) : (
          <Link href="/login" style={{ padding: '8px 14px', borderRadius: 4, background: 'white', color: 'blue', textDecoration: 'none' }}>
            Login
          </Link>
        )}
      </div>
    </header>
  );
}
