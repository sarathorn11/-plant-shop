import React, { useState, useEffect, useMemo } from 'react';
import useUIStore from '../../store/useUIStore';
import MenuItem from './MenuItem';
import './Menu.css';

export default function MenuList({ activeCategory, onCategoryChange }) {
  const searchQuery = useUIStore(state => state.searchQuery);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/products', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
          const data = await response.json();
          const formattedData = data.map(item => ({
            ...item,
            price: parseFloat(item.price)
          }));
          setProducts(formattedData);
        }
      } catch (err) {
        console.error('Failed to fetch products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Optimization: Memoize dynamic categories list
  const dynamicCategories = useMemo(() => {
    return ['All', ...new Set(products.map(p => p.category))];
  }, [products]);

  // Optimization: Memoize filtered products list
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            p.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, activeCategory, searchQuery]);

  if (loading) return <div className="menu-container" style={{padding: '2rem'}}>Loading menu...</div>;

  return (
    <div className="menu-container">
      <div className="category-tabs">
        {dynamicCategories.map(cat => (
          <button 
            key={cat} 
            className={`category-btn ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => onCategoryChange(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="product-grid">
        {filteredProducts.map(product => (
          <MenuItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
