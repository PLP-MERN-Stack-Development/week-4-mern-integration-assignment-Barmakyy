import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Validate password length
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);

    const result = await register(formData.username, formData.email, formData.password);
    
    if (result.success) {
      navigate('/');
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-zinc-900 rounded-lg shadow-md dark:text-zinc-100">
      <h2 className="text-2xl font-bold mb-4 dark:text-zinc-100">Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 dark:text-zinc-200">
            Username
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            minLength="3"
            maxLength="30"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-zinc-800 dark:text-zinc-100"
            placeholder="Enter your username"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 dark:text-zinc-200">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-zinc-800 dark:text-zinc-100"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 dark:text-zinc-200">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength="6"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-zinc-800 dark:text-zinc-100"
            placeholder="Enter your password"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 dark:text-zinc-200">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-zinc-800 dark:text-zinc-100"
            placeholder="Confirm your password"
          />
        </div>
        {error && (
          <div className="mb-4 p-2 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded">
            {error}
          </div>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition disabled:opacity-50 dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
} 