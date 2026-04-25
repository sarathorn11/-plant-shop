import React, { useState, useEffect } from 'react';
import { UserPlus, Trash2, Shield, Search, Edit2 } from 'lucide-react';

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Cashier');
  const [statusMsg, setStatusMsg] = useState('');

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/users', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      if (response.ok) {
        setUsers(await response.json());
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();
    setStatusMsg('');

    const isEditing = editingId !== null;
    const url = isEditing 
      ? `http://localhost:5000/api/auth/users/${editingId}`
      : `http://localhost:5000/api/auth/register`;
    
    const method = isEditing ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ username, password, role })
      });

      const data = await response.json();

      if (response.ok) {
        setUsername('');
        setPassword('');
        setRole('Cashier');
        setEditingId(null);
        setIsFormOpen(false);
        fetchUsers();
      } else {
        setStatusMsg(`Error: ${data.message}`);
      }
    } catch (err) {
      setStatusMsg('Error: Could not connect to server.');
    }
  };

  const startEdit = (user) => {
    setEditingId(user.id);
    setUsername(user.username);
    setRole(user.role);
    setPassword(''); // leave blank for editing
    setIsFormOpen(true);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setUsername('');
    setPassword('');
    setRole('Cashier');
    setIsFormOpen(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this staff account permanently?')) return;
    try {
      const response = await fetch(`http://localhost:5000/api/auth/users/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      if (response.ok) {
        fetchUsers();
      } else {
        const error = await response.json();
        alert(error.message);
      }
    } catch (err) {
      alert('Network error');
    }
  };

  const inputStyle = {
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    border: '1px solid var(--border-color)',
    background: 'var(--bg-primary)',
    color: 'var(--text-color)',
    width: '100%',
    outline: 'none',
    fontSize: '0.95rem'
  };

  const labelStyle = {
    display: 'block', 
    marginBottom: '0.4rem', 
    fontSize: '0.85rem',
    color: 'var(--text-secondary)',
    fontWeight: '500'
  };

  const filteredUsers = users.filter(u => 
    u.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingBottom: '2rem' }}>
      
      {/* Header Toolbar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ position: 'relative', width: '300px' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
          <input 
            style={{ ...inputStyle, paddingLeft: '2.5rem', marginBottom: 0 }} 
            placeholder="Search staff..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {!isFormOpen && (
          <button 
            onClick={() => setIsFormOpen(true)}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.2rem', background: 'var(--accent-color)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', transition: 'transform 0.1s' }}
          >
            <UserPlus size={18} /> Register Staff
          </button>
        )}
      </div>

      {isFormOpen && (
        <div style={{ background: 'var(--bg-secondary)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--border-color)', boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ margin: 0, fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {editingId ? <Edit2 size={20} color="var(--accent-color)" /> : <Shield size={20} color="var(--accent-color)" />}
              {editingId ? 'Edit Staff Account' : 'Create New Staff Account'}
            </h3>
          </div>
          
          {statusMsg && (
            <div style={{ padding: '1rem', marginBottom: '1.5rem', borderRadius: '8px', background: 'rgba(244, 67, 54, 0.1)', color: '#F44336' }}>
              {statusMsg}
            </div>
          )}

          <form onSubmit={handleCreateOrUpdate} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
            <div>
              <label style={labelStyle}>Username *</label>
              <input required style={{...inputStyle, marginBottom: 0}} value={username} onChange={e => setUsername(e.target.value)} placeholder="e.g. jdoe_barista" />
            </div>
            <div>
              <label style={labelStyle}>Password {editingId ? '(Leave blank to keep)' : '*'}</label>
              <input required={!editingId} type="password" style={{...inputStyle, marginBottom: 0}} value={password} onChange={e => setPassword(e.target.value)} placeholder="Minimum 6 characters" />
            </div>
            <div>
              <label style={labelStyle}>System Role *</label>
              <select style={{...inputStyle, marginBottom: 0, cursor: 'pointer'}} value={role} onChange={e => setRole(e.target.value)}>
                <option value="Cashier">Cashier</option>
                <option value="Barista">Barista</option>
                <option value="InventoryManager">Inventory Manager</option>
                <option value="Admin">Store Admin</option>
              </select>
            </div>

            <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '1rem', marginTop: '1rem', justifyContent: 'flex-end' }}>
              <button type="button" onClick={cancelEdit} style={{ padding: '0.75rem 1.5rem', background: 'transparent', color: 'var(--text-color)', border: '1px solid var(--border-color)', borderRadius: '8px', cursor: 'pointer', fontWeight: '500' }}>
                Cancel
              </button>
              <button type="submit" style={{ padding: '0.75rem 2rem', background: 'var(--accent-color)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                {editingId ? 'Save Changes' : 'Create Account'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Staff Data Grid */}
      <div style={{ background: 'var(--bg-secondary)', borderRadius: '16px', border: '1px solid var(--border-color)', overflow: 'auto', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
        {loading ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>Loading staff accounts...</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
            <thead>
              <tr style={{ background: 'rgba(0,0,0,0.02)', borderBottom: '1px solid var(--border-color)' }}>
                <th style={{ padding: '1.2rem', fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Staff Member</th>
                <th style={{ padding: '1.2rem', fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>System Role</th>
                <th style={{ padding: '1.2rem', fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Date Added</th>
                <th style={{ padding: '1.2rem', fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(u => (
                <tr key={u.id} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background 0.2s', ':hover': { background: 'rgba(0,0,0,0.01)' } }}>
                  <td style={{ padding: '1rem 1.2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--accent-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                        <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{u.username.charAt(0).toUpperCase()}</span>
                      </div>
                      <strong style={{ fontSize: '1rem' }}>{u.username}</strong>
                    </div>
                  </td>
                  <td style={{ padding: '1rem 1.2rem' }}>
                    <span style={{ 
                      padding: '0.3rem 0.8rem', 
                      background: u.role === 'Admin' ? 'rgba(255, 77, 77, 0.1)' : 'var(--bg-primary)', 
                      border: '1px solid',
                      borderColor: u.role === 'Admin' ? 'rgba(255, 77, 77, 0.2)' : 'var(--border-color)',
                      color: u.role === 'Admin' ? '#ff4d4d' : 'var(--text-secondary)',
                      borderRadius: '20px', 
                      fontSize: '0.85rem', 
                      fontWeight: u.role === 'Admin' ? 'bold' : 'normal'
                    }}>
                      {u.role}
                    </span>
                  </td>
                  <td style={{ padding: '1rem 1.2rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    {new Date(u.createdAt).toLocaleDateString()}
                  </td>
                  <td style={{ padding: '1rem 1.2rem', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                      <button 
                        onClick={() => startEdit(u)} 
                        title="Edit Account"
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', background: 'transparent', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'var(--text-color)', cursor: 'pointer', transition: 'all 0.2s' }}
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(u.id)} 
                        title="Delete Account"
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', background: 'rgba(255, 77, 77, 0.1)', border: '1px solid rgba(255, 77, 77, 0.2)', borderRadius: '8px', color: '#ff4d4d', cursor: 'pointer', transition: 'all 0.2s' }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && !loading && (
                <tr>
                  <td colSpan="4" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                    No staff accounts found.
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
