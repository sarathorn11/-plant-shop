import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, ShoppingBag, DollarSign, Calendar, Flame } from 'lucide-react';
import './AnalyticsPage.css';

export default function AnalyticsPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState('7d'); // 'today', '7d', '30d'
  
  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      try {
        const url = new URL('http://localhost:5000/api/analytics');
        
        let startDate = new Date();
        if (dateRange === 'today') {
          // startDate is already today
        } else if (dateRange === '7d') {
          startDate.setDate(startDate.getDate() - 7);
        } else if (dateRange === '30d') {
          startDate.setDate(startDate.getDate() - 30);
        }
        
        url.searchParams.append('startDate', startDate.toISOString());
        // endDate defaults to today on the backend

        const res = await fetch(url.toString(), {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        
        if (!res.ok) throw new Error('Failed to fetch analytics');
        
        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAnalytics();
  }, [dateRange]);

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
  };

  const formatDateLabel = (dateStr) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(date);
  };

  if (loading && !data) {
    return (
      <div className="analytics-page">
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="analytics-page">
      <div className="analytics-header">
        <h2><TrendingUp color="var(--accent-color)" /> Sales & Analytics</h2>
        
        <div className="analytics-filters">
          <Calendar size={18} color="var(--text-secondary)" style={{ marginLeft: '10px' }} />
          <button 
            className={`filter-btn ${dateRange === 'today' ? 'active' : ''}`}
            onClick={() => setDateRange('today')}
          >
            Today
          </button>
          <button 
            className={`filter-btn ${dateRange === '7d' ? 'active' : ''}`}
            onClick={() => setDateRange('7d')}
          >
            Last 7 Days
          </button>
          <button 
            className={`filter-btn ${dateRange === '30d' ? 'active' : ''}`}
            onClick={() => setDateRange('30d')}
          >
            Last 30 Days
          </button>
        </div>
      </div>

      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-title">Gross Revenue</span>
            <div className="metric-icon"><DollarSign size={20} /></div>
          </div>
          <div className="metric-value">
            {formatCurrency(data?.totalRevenue || 0)}
          </div>
        </div>
        
        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-title">Total Orders</span>
            <div className="metric-icon"><ShoppingBag size={20} /></div>
          </div>
          <div className="metric-value">
            {data?.totalOrders || 0}
          </div>
        </div>
        
        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-title">Average Order Value</span>
            <div className="metric-icon"><TrendingUp size={20} /></div>
          </div>
          <div className="metric-value">
            {formatCurrency(data?.averageOrderValue || 0)}
          </div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <div className="chart-title">
            <TrendingUp size={20} color="var(--accent-color)" /> Revenue Trend
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data?.revenueOverTime || []}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--accent-color)" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="var(--accent-color)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                <XAxis 
                  dataKey="date" 
                  stroke="var(--text-secondary)" 
                  tickFormatter={formatDateLabel}
                  tick={{ fontSize: 12 }}
                  tickMargin={10}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis 
                  stroke="var(--text-secondary)" 
                  tickFormatter={(val) => `$${val}`}
                  tick={{ fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                  width={60}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--bg-tertiary)', 
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    color: 'var(--text-primary)'
                  }}
                  itemStyle={{ color: 'var(--accent-color)', fontWeight: 'bold' }}
                  labelFormatter={formatDateLabel}
                  formatter={(value) => [formatCurrency(value), 'Revenue']}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="var(--accent-color)" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-title">
            <Flame size={20} color="#ef4444" /> Top Selling Items
          </div>
          {(data?.topItems || []).length > 0 ? (
            <div className="top-items-list">
              {data.topItems.map((item, idx) => (
                <div key={`${item.name || 'unknown'}-${idx}`} className="top-item-row">
                  <div className="item-rank-info">
                    <div className="item-rank">{idx + 1}</div>
                    <div className="item-name">{item.name || 'Unknown Item'}</div>
                  </div>
                  <div className="item-stats">
                    <div className="item-qty">
                      <ShoppingBag size={14} style={{ marginRight: '4px' }} />
                      {item.quantity} {item.quantity === 1 ? 'item' : 'items'}
                    </div>
                    <div className="item-rev">{formatCurrency(item.revenue)}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
              No sales data available for this period.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
