import React, { useState } from 'react'
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { Save, XCircle, X } from 'lucide-react';

const EditBlog = ({ darkMode }) => {
  	const { blogs } = useSelector(state => state.blogs)
  	const { user } = useSelector(state => state.auth)
  	const { categories } = useSelector(state => state.category)
	const [showEditModal, setShowEditModal] = useState(false);
	const [editForm, setEditForm] = useState({
	    title: '',
	    description: '',
	    category: '',
	    image: '',
	    content: '',
	  });
	const handleEditChange = (event) => {
	    setEditForm({
	      ...editForm,
	      [event.target.name]: event.target.value
	    });
	  };

	  const saveEdit = () => {
	    setBlogPosts(blogPosts.map(post => 
	      post.id === postToEdit.id 
	        ? { ...post, ...editForm }
	        : post
	    ));
	    setShowEditModal(false);
	    setPostToEdit(null);
	  };

	const handleContentChange = (value) => {
	    setEditForm((prev) => ({
	      ...prev,
	      content: value,
	      }));
	  };

	const onChange = event => {
		setBlogData(prev => ({
			...prev,
			[event.target.name]: event.target.value,
		}));
	};
	return (
		<div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-sm p-8`}>
        <form className="space-y-6">
          {/* ==================================== Title ==================================== */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
           	 Blog Title
          </label>
            <input
              type="text"
              name="title"
              value={editForm.title}
              onChange={handleEditChange}
              className={`w-full px-4 py-3 rounded-lg border ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                : 'bg-white border-gray-300 text-gray-900'
            } focus:outline-none focus:ring-2 focus:ring-purple-500`}
              placeholder="Enter blog title"
            />
          </div>
          {/* ==================================== Description ==================================== */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Blog Description
          </label>
            <input
              type="text"
              name="description"
              value={editForm.description}
              onChange={handleEditChange}
              className={`w-full px-4 py-3 rounded-lg border ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                : 'bg-white border-gray-300 text-gray-900'
            } focus:outline-none focus:ring-2 focus:ring-purple-500`}
              placeholder="Enter blog description"
            />
          </div>
          {/* ==================================== Content ==================================== */}
          {/*<div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Content
            </label>
            <textarea
              name="content"
              value={editForm.content}
              onChange={handleEditChange}
              rows="4"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter post content"
            />
          </div>*/}


          <div className="flex-1 h-72 overflow-y-scroll">
            <ReactQuill
              theme="snow"
              name="content"
              value={editForm.content}
              onChange={handleContentChange}
              placeholder={`Hello ${user.username} Write your blog content here...`}
              // className="h-[300px] md:h-[400px]"
              className="h-fit "
            />
          </div>


          {/* ==================================== Category ==================================== */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
	            Category
	          </label>
              <select
                name="id"
                value={editForm.category}
                onChange={handleEditChange}
                className={`w-full px-4 py-3 rounded-lg border ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                required
                >
                <option value="">-- Select Category --</option>
                {categories?.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.title}
                    </option>
                ))}
              </select>
            </div>
            {/* ==================================== Image ==================================== */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Image</label>
              <select
                name="image"
                value={editForm.image}
                onChange={handleEditChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="Draft">Draft</option>
                <option value="Published">Published</option>
              </select>
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={() => setShowEditModal(false)}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition flex items-center justify-center space-x-2"
            >
              <XCircle className="w-5 h-5" />
              <span>Cancel</span>
            </button>
            <button
              type="button"
              onClick={saveEdit}
              className="flex-1 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition flex items-center justify-center space-x-2"
            >
              <Save className="w-5 h-5" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
    </div>
	)
}

export default EditBlog