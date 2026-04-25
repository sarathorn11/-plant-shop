import React, { useState } from 'react';
import MenuList from '../features/menu/MenuList';
import CartSidebar from '../features/cart/CartSidebar';
import './POSPage.css';

export default function POSPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  return (
    <div className="pos-page">
      <div className="pos-main">
        <MenuList activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
      </div>
      <div className="pos-sidebar-container">
        <CartSidebar />
      </div>
    </div>
  );
}
