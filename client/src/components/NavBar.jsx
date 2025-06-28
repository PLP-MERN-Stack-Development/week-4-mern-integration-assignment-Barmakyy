import { Link } from 'react-router-dom';
import { ModeToggle } from './mode-toggle';
import { useAuth } from '../contexts/AuthContext';

export default function NavBar() {
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="bg-white dark:bg-zinc-900 shadow mb-8">
      <div className="max-w-2xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-600 dark:text-blue-300">My Blog</Link>
        <div className="flex items-center gap-4">
          <Link to="/" className="hover:underline text-blue-600 dark:text-blue-300">Home</Link>
          {isAuthenticated && (
            <Link to="/create" className="hover:underline text-blue-600 dark:text-blue-300">Create Post</Link>
          )}
          <ModeToggle />
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-300">
                Welcome, {user?.username}
              </span>
              <button
                onClick={handleLogout}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition text-sm"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link
                to="/login"
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-sm"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition text-sm"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
