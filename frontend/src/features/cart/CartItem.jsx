import React, { useState, useRef, useEffect } from 'react';
import { Minus, Plus, Trash2, Edit3, Check } from 'lucide-react';
import useCartStore from '../../store/useCartStore';
import useSettings from '../../store/useSettings';

export default function CartItem({ item }) {
  const { updateQty, removeFromCart, updateNotes } = useCartStore();
  const { getCurrencySymbol } = useSettings();
  const currencySymbol = getCurrencySymbol();
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [noteText, setNoteText] = useState(item.options?.notes || '');
  const noteInputRef = useRef(null);

  // Demonstrating useRef for focusing an input when editing starts
  useEffect(() => {
    if (isEditingNote && noteInputRef.current) {
      noteInputRef.current.focus();
    }
  }, [isEditingNote]);

  const handleSaveNote = () => {
    updateNotes(item.cartId, noteText);
    setIsEditingNote(false);
  };

  return (
    <div className="cart-item">
      <div className="cart-item-header">
        <div className="cart-item-info">
          <h4>{item.name}</h4>
          <span className="cart-item-price">{currencySymbol}{(item.price * item.qty).toFixed(2)}</span>
          {item.options && (item.options.size || item.options.sugar) && (
            <div style={{fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.2rem'}}>
              {item.options.size} • Sugar: {item.options.sugar} • Ice: {item.options.ice}
            </div>
          )}
        </div>
        <button className="del-btn" onClick={() => removeFromCart(item.cartId)}>
          <Trash2 size={16} />
        </button>
      </div>
      
      <div className="cart-item-controls">
        <div className="qty-controls">
          <button onClick={() => updateQty(item.cartId, item.qty - 1)} disabled={item.qty <= 1}>
            <Minus size={14} />
          </button>
          <span>{item.qty}</span>
          <button onClick={() => updateQty(item.cartId, item.qty + 1)}>
            <Plus size={14} />
          </button>
        </div>
        {!isEditingNote && (
          <button className="add-note-btn" onClick={() => setIsEditingNote(true)}>
            <Edit3 size={14} /> {item.options?.notes ? 'Edit Note' : 'Add Note'}
          </button>
        )}
      </div>

      {isEditingNote && (
        <div className="note-input-container">
          <input 
            ref={noteInputRef}
            type="text" 
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSaveNote()}
            placeholder="E.g. Less sugar, extra hot"
            className="note-input"
          />
          <button className="save-note-btn" onClick={handleSaveNote}>
            <Check size={16} />
          </button>
        </div>
      )}
      
      {item.options?.notes && !isEditingNote && (
        <div className="cart-item-note">Note: {item.options.notes}</div>
      )}
    </div>
  );
}
