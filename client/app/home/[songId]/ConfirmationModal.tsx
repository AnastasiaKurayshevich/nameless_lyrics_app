import React from "react";

type Props = {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const ConfirmationModal: React.FC<Props> = ({ message, onConfirm, onCancel }) => {
    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
      >
        <div
          style={{
            backgroundColor: '#fff',
            padding: '1rem',
            borderRadius: '0.25rem',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
          }}
        >
          <p>{message}</p>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
            <button className="btn btn-error mr-2" onClick={onConfirm}>
              Confirm
            </button>
            <button className="btn btn-primary" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

export default ConfirmationModal;