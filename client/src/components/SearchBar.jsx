import { useState, useEffect } from 'react';
import axios from 'axios';

export default function SearchBar({ onSearch, onCategoryChange }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories for filter dropdown
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    onCategoryChange(category);
  };

  return (
    <div className="mb-6 p-4 bg-white dark:bg-zinc-900 rounded-lg shadow dark:text-zinc-100">
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search posts by title or content..."
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-zinc-800 dark:text-zinc-100"
          />
        </div>
        <div className="sm:w-48">
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-zinc-800 dark:text-zinc-100"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          Search
        </button>
      </form>
    </div>
  );
} 