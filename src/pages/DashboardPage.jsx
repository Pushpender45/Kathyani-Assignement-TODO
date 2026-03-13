import { useState, useEffect, useCallback } from 'react';
import Navbar from '../components/Navbar';
import TaskCard from '../components/TaskCard';
import AddTaskModal from '../components/AddTaskModal';
import { getTasks, createTask, updateTask, deleteTask } from '../services/api';
import toast from 'react-hot-toast';
import { HiOutlinePlus, HiOutlineClipboardList } from 'react-icons/hi';
import { HiCheckBadge, HiClock, HiViewColumns } from 'react-icons/hi2';

const FILTERS = [
  { key: null, label: 'All Tasks', icon: <HiViewColumns /> },
  { key: 'pending', label: 'Pending', icon: <HiClock /> },
  { key: 'completed', label: 'Completed', icon: <HiCheckBadge /> },
];

const DashboardPage = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchTasks = useCallback(async () => {
    try {
      const { data } = await getTasks(filter);
      setTasks(data);
    } catch {
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleAdd = async (taskData) => {
    try {
      await createTask(taskData);
      toast.success('Task created!');
      fetchTasks();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create task');
    }
  };

  const handleToggle = async (id, newStatus) => {
    try {
      await updateTask(id, { status: newStatus });
      toast.success(newStatus === 'completed' ? 'Task completed! 🎉' : 'Task reopened');
      fetchTasks();
    } catch {
      toast.error('Failed to update task');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      toast.success('Task deleted');
      fetchTasks();
    } catch {
      toast.error('Failed to delete task');
    }
  };

  const counts = {
    all: tasks.length,
    pending: tasks.filter((t) => t.status === 'pending').length,
    completed: tasks.filter((t) => t.status === 'completed').length,
  };

  return (
    <div className="dashboard">
      <Navbar />

      <main className="dashboard-main">
        {/* Stats Cards */}
        <div className="stats-row">
          <div className="stat-card stat-all">
            <div className="stat-icon"><HiOutlineClipboardList /></div>
            <div className="stat-info">
              <span className="stat-number">{counts.all}</span>
              <span className="stat-label">Total Tasks</span>
            </div>
          </div>
          <div className="stat-card stat-pending">
            <div className="stat-icon"><HiClock /></div>
            <div className="stat-info">
              <span className="stat-number">{counts.pending}</span>
              <span className="stat-label">Pending</span>
            </div>
          </div>
          <div className="stat-card stat-completed">
            <div className="stat-icon"><HiCheckBadge /></div>
            <div className="stat-info">
              <span className="stat-number">{counts.completed}</span>
              <span className="stat-label">Completed</span>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="toolbar">
          <div className="filter-tabs">
            {FILTERS.map((f) => (
              <button
                key={f.label}
                className={`filter-tab ${filter === f.key ? 'active' : ''}`}
                onClick={() => setFilter(f.key)}
              >
                {f.icon}
                {f.label}
              </button>
            ))}
          </div>

          <button id="add-task-btn" className="add-btn" onClick={() => setModalOpen(true)}>
            <HiOutlinePlus />
            Add Task
          </button>
        </div>

        {/* Task List */}
        <div className="task-list">
          {loading ? (
            <div className="empty-state">
              <div className="spinner" />
              <p>Loading tasks...</p>
            </div>
          ) : tasks.length === 0 ? (
            <div className="empty-state">
              <HiOutlineClipboardList className="empty-icon" />
              <h3>No tasks yet</h3>
              <p>Click "Add Task" to create your first task</p>
            </div>
          ) : (
            tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onToggle={handleToggle}
                onDelete={handleDelete}
              />
            ))
          )}
        </div>
      </main>

      <AddTaskModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onAdd={handleAdd} />
    </div>
  );
};

export default DashboardPage;
