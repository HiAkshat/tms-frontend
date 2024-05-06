import React, { useState } from 'react';
import onClickOutside from 'react-onclickoutside'

const Popup = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openPopup = () => {
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  const handleOverlayClick = (e: { target: any; currentTarget: any; }) => {
    if (e.target === e.currentTarget) {
      closePopup();
    }
  };

  const handleClickOutside = (e: any) => {
    setIsOpen(false)
  }

  return (
    <>
      <button onClick={openPopup}>
        <img src="pencil-icon.png" alt="Edit Details" />
      </button>
      {isOpen && (
        <div className="popup-overlay" onClick={handleOverlayClick} onBlur={()=>setIsOpen(false)}>
          <div className="popup-content">
            <h2>Edit Details</h2>
            {/* Your popup content here */}
            <button onClick={closePopup}>Done</button>
          </div>
        </div>
      )}
    </>
  );
};

export default onClickOutside(Popup, handleClickOutside);
