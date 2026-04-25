import React, { useState, useEffect } from 'react';
import { Edit2, Trash2, Plus, Image as ImageIcon, Search } from 'lucide-react';

export default function MenuManagement() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [uploading, setUploading] = useState(false);
  
  // Generic form state
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    stock: '',
    image: ''
  });

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      }
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append('image', file);

    setUploading(true);
    try {
      const response = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        body: data
      });

      if (response.ok) {
        const result = await response.json();
        setFormData(prev => ({ ...prev, image: result.imageUrl }));
      } else {
        const error = await response.json();
        alert(error.message || 'Upload failed');
      }
    } catch (err) {
      alert('Network error during upload');
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();
    const isEditing = editingId !== null;
    const url = isEditing 
      ? `http://localhost:5000/api/products/${editingId}`
      : `http://localhost:5000/api/products`;
    
    const method = isEditing ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setFormData({ name: '', price: '', category: '', stock: '', image: '' });
        setEditingId(null);
        setIsFormOpen(false);
        fetchProducts(); // refresh
      } else {
        const error = await response.json();
        alert(error.message);
      }
    } catch (err) {
      alert('Network error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product permanently?')) return;
    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      if (response.ok) {
        fetchProducts();
      } else {
        const error = await response.json();
        alert(error.message);
      }
    } catch (err) {
      alert('Network error');
    }
  };

  const startEdit = (product) => {
    setEditingId(product.id);
    setFormData({
      name: product.name,
      price: product.price,
      category: product.category,
      stock: product.stock,
      image: product.image || ''
    });
    setIsFormOpen(true);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({ name: '', price: '', category: '', stock: '', image: '' });
    setIsFormOpen(false);
  };

  const inputStyle = {
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    border: '1px solid var(--border-color)',
    background: 'var(--bg-primary)',
    color: 'var(--text-color)',
    width: '100%',
    outline: 'none',
    transition: 'border-color 0.2s',
    fontSize: '0.95rem'
  };

  const labelStyle = {
    display: 'block', 
    marginBottom: '0.4rem', 
    fontSize: '0.85rem',
    color: 'var(--text-secondary)',
    fontWeight: '500'
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingBottom: '2rem' }}>
      
      {/* Header Toolbar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ position: 'relative', width: '300px' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
          <input 
            style={{ ...inputStyle, paddingLeft: '2.5rem', marginBottom: 0 }} 
            placeholder="Search menu items..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {!isFormOpen && (
          <button 
            onClick={() => setIsFormOpen(true)}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.2rem', background: 'var(--accent-color)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', transition: 'transform 0.1s' }}
          >
            <Plus size={18} /> Add New Item
          </button>
        )}
      </div>

      {/* Modern Form Card */}
      {isFormOpen && (
        <div style={{ background: 'var(--bg-secondary)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--border-color)', boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ margin: 0, fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {editingId ? <Edit2 size={20} color="var(--accent-color)" /> : <Plus size={20} color="var(--accent-color)" />}
              {editingId ? 'Edit Menu Item' : 'New Menu Item'}
            </h3>
          </div>

          <form onSubmit={handleCreateOrUpdate} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
            <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
              <div style={{ width: '100px', height: '100px', borderRadius: '12px', background: 'var(--bg-primary)', border: '2px dashed var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0 }}>
                {formData.image ? (
                  <img src={formData.image} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <ImageIcon color="var(--text-secondary)" size={32} />
                )}
              </div>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Product Image</label>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} id="imageUpload" />
                  <label htmlFor="imageUpload" style={{ padding: '0.75rem 1rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px', cursor: 'pointer', fontSize: '0.9rem', flexShrink: 0, fontWeight: '500' }}>
                    {uploading ? 'Uploading...' : 'Upload File'}
                  </label>
                  <input style={{...inputStyle, marginBottom: 0, flex: 1}} value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} placeholder="Or paste image URL..." />
                </div>
                <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Upload an image from your computer or paste a direct URL link.</p>
              </div>
            </div>

            <div>
              <label style={labelStyle}>Item Name *</label>
              <input required style={{...inputStyle, marginBottom: 0}} value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="e.g. Mocha Latte" />
            </div>
            <div>
              <label style={labelStyle}>Category *</label>
              <input required style={{...inputStyle, marginBottom: 0}} value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} placeholder="e.g. Hot Coffee" />
            </div>
            <div>
              <label style={labelStyle}>Price ($) *</label>
              <input required type="number" step="0.01" style={{...inputStyle, marginBottom: 0}} value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} placeholder="4.50" />
            </div>
            <div>
              <label style={labelStyle}>Stock Quantity *</label>
              <input required type="number" style={{...inputStyle, marginBottom: 0}} value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} placeholder="100" />
            </div>

            <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '1rem', marginTop: '1rem', justifyContent: 'flex-end' }}>
              <button type="button" onClick={cancelEdit} style={{ padding: '0.75rem 1.5rem', background: 'transparent', color: 'var(--text-color)', border: '1px solid var(--border-color)', borderRadius: '8px', cursor: 'pointer', fontWeight: '500' }}>
                Cancel
              </button>
              <button type="submit" style={{ padding: '0.75rem 2rem', background: 'var(--accent-color)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                {editingId ? 'Save Changes' : 'Create Item'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Modern Data Grid */}
      <div style={{ background: 'var(--bg-secondary)', borderRadius: '16px', border: '1px solid var(--border-color)', overflow: 'auto', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
        {loading ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>Loading menu database...</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
            <thead>
              <tr style={{ background: 'rgba(0,0,0,0.02)', borderBottom: '1px solid var(--border-color)' }}>
                <th style={{ padding: '1.2rem', fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Item</th>
                <th style={{ padding: '1.2rem', fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Category</th>
                <th style={{ padding: '1.2rem', fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Price</th>
                <th style={{ padding: '1.2rem', fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Stock</th>
                <th style={{ padding: '1.2rem', fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map(p => (
                <tr key={p.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '1rem 1.2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ width: '44px', height: '44px', borderRadius: '8px', overflow: 'hidden', background: 'var(--bg-primary)', border: '1px solid var(--border-color)' }}>
                        {p.image ? <img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <ImageIcon size={20} color="var(--text-secondary)" style={{ margin: '12px' }}/>}
                      </div>
                      <strong style={{ fontSize: '1rem' }}>{p.name}</strong>
                    </div>
                  </td>
                  <td style={{ padding: '1rem 1.2rem' }}>
                    <span style={{ padding: '0.3rem 0.8rem', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '20px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      {p.category}
                    </span>
                  </td>
                  <td style={{ padding: '1rem 1.2rem', fontWeight: '500' }}>
                    ${parseFloat(p.price).toFixed(2)}
                  </td>
                  <td style={{ padding: '1rem 1.2rem' }}>
                    <span style={{ color: p.stock < 30 ? '#ff9800' : 'inherit', fontWeight: p.stock < 30 ? 'bold' : 'normal' }}>
                      {p.stock} units
                    </span>
                  </td>
                  <td style={{ padding: '1rem 1.2rem', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                      <button 
                        onClick={() => startEdit(p)} 
                        title="Edit Item"
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', background: 'transparent', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'var(--text-color)', cursor: 'pointer' }}
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(p.id)} 
                        title="Delete Item"
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', background: 'rgba(255, 77, 77, 0.1)', border: '1px solid rgba(255, 77, 77, 0.2)', borderRadius: '8px', color: '#ff4d4d', cursor: 'pointer' }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredProducts.length === 0 && !loading && (
                <tr>
                  <td colSpan="5" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                    No menu items found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
