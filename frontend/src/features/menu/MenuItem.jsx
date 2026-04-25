import React, { useState, memo } from 'react';
import { Plus } from 'lucide-react';
import CustomizationModal from '../../components/CustomizationModal';
import useSettings from '../../store/useSettings';

const MenuItem = memo(({ product }) => {
  const { getCurrencySymbol } = useSettings();
  const currencySymbol = getCurrencySymbol();
  const [showOptions, setShowOptions] = useState(false);

  return (
    <>
      <div className="menu-item" onClick={() => setShowOptions(true)}>
        <div className="item-image">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="item-details">
          <h3>{product.name}</h3>
          <span className="price">{currencySymbol}{product.price.toFixed(2)}</span>
        </div>
        <button className="add-btn" aria-label={`Customize ${product.name}`}>
          <Plus size={18} />
        </button>
      </div>
      {showOptions && <CustomizationModal product={product} onClose={() => setShowOptions(false)} />}
    </>
  );
});

export default MenuItem;
