import React, { useState } from 'react'
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { Save, XCircle, X } from 'lucide-react';

// Edit Modal Component
  const EditModal = ({ setShowEditModal, handleEditChange, editForm, saveEdit }) => {
  	const darkMode = false
  	const { blogs } = useSelector(state => state.blogs)
  	const { categories } = useSelector(state => state.category)
	const { user } = useSelector(state => state.auth)
	console.log(categories)

	const onChange = event => {
		setBlogData(prev => ({
			...prev,
			[event.target.name]: event.target.value,
		}));
		// setErrors({ ...errors, [event.target.name]: "" });
	};
	return (
	    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-end z-50">
	      <div className="bg-white shadow-lg w-full md:w-1/2 h-full md:h-screen p-6 flex flex-col overflow-y-scroll">
	        <div className="flex items-center justify-between mb-6">
	          <h3 className="text-2xl font-bold text-gray-900">Edit Post</h3>
	          <button onClick={() => setShowEditModal(false)} className="text-gray-400 hover:text-gray-600">
	            <X className="w-6 h-6" />
	          </button>
	        </div>
	        
	        <form className="space-y-5">
	          <div>
	            <label className="block text-sm font-semibold text-gray-700 mb-2">
	              Title
	            </label>
	            <input
	              type="text"
	              name="title"
	              value={editForm.title}
	              onChange={handleEditChange}
	              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
	              placeholder="Enter post title"
	            />
	          </div>

	          <div>
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
	          </div>

	          <div className="grid grid-cols-2 gap-4">
	            <div>
	              <label className="block text-sm font-semibold text-gray-700 mb-2">
	                Category
	              </label>
	              <select
	                name="category"
	                value={editForm.category}
	                onChange={handleEditChange}
	                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
	              >
	              {/*{edit}*/}
	                <option value="Web Development">Web Development</option>
	                <option value="Design">Design</option>
	                <option value="Backend">Backend</option>
	                <option value="Programming">Programming</option>
	                <option value="DevOps">DevOps</option>
	              </select>
	            </div>




	            <div>
			        <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
			            Blog Category</label>
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




	            <div>
	              <label className="block text-sm font-semibold text-gray-700 mb-2">
	                Status
	              </label>
	              <select
	                name="status"
	                value={editForm.status}
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
	    </div>
	)
}

export default EditModal