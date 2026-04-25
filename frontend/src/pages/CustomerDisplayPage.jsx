import React from 'react';
import useCartStore from '../store/useCartStore';

export default function CustomerDisplayPage() {
  const { cart, taxRate, discount, paymentStep, paymentMethod } = useCartStore();

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const discountAmount = subtotal * (discount / 100);
  const totalBeforeTax = subtotal - discountAmount;
  const taxAmount = totalBeforeTax * taxRate;
  const total = totalBeforeTax + taxAmount;

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)', fontFamily: "'Inter', sans-serif" }}>
      {/* Left: Order Summary */}
      <div style={{ flex: 1, padding: '3rem', display: 'flex', flexDirection: 'column', borderRight: '1px solid var(--border-color)' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '2rem', color: 'var(--accent-color)' }}>Your Order</h1>
        {cart.length === 0 ? (
          <p style={{ fontSize: '2rem', color: 'var(--text-secondary)' }}>Awaiting items...</p>
        ) : (
          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingRight: '1rem' }}>
            {cart.map(item => (
              <div key={item.cartId} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.5rem', background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '12px' }}>
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                  <img src={item.image} alt={item.name} style={{ width: '80px', height: '80px', borderRadius: '8px', objectFit: 'cover' }} />
                  <div>
                    <div style={{ fontWeight: 600 }}>{item.qty}x {item.name}</div>
                    {item.options && (item.options.size || item.options.sugar) && (
                      <div style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                        {item.options.size} • Sugar: {item.options.sugar} • Ice: {item.options.ice}
                      </div>
                    )}
                  </div>
                </div>
                <div style={{ fontWeight: 'bold', color: 'var(--accent-color)' }}>${(item.price * item.qty).toFixed(2)}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right: Payment Info & QR */}
      <div style={{ width: '450px', backgroundColor: 'var(--bg-secondary)', padding: '3rem', display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '2.5rem' }}>Payment</h2>
        <div style={{ fontSize: '1.5rem', display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div style={{ fontSize: '1.5rem', display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
          <span>Tax</span>
          <span>${taxAmount.toFixed(2)}</span>
        </div>
        <div style={{ fontSize: '2.5rem', fontWeight: 'bold', borderTop: '2px dashed var(--border-color)', paddingTop: '2rem', marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between', color: 'var(--text-primary)' }}>
          <span>Total</span>
          <span style={{ color: 'var(--success-color)' }}>${total.toFixed(2)}</span>
        </div>

        {paymentStep === 'success' && (
          <div style={{ marginTop: 'auto', textAlign: 'center', background: 'var(--success-color)', padding: '3rem', borderRadius: '24px' }}>
            <h2 style={{color: 'white', fontSize: '2rem'}}>Payment Successful!</h2>
            <p style={{color: 'white', fontSize: '1.2rem', marginTop: '1rem'}}>Thank you for your order.</p>
          </div>
        )}

        {paymentStep === 'processing' && paymentMethod === 'card' && total > 0 && (
          <div style={{ marginTop: 'auto', textAlign: 'center', background: 'var(--text-primary)', padding: '3rem', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.3)', animation: 'pulse 2s infinite' }}>
            <img src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=Pay+$${total.toFixed(2)}`} alt="QR Code" style={{ width: '100%', height: 'auto', margin: '0 auto', display: 'block', borderRadius: '16px' }} />
            <p style={{ color: 'var(--bg-primary)', fontSize: '1.5rem', fontWeight: '800', marginTop: '2rem', letterSpacing: '1px' }}>SCAN QR TO PAY</p>
          </div>
        )}
        
        {paymentStep === 'payment' && paymentMethod === 'cash' && total > 0 && (
           <div style={{ marginTop: 'auto', textAlign: 'center', background: 'var(--bg-tertiary)', padding: '3rem', borderRadius: '24px', border: '1px solid var(--border-color)' }}>
              <h2 style={{color: 'var(--text-primary)', fontSize: '2rem'}}>Hand Cash to Cashier</h2>
              <p style={{color: 'var(--accent-color)', fontSize: '2.5rem', fontWeight: 'bold', marginTop: '1rem'}}>${total.toFixed(2)}</p>
           </div>
        )}
      </div>
      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.02); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
