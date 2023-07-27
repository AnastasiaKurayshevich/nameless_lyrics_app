import React from "react";

type Props = {
  message: string;
  songName: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const ConfirmationModal: React.FC<Props> = ({
  message,
  songName,
  onConfirm,
  onCancel,
}) => {
  const handleOverlayClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    onCancel();
  };

  const handleModalClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <div className="confirmation-overlay" onClick={handleOverlayClick}>
      <div className="confirmation-modal" onClick={handleModalClick}>
        <p>
          {message} <strong>{songName}</strong> ?
        </p>
        <div className="modal-buttons">
          <button className="btn btn-neutral btn-sm mr-5" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn btn-error btn-sm" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
