import React, { useState, useEffect } from 'react';
import useAuthStore from '../store/useAuthStore';
import useSettings from '../store/useSettings';
import { ShoppingBag, Eye, Calendar, Clock, CreditCard, Banknote, X, CheckCircle, Clock as ClockIcon, XCircle, Printer, ChevronLeft, ChevronRight } from 'lucide-react';
import './OrdersPage.css';
import '../components/Modal.css'; // Import to use .modal-overlay, .modal-content, .spinner

export default function OrdersPage() {
  const { getCurrencySymbol } = useSettings();
  const currencySymbol = getCurrencySymbol();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showReceipt, setShowReceipt] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const url = new URL('http://localhost:5000/api/orders/history');
        url.searchParams.append('page', currentPage.toString());
        url.searchParams.append('limit', pageSize.toString());
        if (startDate) {
          url.searchParams.append('startDate', startDate);
        }
        if (endDate) {
          url.searchParams.append('endDate', endDate);
        }
        
        const res = await fetch(url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (!res.ok) throw new Error('Failed to fetch orders');
        const data = await res.json();
        setOrders(data.orders || []);
        setTotalPages(data.totalPages || 1);
        setTotalItems(data.totalItems || 0);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [startDate, endDate, currentPage, pageSize]);

  const formatDate = (dateString) => {
    const d = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short', day: 'numeric', year: 'numeric'
    }).format(d);
  };

  const formatTime = (dateString) => {
    const d = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric', minute: '2-digit', hour12: true
    }).format(d);
  };

  const statusConfig = {
    pending: { icon: ClockIcon, class: 'status-pending', text: 'Pending' },
    processing: { icon: ClockIcon, class: 'status-pending', text: 'Processing' },
    preparing: { icon: ClockIcon, class: 'status-pending', text: 'Preparing' },
    ready: { icon: CheckCircle, class: 'status-completed', text: 'Ready' },
    completed: { icon: CheckCircle, class: 'status-completed', text: 'Completed' },
    cancelled: { icon: XCircle, class: 'status-cancelled', text: 'Cancelled' },
  };

  const getStatusIcon = (status) => {
    const config = statusConfig[status?.toLowerCase()] || statusConfig.pending;
    const Icon = config.icon;
    return <Icon size={14} />;
  };

  const getStatusClass = (status) => {
    return statusConfig[status?.toLowerCase()]?.class || 'status-pending';
  };

  return (
    <div className="orders-page">
      <div className="orders-page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2><ShoppingBag color="var(--accent-color)" /> Order History</h2>
          <p>Review and manage all past transactions processed by you.</p>
        </div>
        <div className="order-filters" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <label style={{ fontWeight: '500', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Date Range:
          </label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input 
              type="date" 
              value={startDate} 
              onChange={(e) => { setStartDate(e.target.value); setCurrentPage(1); }}
              title="Start Date"
              style={{ 
                padding: '0.5rem 0.75rem', 
                borderRadius: '8px', 
                border: '1px solid var(--border-color)', 
                background: 'var(--bg-secondary)', 
                color: 'var(--text-primary)',
                fontFamily: 'inherit',
                fontSize: '0.9rem',
                outline: 'none'
              }}
            />
            <span style={{ color: 'var(--text-secondary)' }}>to</span>
            <input 
              type="date" 
              value={endDate} 
              onChange={(e) => { setEndDate(e.target.value); setCurrentPage(1); }}
              title="End Date"
              style={{ 
                padding: '0.5rem 0.75rem', 
                borderRadius: '8px', 
                border: '1px solid var(--border-color)', 
                background: 'var(--bg-secondary)', 
                color: 'var(--text-primary)',
                fontFamily: 'inherit',
                fontSize: '0.9rem',
                outline: 'none'
              }}
            />
            {(startDate || endDate) && (
              <button 
                onClick={() => { setStartDate(''); setEndDate(''); setCurrentPage(1); }}
                style={{ 
                  background: 'transparent', 
                  border: 'none', 
                  cursor: 'pointer', 
                  color: 'var(--danger-color)', 
                  display: 'flex',
                  padding: '4px'
                }}
                title="Clear Filters"
              >
                <XCircle size={18} />
              </button>
            )}
          </div>
        </div>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>
          <div className="spinner"></div>
        </div>
      ) : orders.length === 0 ? (
        <div className="empty-state">
          <ShoppingBag size={48} opacity={0.5} />
          <p>No order history found.</p>
        </div>
      ) : (
        <>
          <div className="orders-list-wrapper">
            <div className="orders-list-header">
              <div className="col-id">Order Info</div>
              <div className="col-items">Items Summary</div>
              <div className="col-total">Total</div>
              <div className="col-actions"></div>
            </div>
            <div className="orders-list">
              {orders.map((order) => {
                const itemsList = Array.isArray(order.items) ? order.items : [];
                const itemCount = itemsList.reduce((acc, current) => acc + (current.qty || 1), 0);
                const previewText = itemsList.map(i => `${i.qty}x ${i.name}`).join(', ');

                return (
                  <div key={order.id} className="order-list-item" onClick={() => setSelectedOrder(order)}>
                    <div className="col-id">
                      <span className="order-number">{order.orderNumber}</span>
                      <span className="order-date">{formatDate(order.createdAt)} • {formatTime(order.createdAt)}</span>
                    </div>
                    
                    <div className="col-items">
                      <span className="item-count-badge">
                        <ShoppingBag size={14} style={{ marginRight: '4px' }} />
                        {itemCount} {itemCount === 1 ? 'item' : 'items'}
                      </span>
                      <span className="item-preview-text">{previewText || 'No items'}</span>
                    </div>

                    <div className="col-total">
                      <span className="order-price">{currencySymbol}{parseFloat(order.totalPrice).toFixed(2)}</span>
                    </div>

                    <div className="col-actions">
                      <button className="btn-view-details" onClick={(e) => {
                        e.stopPropagation();
                        setSelectedOrder(order);
                      }}>
                        <Eye size={16} /> Details
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="pagination-controls">
              <div className="page-size-selector">
                <span>Show</span>
                <select 
                  value={pageSize} 
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
                <span>per page</span>
              </div>

              <div className="pagination-nav">
                <button 
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="pagination-btn"
                >
                  <ChevronLeft size={16} /> Previous
                </button>
                
                <div className="pagination-info">
                  <span>Page {currentPage} of {totalPages}</span>
                  <span className="pagination-total-items">({totalItems} total orders)</span>
                </div>
                
                <button 
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="pagination-btn"
                >
                  Next <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {selectedOrder && (
        <div className="modal-overlay">
          <div className="modal-content" style={{maxWidth: '500px'}}>
            <button className="close-btn" onClick={() => { setSelectedOrder(null); setShowReceipt(false); }}><X size={20}/></button>
            
            {showReceipt ? (
              <div className="receipt-view">
                <div className="receipt-paper">
                  <h2>BrewPOS</h2>
                  <p>Receipt {selectedOrder.orderNumber ? `#${selectedOrder.orderNumber}` : ''}</p>
                  <div className="receipt-items">
                    {Array.isArray(selectedOrder.items) && selectedOrder.items.map((item, idx) => (
                      <div key={idx} className="receipt-item-row">
                        <span>{item.qty}x {item.name}</span>
                        <span>{currencySymbol}{(item.price * item.qty).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="receipt-total">
                    <strong>Total</strong>
                    <strong>{currencySymbol}{parseFloat(selectedOrder.totalPrice).toFixed(2)}</strong>
                  </div>
                </div>
                <div className="success-actions" style={{ marginTop: '1.5rem' }}>
                  <button className="btn-secondary" onClick={() => window.print()}>
                    <Printer size={18} /> Print Now
                  </button>
                  <button className="btn-secondary" onClick={() => setShowReceipt(false)}>
                    Back to Details
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="order-detail-header">
                  <h2>Order {selectedOrder.orderNumber}</h2>
                  <div className="detail-meta">
                    <span>{formatDate(selectedOrder.createdAt)} at {formatTime(selectedOrder.createdAt)}</span>
                  </div>
                </div>

                <div className="detail-list">
                  {Array.isArray(selectedOrder.items) && selectedOrder.items.map((item, idx) => (
                    <div key={idx} className="detail-item-row">
                      <div className="item-info">
                        <div className="item-qty">{item.qty}</div>
                        <div className="item-name">{item.name}</div>
                      </div>
                      <div className="item-price">{currencySymbol}{(item.price * item.qty).toFixed(2)}</div>
                    </div>
                  ))}
                </div>

                <div className="detail-summary">
                  <div className="detail-summary-row">
                    <span>Total Paid</span>
                    <span>{currencySymbol}{parseFloat(selectedOrder.totalPrice).toFixed(2)}</span>
                  </div>
                </div>

                <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                  <button className="btn-secondary" onClick={() => setShowReceipt(true)}>
                    <Printer size={18} /> Reprint Receipt
                  </button>
                  <button className="btn-secondary" onClick={() => { setSelectedOrder(null); setShowReceipt(false); }}>Close Window</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
