import React from 'react'
import styles from './productcard.module.css';

interface Product {
    id: string;
    name: string;
    category: string;
}

export default function ProductCard({ product }: { product: Product }) {
    return (
        <div>
            <div className={styles.imagePlaceholder}></div>
            <div className={styles.productName}>{product.name}</div>
            <div className={styles.productCategory}>{product.category}</div>
        </div>
    )
}
