import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useApi from '../hooks/useApi';
import axios from 'axios';

export default function PostForm({ editMode }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', content: '', category: '' });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');

  // Fetch categories for dropdown
  useEffect(() => {
    axios.get('/api/categories').then(res => setCategories(res.data));
  }, []);

  // If editing, fetch post data
  useEffect(() => {
    if (editMode && id) {
      axios.get(`/api/posts/${id}`).then(res => {
        setForm({
          title: res.data.title,
          content: res.data.content,
          category: res.data.category?._id || '',
        });
      });
    }
  }, [editMode, id]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (editMode) {
        await axios.put(`/api/posts/${id}`, form);
      } else {
        await axios.post('/api/posts', form);
      }
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-zinc-900 rounded-lg shadow-md dark:text-zinc-100">
      <h2 className="text-2xl font-bold mb-4 dark:text-zinc-100">{editMode ? 'Edit' : 'Create'} Post</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="w-full p-2 mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-zinc-800 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          required
        />
        <textarea
          className="w-full p-2 mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-zinc-800 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500"
          name="content"
          value={form.content}
          onChange={handleChange}
          placeholder="Content"
          required
        />
        <select
          className="w-full p-2 mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-zinc-800 dark:text-zinc-100"
          name="category"
          value={form.category}
          onChange={handleChange}
          required
        >
          <option value="" className="bg-white text-zinc-700 dark:bg-zinc-800 dark:text-zinc-100">Select Category</option>
          {categories.map(cat => (
            <option key={cat._id} value={cat._id} className="bg-white text-zinc-700 dark:bg-zinc-800 dark:text-zinc-100">{cat.name}</option>
          ))}
        </select>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          {editMode ? 'Update' : 'Create'} Post
        </button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
