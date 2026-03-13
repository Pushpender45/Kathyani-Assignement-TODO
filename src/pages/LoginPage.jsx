import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineUser } from 'react-icons/hi';
import { PiLeafFill } from 'react-icons/pi';

const LoginPage = () => {
  const [isNewUser, setIsNewUser] = useState(false);
  const [form, setForm] = useState({ email: '', password: '', name: '' });
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await login({
        email: form.email,
        password: form.password,
        name: isNewUser ? form.name : undefined,
      });
      toast.success(isNewUser ? 'Account created! Welcome!' : 'Welcome back!');
      navigate('/');
    } catch (err) {
      const msg = err.response?.data?.message || 'Something went wrong';
      if (msg.includes('Name is required')) {
        setIsNewUser(true);
        toast('Looks like you\'re new! Please enter your name.', { icon: '👋' });
      } else {
        toast.error(msg);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <div className="brand-content">
          <div className="brand-logo">
            <PiLeafFill className="leaf-icon" />
            <span>Katyayani Organics</span>
          </div>
          <h1>
            Task Management <span style={{ color: '#a7f3d0' }}>Portal</span>
          </h1>
          <p>
            Streamline your workflow with our intuitive task management system.
            Stay organized, stay productive.
          </p>
          <div className="brand-features">
            <div className="feature-item">
              <div className="feature-dot" />
              <span>Create & organize tasks effortlessly</span>
            </div>
            <div className="feature-item">
              <div className="feature-dot" />
              <span>Track progress with status filters</span>
            </div>
            <div className="feature-item">
              <div className="feature-dot" />
              <span>Set priorities & due dates</span>
            </div>
          </div>
        </div>
      </div>

      <div className="login-right">
        <div className="login-card">
          <div className="login-card-header">
            <h2>{isNewUser ? 'Create Account' : 'Welcome Back'}</h2>
            <p>{isNewUser ? 'Fill in your details to get started' : 'Sign in to continue to your tasks'}</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {isNewUser && (
              <div className="input-group">
                <HiOutlineUser className="input-icon" />
                <input
                  id="name-input"
                  type="text"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required={isNewUser}
                  autoFocus
                />
              </div>
            )}

            <div className="input-group">
              <HiOutlineMail className="input-icon" />
              <input
                id="email-input"
                type="email"
                placeholder="Email Address"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                autoFocus={!isNewUser}
              />
            </div>

            <div className="input-group">
              <HiOutlineLockClosed className="input-icon" />
              <input
                id="password-input"
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
                minLength={6}
              />
            </div>

            <button
              id="login-submit-btn"
              type="submit"
              className="login-btn"
              disabled={submitting}
            >
              {submitting ? (
                <span className="btn-spinner" />
              ) : isNewUser ? (
                'Create Account'
              ) : (
                'Sign In'
              )}
            </button>

            <p className="toggle-text">
              {isNewUser ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                type="button"
                className="toggle-btn"
                onClick={() => setIsNewUser(!isNewUser)}
              >
                {isNewUser ? 'Sign In' : 'Create one'}
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
