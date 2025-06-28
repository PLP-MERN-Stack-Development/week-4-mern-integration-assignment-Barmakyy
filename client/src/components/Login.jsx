import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
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
    setLoading(true);

    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      navigate('/');
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-zinc-900 rounded-lg shadow-md dark:text-zinc-100">
      <h2 className="text-2xl font-bold mb-4 dark:text-zinc-100">Login</h2>
      <form onSubmit={handleSubmit}>
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
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-zinc-800 dark:text-zinc-100"
            placeholder="Enter your password"
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
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
} 