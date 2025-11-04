import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Folder, Edit } from 'lucide-react';
import { useSelector, useDispatch } from "react-redux"
import { selectCategory } from "../../redux/categorySlice.js"
import { axiosInstance } from "../../utilities/utiles.js"

const CategoriesPage = ({ darkMode }) => {
  const [categories, setCategories] = useState([])
  const dispatch = useDispatch()
  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await axiosInstance.get("/category/get-categories");
        setCategories(res.data.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
        toast.error("Failed to load categories");
      }
    };

    // if (isOpen) {
      getCategories();
    // }
  }, []);
  console.log(categories)

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Manage Categories
        </h3>
        <button className="add-cat-btn">
          <Plus className="w-4 h-4" />
          <span className="">Add Category</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories?.map((category) => (
          <div key={category.id} className={`${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          } border rounded-xl p-6 hover:shadow-lg transition`}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br flex items-center justify-center">
                <Folder className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 rounded-lg text-blue-600 hover:bg-blue-50 transition">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <h4 className={`text-lg font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {category.title}
            </h4>
            <p className={`text-sm mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {category.description}
            </p>
            <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <span className="font-semibold">{category?.posts}</span> posts
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default CategoriesPage