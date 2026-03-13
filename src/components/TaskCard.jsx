import { HiOutlineTrash, HiOutlineCalendar, HiOutlineFlag } from 'react-icons/hi';
import Switch from 'react-switch';
import { useTheme } from '../context/ThemeContext';

const priorityColors = {
  low: '#10b981', // green for light/dark
  medium: '#f59e0b',
  high: '#ef4444',
};

const TaskCard = ({ task, onToggle, onDelete }) => {
  const isCompleted = task.status === 'completed';
  const { theme } = useTheme();

  return (
    <div className={`task-card ${isCompleted ? 'task-completed' : ''}`}>
      <div className="task-card-left">
        <label className="switch-wrapper" style={{ display: 'flex', alignItems: 'center' }}>
          <Switch
            checked={isCompleted}
            onChange={(checked) => onToggle(task._id, checked ? 'completed' : 'pending')}
            onColor="#16a34a"
            offColor={theme === 'dark' ? '#334155' : '#cbd5e1'}
            uncheckedIcon={false}
            checkedIcon={false}
            height={20}
            width={40}
            handleDiameter={16}
          />
        </label>

        <div className="task-info" style={{ marginLeft: '14px' }}>
          <h3 className={`task-title ${isCompleted ? 'line-through' : ''}`}>
            {task.title}
          </h3>
          {task.description && (
            <p className="task-description">{task.description}</p>
          )}
          <div className="task-meta">
            <span
              className="priority-badge"
              style={{ background: `${priorityColors[task.priority]}20`, color: priorityColors[task.priority] }}
            >
              <HiOutlineFlag />
              {task.priority}
            </span>
            {task.dueDate && (
              <span className="due-badge">
                <HiOutlineCalendar />
                {new Date(task.dueDate).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </span>
            )}
            <span className="created-badge">
              {new Date(task.createdAt).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
              })}
            </span>
          </div>
        </div>
      </div>

      <button
        className="delete-btn"
        onClick={() => onDelete(task._id)}
        title="Delete task"
      >
        <HiOutlineTrash />
      </button>
    </div>
  );
};

export default TaskCard;
