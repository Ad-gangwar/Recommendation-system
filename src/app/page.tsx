'use client';
import React, { useEffect, useState } from 'react';
import styles from './recommendations.module.css';
import Chatbot from '@/components/chatbot';
import ProductCard from '@/components/ProductCard';
import { HashLoader } from 'react-spinners';

interface Product {
  id: string;
  name: string;
  category: string;
}

export default function Home() {
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/recommendations?userId=user1')
      .then(res => res.json())
      .then(data => {
        setRecommendations(data.recommendations || []);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load recommendations');
        setLoading(false);
      });
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Recommended for You</h1>
      {loading && <div className={styles.status}>
        <HashLoader color="blue" size={60} />
      </div>}
      {error && <div className={styles.status}>{error}</div>}
      {!loading && !error && (
        <div className={styles.recommendationsList}>
          {recommendations.length === 0 ? (
            <div className={styles.status}>No recommendations found.</div>
          ) : (
            recommendations.map(product => (
              <div key={product.id} className={styles.card}>
                <ProductCard product={product} />
              </div>
            ))
          )}
        </div>
      )}
      <Chatbot />
    </div>
  );
}
