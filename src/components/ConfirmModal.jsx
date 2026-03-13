import { HiOutlineX, HiOutlineExclamationCircle } from 'react-icons/hi';

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay confirm-modal-overlay" onClick={onClose}>
      <div className="modal confirm-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <HiOutlineExclamationCircle style={{ fontSize: '24px', color: 'var(--danger)' }} />
            <h2>{title}</h2>
          </div>
          <button className="modal-close" onClick={onClose}>
            <HiOutlineX />
          </button>
        </div>

        <div className="modal-body" style={{ marginBottom: '24px' }}>
          <p style={{ color: 'var(--text-secondary)' }}>{message}</p>
        </div>

        <div className="modal-footer" style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <button
            className="cancel-btn"
            onClick={onClose}
            style={{
              padding: '10px 16px',
              background: 'transparent',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              fontWeight: 500
            }}
          >
            Cancel
          </button>
          <button
            className="confirm-btn"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            style={{
              padding: '10px 16px',
              background: 'var(--danger)',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              color: 'white',
              cursor: 'pointer',
              fontWeight: 600
            }}
          >
            Delete Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
