import { Link } from 'react-router-dom';
import useApi from '../hooks/useApi';
import { useState } from 'react';
import SearchBar from './SearchBar';

export default function PostList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  
  // Build query string
  const queryParams = new URLSearchParams({
    page: currentPage,
    limit: 5
  });
  
  if (searchTerm) queryParams.append('search', searchTerm);
  if (selectedCategory) queryParams.append('category', selectedCategory);
  
  const { data, error, loading } = useApi(`/api/posts?${queryParams}`);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page when filtering
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const { posts, pagination } = data || { posts: [], pagination: {} };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 dark:text-zinc-100">All Posts</h2>
      
      <SearchBar onSearch={handleSearch} onCategoryChange={handleCategoryChange} />
      
      <div className="space-y-4">
        {posts && posts.length > 0 ? (
          <>
            {posts.map(post => (
              <div key={post._id} className="bg-white dark:bg-zinc-900 p-4 rounded shadow hover:shadow-lg transition dark:text-zinc-100">
                <Link to={`/posts/${post._id}`} className="text-lg font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                  {post.title}
                </Link>
                <div className="text-sm text-gray-500 dark:text-zinc-400">
                  {post.category?.name} • By {post.author?.username || 'Unknown'} • {new Date(post.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
            
            {/* Pagination Controls */}
            {pagination && pagination.totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-6">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={!pagination.hasPrevPage}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Page {pagination.currentPage} of {pagination.totalPages}
                </span>
                
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={!pagination.hasNextPage}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <p className="dark:text-zinc-100">
            {searchTerm || selectedCategory ? 'No posts found matching your criteria.' : 'No posts found.'}
          </p>
        )}
      </div>
    </div>
  );
}
