import React, { useState } from 'react';
import { useSelector } from "react-redux"
import { trimString } from "../utilities/utiles.js"

const TestPage = () => {
  const { blogs, isFetching, success, error } = useSelector(state => state.blogs)
  const [selectedIds, setSelectedIds] = useState([]);
  // Toggle single item
  const handleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id]
    );
  };

  // Select or deselect all
  const handleSelectAll = () => {
    if (selectedIds.length === blogs.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(blogs.map((item) => item.id));
    }
  };

  // Bulk delete example
  const handleDeleteSelected = () => {
    if (selectedIds.length === 0) {
    	return;
    }
    setSelectedIds([]);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <div className="flex justify-between items-center mb-3">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={selectedIds.length === blogs.length && blogs.length > 0}
            onChange={handleSelectAll}
          />
          <span className="text-sm font-semibold text-gray-800">Select All</span>
        </label>
        <button
          onClick={handleDeleteSelected}
          disabled={selectedIds.length === 0}
          className={`px-3 py-1 rounded text-sm font-semibold ${
            selectedIds.length
              ? 'bg-red-500 text-white font-bold'
              : 'bg-gray-300 text-gray-600'
          }`}
        >
          Delete Selected
        </button>
      </div>

      <ul className="divide-y divide-gray-200">
        {blogs.map((item) => (
          <li key={item.id} className="flex justify-between items-center py-2">
            <label className="flex items-center gap-2 text-sm font-light cursor-pointer">
              <input
                type="checkbox"
                className="text-sm font-semibold text-gray-700"
                checked={selectedIds.includes(item.id)}
                onChange={() => handleSelect(item.id)}
              />
              {trimString(item.title, 40)}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TestPage;
