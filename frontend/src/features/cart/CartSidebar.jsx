import React, { useState } from 'react';
import useCartStore from '../../store/useCartStore';
import useSettings from '../../store/useSettings';
import CartItem from './CartItem';
import PaymentModal from '../../components/PaymentModal';
import { ShoppingBag, CreditCard, Banknote } from 'lucide-react';
import './Cart.css';

export default function CartSidebar() {
  const { cart, discount, clearCart, paymentMethod, setPaymentMethod } = useCartStore();
  const { settings, getCurrencySymbol } = useSettings();
  
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const discountAmount = subtotal * (discount / 100);
  const totalBeforeTax = subtotal - discountAmount;
  
  // Use tax rate from global settings
  const currentTaxRate = parseFloat(settings.taxRate) / 100;
  const taxAmount = totalBeforeTax * currentTaxRate;
  const total = totalBeforeTax + taxAmount;
  const currencySymbol = getCurrencySymbol();

  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  return (
    <div className="cart-sidebar">
      <div className="cart-header">
        <div className="cart-title">
          <ShoppingBag size={20} />
          <h3>Current Order</h3>
        </div>
      </div>

      <div className="cart-items">
        {cart.length === 0 ? (
          <div className="empty-cart">
            <ShoppingBag size={48} className="empty-icon" />
            <p>Your cart is empty</p>
          </div>
        ) : (
          cart.map(item => <CartItem key={item.cartId} item={item} />)
        )}
      </div>

      <div className="cart-summary">
        <div className="summary-row">
          <span>Subtotal</span>
          <span>{currencySymbol}{subtotal.toFixed(2)}</span>
        </div>
        <div className="summary-row">
          <span>Discount ({discount}%)</span>
          <span className="discount-value">-{currencySymbol}{discountAmount.toFixed(2)}</span>
        </div>
        <div className="summary-row">
          <span>Tax ({(currentTaxRate * 100).toFixed(1)}%)</span>
          <span>{currencySymbol}{taxAmount.toFixed(2)}</span>
        </div>
        <div className="summary-row total">
          <span>Total</span>
          <span>{currencySymbol}{total.toFixed(2)}</span>
        </div>
      </div>

      <div className="payment-methods">
        <button 
          className={`pay-method-btn ${paymentMethod === 'cash' ? 'active' : ''}`}
          onClick={() => setPaymentMethod('cash')}
        >
          <Banknote size={18} /> Cash
        </button>
        <button 
          className={`pay-method-btn ${paymentMethod === 'card' ? 'active' : ''}`}
          onClick={() => setPaymentMethod('card')}
        >
          <CreditCard size={18} /> Card / QR
        </button>
      </div>

      <div className="cart-actions">
        <button className="clear-cart-btn" onClick={clearCart} disabled={cart.length === 0}>
          Clear
        </button>
        <button className="checkout-btn" disabled={cart.length === 0} onClick={() => setIsPaymentOpen(true)}>
          Pay {currencySymbol}{total.toFixed(2)}
        </button>
      </div>

      {isPaymentOpen && (
        <PaymentModal 
          total={total} 
          method={paymentMethod} 
          onClose={() => setIsPaymentOpen(false)} 
        />
      )}
    </div>
  );
}
