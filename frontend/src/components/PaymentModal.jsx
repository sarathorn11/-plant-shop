import React, { useState, useEffect } from 'react';
import { CheckCircle, X, Printer, Loader } from 'lucide-react';
import useCartStore from '../store/useCartStore';
import useAuthStore from '../store/useAuthStore';
import useSettings from '../store/useSettings';
import './Modal.css';

export default function PaymentModal({ total, method, onClose }) {
  const { getCurrencySymbol } = useSettings();
  const currencySymbol = getCurrencySymbol();
  const { cart, clearCart, paymentStep, setPaymentStep } = useCartStore();
  const authStore = useAuthStore();
  const [cashGiven, setCashGiven] = useState(total);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderNumber, setOrderNumber] = useState(null);

  const submitOrderToServer = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch(`http://localhost:5000/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          items: cart,
          totalPrice: total,
          paymentStatus: 'paid',
          paymentMethod: method
        })
      });
      if (res.ok) {
        const data = await res.json();
        setOrderNumber(data.orderNumber);
        setPaymentStep('success');
      } else {
        const errData = await res.json().catch(() => ({}));
        alert(`Failed to create order on server. Details: ${errData.error || errData.message || res.statusText}`);
        setPaymentStep('idle');
        onClose();
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting order.");
      setPaymentStep('idle');
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (method === 'card') {
      setPaymentStep('processing');
      const timer = setTimeout(() => {
        submitOrderToServer();
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      setPaymentStep('payment');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [method]);

  const handleCashPay = () => {
    if (cashGiven >= total) {
      submitOrderToServer();
    } else {
      alert("Insufficient cash provided.");
    }
  };

  const handleFinish = () => {
    clearCart();
    onClose();
  };

  const handleClose = () => {
    setPaymentStep('idle');
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={handleClose} disabled={isSubmitting}><X size={20}/></button>

        {paymentStep === 'processing' && (
          <div className="processing-view">
            <div className="spinner"></div>
            <h3>Awaiting QR Scan...</h3>
            <p>Customer is scanning the code on their screen.</p>
          </div>
        )}

        {paymentStep === 'payment' && (
          <div className="cash-view">
            <h3>Cash Payment</h3>
            <p className="total-due">Total Due: {currencySymbol}{total.toFixed(2)}</p>
            <div className="input-group">
              <label>Amount Received:</label>
              <input 
                type="number" 
                value={cashGiven} 
                onChange={e => setCashGiven(Number(e.target.value))}
                min={total}
                step="0.01"
                disabled={isSubmitting}
              />
            </div>
            {cashGiven >= total && (
              <p className="change-due">Change: {currencySymbol}{(cashGiven - total).toFixed(2)}</p>
            )}
            <button className="btn-primary" onClick={handleCashPay} disabled={isSubmitting}>
              {isSubmitting ? 'Processing...' : 'Complete Payment'}
            </button>
          </div>
        )}

        {paymentStep === 'success' && (
          <div className="success-view">
            <CheckCircle size={64} className="success-icon" />
            <h2>Payment Successful!</h2>
            {orderNumber && <p>Order #{orderNumber}</p>}
            {method === 'cash' && (
              <p>Change Due: {currencySymbol}{(cashGiven - total).toFixed(2)}</p>
            )}
            <div className="success-actions">
              <button className="btn-secondary" onClick={() => setPaymentStep('receipt')}>
                <Printer size={18} /> Print Receipt
              </button>
              <button className="btn-primary" onClick={handleFinish}>New Order</button>
            </div>
          </div>
        )}

        {paymentStep === 'receipt' && (
          <div className="receipt-view">
            <div className="receipt-paper">
              <h2>BrewPOS</h2>
              <p>Receipt {orderNumber ? `#${orderNumber}` : ''}</p>
              <div className="receipt-items">
                {cart.map(item => (
                  <div key={item.cartId} className="receipt-item-row">
                    <span>{item.qty}x {item.name}</span>
                    <span>{currencySymbol}{(item.price * item.qty).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="receipt-total">
                <strong>Total</strong>
                <strong>{currencySymbol}{total.toFixed(2)}</strong>
              </div>
            </div>
            <button className="btn-primary" onClick={handleFinish}>Done</button>
          </div>
        )}
      </div>
    </div>
  );
}
