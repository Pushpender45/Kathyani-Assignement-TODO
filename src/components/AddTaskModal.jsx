import { useState } from 'react';
import { HiOutlineX } from 'react-icons/hi';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const priorityOptions = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' }
];

const customSelectStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: 'var(--bg-input)',
    borderColor: 'var(--border)',
    color: 'var(--text-primary)',
    padding: '3px',
    minHeight: '48px',
    borderRadius: 'var(--radius-sm)',
    boxShadow: 'none',
    '&:hover': {
      borderColor: 'var(--border-focus)'
    }
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: 'var(--bg-card)',
    border: '1px solid var(--border)',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? 'var(--primary-glow)' : 'transparent',
    color: 'var(--text-primary)',
    '&:hover': {
      backgroundColor: 'var(--primary-glow)'
    }
  }),
  singleValue: (provided) => ({
    ...provided,
    color: 'var(--text-primary)'
  })
};

const AddTaskModal = ({ isOpen, onClose, onAdd }) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    priority: priorityOptions[1], // select option object
    dueDate: null,
  });
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await onAdd({
      ...form,
      priority: form.priority.value,
      dueDate: form.dueDate ? form.dueDate.toISOString() : null,
    });
    setForm({ title: '', description: '', priority: priorityOptions[1], dueDate: null });
    setSubmitting(false);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>New Task</h2>
          <button className="modal-close" onClick={onClose}>
            <HiOutlineX />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="task-title">Title *</label>
            <input
              id="task-title"
              type="text"
              placeholder="What needs to be done?"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="task-desc">Description</label>
            <textarea
              id="task-desc"
              placeholder="Add some details... (optional)"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Priority</label>
              <Select
                value={form.priority}
                onChange={(option) => setForm({ ...form, priority: option })}
                options={priorityOptions}
                styles={customSelectStyles}
                isSearchable={false}
              />
            </div>

            <div className="form-group">
              <label>Due Date</label>
              <DatePicker
                selected={form.dueDate}
                onChange={(date) => setForm({ ...form, dueDate: date })}
                placeholderText="Select due date"
                className="custom-datepicker-input"
                minDate={new Date()}
              />
            </div>
          </div>

          <button
            id="add-task-submit"
            type="submit"
            className="submit-btn"
            disabled={submitting}
          >
            {submitting ? <span className="btn-spinner" /> : 'Create Task'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;
