import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { ToastContainer, toast } from 'react-toastify';
import { uploadBlog } from "../redux/blogThunk.js"
import { useSelector, useDispatch } from "react-redux"
import { axiosInstance } from "../utilities/utiles.js"
import axios from "axios"
import { FileText, Upload } from 'lucide-react';

export default function WriteBlogModal({ isOpen, onClose }) {
  const [blogData, setBlogData] = useState({
		title: '',
		description: '',
		content: '',
		image: '',
		categoryID: ''
	});
  const [categories, setCategories] = useState([])
  const [categoryId, setCategoryId] = useState([])
  const [uploading, setUploading] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch()
  const { title, description, content, image, categoryID } = blogData;
  const { user } = useSelector(state => state.auth);
  const darkMode = false
  
  const onChange = event => {
		setBlogData(prev => ({
			...prev,
			[event.target.name]: event.target.value,
		}));
		// setErrors({ ...errors, [event.target.name]: "" });
	};

	const handleContentChange = (value) => {
	setBlogData((prev) => ({
	    ...prev,
	    content: value,
	    }));
	  };
	  console.log(import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET)
	  console.log(import.meta.env.VITE_CLOUDINARY_NAME)
	// image upload 
	const handleImageUpload = async (event) => {
		const file = event.target.files[0]; // 👈 take first file
  		if (!file) return;
	  setUploading(true);
	  try {
	    const formData = new FormData();
	    formData.append("file", file);
	    formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

	    const { data } = await axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_NAME}/image/upload`,formData);

	    setBlogData((prev) => ({
	      ...prev,
	      image: data.secure_url, // save Cloudinary URL
	    }));
	  } catch (err) {
	    toast.error("Image upload failed");
	    console.error(err);
	  } finally {
	    setUploading(false);
	  }
	};

  const handleSubmit = async (event) => {
  	event.preventDefault();
  	const payload = {
	    ...blogData,
	    categoryID: parseInt(blogData.categoryID, 10),
	  };
    dispatch(uploadBlog(payload, toast));
    setBlogData({ title: "", description: "", content: "", image: "", categoryID: "" });
    // setErrors({});
  };
  
  // categories
  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await axiosInstance.get("/category/get-categories");
        setCategories(res.data.data);
        setCategoryId(res.data.data.id);
        console.log(res.data)
      } catch (err) {
        console.error("Error fetching categories:", err);
        toast.error("Failed to load categories");
      }
    };

    if (isOpen) {
      getCategories();
    }
  }, [isOpen]);
  console.log(blogData)
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-end z-50"
      onClick={onClose}
    >
      {/* Modal Content */}
      <div
        className="bg-white shadow-lg w-full md:w-1/2 h-full md:h-screen p-6 flex flex-col overflow-y-scroll"
        onClick={(event) => event.stopPropagation()} // prevent close on modal click
      >
        <h2 className="text-2xl font-bold mb-4 text-green-700 py-2">✍️ Write a New Blog</h2>

        <form onSubmit={handleSubmit} className="flex-1 flex flex-col space-y-4">
        {/* Blog Title */}
        <div>
          <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Blog Title
          </label>
          <input
            type="text"
            name="title"
            placeholder="Enter blog title..."
            value={title}
            onChange={onChange}
            required
            className={`w-full px-4 py-3 rounded-lg border ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                : 'bg-white border-gray-300 text-gray-900'
            } focus:outline-none focus:ring-2 focus:ring-purple-500`}
          />
        </div>
        {/* Blog Description */}
        <div>
          <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Blog Description
          </label>
          <input
            type="text"
            name="description"
            placeholder="Enter blog description..."
            value={description}
            onChange={onChange}
            required
            className={`w-full px-4 py-3 rounded-lg border ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                : 'bg-white border-gray-300 text-gray-900'
            } focus:outline-none focus:ring-2 focus:ring-purple-500`}
          />
        </div>
        {/* Blog Category */}
        <div>
          <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Blog Category
          </label>
          <select
      			name="categoryID"
      			value={categoryID}
      			onChange={onChange}
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
			 {/* Image */}
        <div>
          <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Featured Image
          </label>
          <div className={`border-2 border-dashed rounded-lg text-center ${
            darkMode ? 'border-gray-600' : 'border-gray-300'
          }`}>
      			<input
              type="file"
              accept="image/*"
      	      multiple
      	      id="name"
              name="image"
              placeholder="Enter blog image..."
              onChange={handleImageUpload}
              className="border-2 border-dashed rounded-lg p-8 text-center w-full h-full"
              required
            />
            <Upload className={`w-12 h-12 mx-auto mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Drop your image here or click to browse
            </p>
            {uploading && <p className="text-sm text-blue-500">Image Uploading...</p>}
            {image && (
            <div className="flex gap-2">
              <img
                  src={image}
                  alt="preview"
                  className="w-32 h-32 object-cover rounded"
              />
            </div>
              )}
          </div>
        </div>
          {/* Rich Text Editor -- Blog Content */}
          <div className="flex-1 overflow-y-auto">
            <ReactQuill
              theme="snow"
              name="content"
              value={content}
              onChange={handleContentChange}
              placeholder="Write your blog content here..."
              // className="h-[300px] md:h-[400px]"
              className="h-full"
            />
          </div>
          <div className="flex space-x-4">
          <button type="submit" className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition font-medium">
            Publish Post
          </button>
          <button type="button" onClick={onClose} className={`px-6 py-3 rounded-lg font-medium ${
            darkMode 
              ? 'bg-gray-700 text-white hover:bg-gray-600' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          } transition`}>
            Cancel
          </button>
        </div>
        </form>
      </div>
    </div>
  );
}
