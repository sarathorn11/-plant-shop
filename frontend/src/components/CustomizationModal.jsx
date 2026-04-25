import React, { useState } from 'react';
import { X } from 'lucide-react';
import useCartStore from '../store/useCartStore';
import './Modal.css';

export default function CustomizationModal({ product, onClose }) {
  const addToCart = useCartStore(state => state.addToCart);
  const [size, setSize] = useState('Medium');
  const [sugar, setSugar] = useState('100%');
  const [ice, setIce] = useState('Normal');

  const handleAdd = () => {
    addToCart(product, { size, sugar, ice });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{textAlign: 'left'}}>
        <button className="close-btn" onClick={onClose}><X size={20}/></button>
        <h2 style={{marginBottom: '1rem'}}>Customize: {product.name}</h2>
        
        <div className="custom-group" style={{marginBottom: '1rem'}}>
          <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: 600}}>Size</label>
          <div style={{display: 'flex', gap: '0.5rem'}}>
            {['Small', 'Medium', 'Large'].map(s => (
              <button 
                key={s} 
                className={`pay-method-btn ${size === s ? 'active' : ''}`}
                onClick={() => setSize(s)}
                style={{flex: 1, padding: '0.5rem'}}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="custom-group" style={{marginBottom: '1rem'}}>
          <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: 600}}>Sugar Level</label>
          <div style={{display: 'flex', gap: '0.5rem'}}>
            {['0%', '50%', '100%', '150%'].map(s => (
              <button 
                key={s} 
                className={`pay-method-btn ${sugar === s ? 'active' : ''}`}
                onClick={() => setSugar(s)}
                style={{flex: 1, padding: '0.5rem'}}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="custom-group" style={{marginBottom: '1.5rem'}}>
          <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: 600}}>Ice Level</label>
          <div style={{display: 'flex', gap: '0.5rem'}}>
            {['No Ice', 'Less', 'Normal', 'Extra'].map(s => (
              <button 
                key={s} 
                className={`pay-method-btn ${ice === s ? 'active' : ''}`}
                onClick={() => setIce(s)}
                style={{flex: 1, padding: '0.5rem'}}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <button className="btn-primary" onClick={handleAdd}>Add to Order</button>
      </div>
    </div>
  );
}
