import { HiOutlineTrash, HiOutlineCalendar, HiOutlineFlag } from 'react-icons/hi';
import { HiCheckCircle, HiClock } from 'react-icons/hi2';

const priorityColors = {
  low: '#22c55e',
  medium: '#f59e0b',
  high: '#ef4444',
};

const TaskCard = ({ task, onToggle, onDelete }) => {
  const isCompleted = task.status === 'completed';

  return (
    <div className={`task-card ${isCompleted ? 'task-completed' : ''}`}>
      <div className="task-card-left">
        <button
          className={`status-toggle ${isCompleted ? 'toggled' : ''}`}
          onClick={() => onToggle(task._id, isCompleted ? 'pending' : 'completed')}
          title={isCompleted ? 'Mark as pending' : 'Mark as completed'}
        >
          {isCompleted ? <HiCheckCircle /> : <HiClock />}
        </button>

        <div className="task-info">
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
