import { useParams, Link, useNavigate } from 'react-router-dom';
import useApi from '../hooks/useApi';
import axios from 'axios';

export default function PostView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: post, error, loading } = useApi(`/api/posts/${id}`);

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete "${post.title}"?`)) {
      return;
    }

    try {
      await axios.delete(`/api/posts/${id}`);
      navigate('/'); // Redirect to post list
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to delete post');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!post) return <p>Post not found.</p>;

  return (
    <div className="bg-white dark:bg-zinc-900 p-6 rounded shadow dark:text-zinc-100">
      <h2 className="text-2xl font-bold mb-2 dark:text-zinc-100">{post.title}</h2>
      <div className="text-sm text-gray-500 dark:text-zinc-400 mb-4">{post.category?.name}</div>
      <p className="mb-4 dark:text-zinc-200">{post.content}</p>
      <div className="flex gap-2">
        <Link to={`/edit/${post._id}`} className="text-blue-500 dark:text-blue-400 hover:underline">Edit</Link>
        <button
          onClick={handleDelete}
          className="text-red-500 dark:text-red-400 hover:underline"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
