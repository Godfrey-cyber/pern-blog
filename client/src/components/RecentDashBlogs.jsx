import React, { useState } from 'react'
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { Search, Menu, X, Heart, MessageCircle, Share2, Calendar, Filter, User, Clock, TrendingUp, Edit, Trash2, Eye, BarChart3, Users, FileText, Plus, Save, XCircle } from 'lucide-react';
import { trimString } from "../utilities/utiles.js"
import TimeAgo from "react-timeago";

const RecentDashBlogs = ({ darkMode }) => {
	const { blogs } = useSelector(state => state.blogs)
  const { categories } = useSelector(state => state.category)
	const { user } = useSelector(state => state.auth)
  console.log(blogs)
  console.log(categories)

	const [showDeleteModal, setShowDeleteModal] = useState(false);
	  const [showEditModal, setShowEditModal] = useState(false);
	  const [postToDelete, setPostToDelete] = useState(null);
	  const [postToEdit, setPostToEdit] = useState(null);
	  const [editForm, setEditForm] = useState({
	    title: '',
	    description: '',
      category: '',
	    image: '',
      content: '',
	  });
	  const [blogPosts, setBlogPosts] = useState(blogs.blogs)
	const post = blogs

	const dashboardStats = [
	    { label: "Total Views", value: "45,231", icon: Eye, change: "+12.5%", trend: "up" },
	    { label: "Total Posts", value: "127", icon: FileText, change: "+8", trend: "up" },
	    { label: "Followers", value: "8,492", icon: Users, change: "+23.1%", trend: "up" },
	    { label: "Engagement", value: "4.8%", icon: BarChart3, change: "+0.3%", trend: "up" }
	];
	// Delete functionality
  const handleDeleteClick = (post) => {
    setPostToDelete(post);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setBlogPosts(blogPosts.filter(post => post.id !== postToDelete.id));
    setShowDeleteModal(false);
    setPostToDelete(null);
  };

  // Edit functionality
  const handleEditClick = (post) => {
    setPostToEdit(post);
    setEditForm({
      title: post.title,
      description: post.description,
      category: post.category,
      content: post.content,
      image: post.image,
    });
    setShowEditModal(true);
  };

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

  const DeleteModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-scroll">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 animate-fade-in">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900">Confirm Delete</h3>
          <button onClick={() => setShowDeleteModal(false)} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="mb-6">
          <p className="text-gray-600 mb-2">Are you sure you want to delete this post?</p>
          <p className="font-semibold text-gray-900">"{postToDelete?.title}"</p>
          <p className="text-sm text-red-600 mt-3">This action cannot be undone.</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowDeleteModal(false)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={confirmDelete}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center justify-center space-x-2"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
  // Edit Modal Component
  const EditModal = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-end z-50">
      <div className="bg-white shadow-lg w-full md:w-1/2 h-full md:h-screen p-6 flex flex-col overflow-y-scroll">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-900">Edit Post</h3>
          <button onClick={() => setShowEditModal(false)} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <form className="space-y-5">
          {/* ==================================== Title ==================================== */}
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
              placeholder="Enter blog title"
            />
          </div>
          {/* ==================================== Description ==================================== */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              name="description"
              value={editForm.description}
              onChange={handleEditChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
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
              placeholder="Write your blog content here..."
              // className="h-[300px] md:h-[400px]"
              className="h-fit "
            />
          </div>


          {/* ==================================== Category ==================================== */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
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

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {/* ==================================== Image ==================================== */}
              </label>
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
    </div>
  );
	return (
		<>
			<div className="min-h-screen bg-gray-50 px-5">
			    	{/* Recent Posts Table */}
		        <div className=" rounded-lg shadow-md overflow-hidden mb-8">
		          <div className="p-6 border-b">
		            <h2 className="text-xl font-bold text-gray-900">Recent Posts</h2>
		          </div>
              <div className="flex justify-between items-center my-4 px-4">
                <div className="flex items-center space-x-3">
                <button className={`px-4 py-2 rounded-lg ${
                darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-700'
              } hover:opacity-80 transition`}>
                All Posts
              </button>
              <button className={`px-4 py-2 rounded-lg ${
                darkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-200'
              } transition`}>
                Published
              </button>
              <button className={`px-4 py-2 rounded-lg ${
                darkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-200'
              } transition`}>
                Drafts
              </button>
            </div>
            <button className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
              darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-700'
            }`}>
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
          </div>
		          <div className="overflow-x-auto">
		            <table className="w-full">
		              <thead className={darkMode ? 'bg-gray-700' : 'bg-gray-50'}>
		                <tr>
		                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
		                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
		                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
		                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
		                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
		                </tr>
		              </thead>
		              <tbody className="bg-white divide-y divide-gray-200">
		                {blogs?.slice(0, 8)?.map((post, idx) => (
		                  <tr key={idx} className="hover:bg-gray-50">
		                    <td className="flex space-x-2 px-6 py-4 whitespace-nowrap">
		                      <img className="h-10 w-10 object-cover rounded-md" src={post.image} alt="" />
		                      <div className="text-sm font-medium text-gray-900">{trimString(post.title, 35)}</div>
		                    </td>
		                    <td className="px-6 py-4 whitespace-nowrap">
		                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
		                        post?.status === 'Published' 
		                          ? 'bg-green-100 text-green-800' 
		                          : 'bg-yellow-100 text-yellow-800'
		                      }`}>
		                        {post?.status}
		                      </span>
		                    </td>
		                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{post?.views}</td>
		                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
		                    	<TimeAgo className="text-gray-500 text-xs font-semibold" date={post?.createdAt} />
		                    </td>
		                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
		                      <div className="flex items-center space-x-3">
		                        <button
		                        	onClick={() => handleEditClick(post)} 
		                        	className="text-blue-600 hover:text-blue-800 cursor-pointer"
		                        	title="Edit blog"
		                        	>
		                          	<Edit className="w-4 h-4" />
		                        </button>
		                        <button 
		                        	onClick={() => setCurrentPage('single')}
		                        	className="text-green-600 hover:text-green-800 cursor-pointer"
		                        	title="View blog"
		                        >
		                          <Eye className="w-4 h-4" />
		                        </button>
		                        <button 
		                        	onClick={() => handleDeleteClick(post)}
		                         	className="text-red-600 hover:text-red-800 cursor-pointer"
		                         	title="Delete blog"
		                         	>
		                          <Trash2 className="w-4 h-4" />
		                        </button>
		                      </div>
		                    </td>
		                  </tr>
		                ))}
		              </tbody>
		            </table>
		          </div>
		        </div>
		        {showDeleteModal && <DeleteModal />}
      			{showEditModal && <EditModal setShowEditModal={setShowEditModal} handleEditChange={handleEditChange} editForm={editForm} saveEdit={saveEdit} />}
		        <div className="bg-white rounded-lg shadow-md p-6">
		          <h2 className="text-xl font-bold text-gray-900 mb-4">Analytics Overview</h2>
		          <div className="h-64 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg flex items-center justify-center">
		            <div className="text-center">
		              <BarChart3 className="w-16 h-16 text-purple-400 mx-auto mb-4" />
		              <p className="text-gray-600">Chart visualization would go here</p>
		            </div>
		          </div>
		        </div>
			</div>
        </>
	)
}

export default RecentDashBlogs