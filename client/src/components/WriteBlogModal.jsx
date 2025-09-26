import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { ToastContainer, toast } from 'react-toastify';
import { uploadBlog } from "../redux/blogThunk.js"
import { useSelector, useDispatch } from "react-redux"
import { axiosInstance } from "../utilities/utiles.js"
import axios from "axios"

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
          {/* Title */}
          <input
            type="text"
            name="title"
            placeholder="Enter blog title..."
            value={title}
            onChange={onChange}
            className="text-sm font-normal text-gray-600 w-full p-3 border border-gray-500 rounded-lg focus:outline-none focus:ring focus:border-green-500"
            required
          />
          <input
            type="text"
            name="description"
            placeholder="Enter blog description..."
            value={description}
            onChange={onChange}
            className="text-sm font-normal text-gray-600 w-full p-3 border border-gray-500 rounded-lg focus:outline-none focus:ring focus:border-green-500"
            required
          />
          <select
			name="categoryID"
			value={categoryID}
			onChange={onChange}
			className="text-sm font-normal text-gray-600 w-full p-3 border border-gray-500 rounded-lg focus:outline-none focus:ring focus:border-green-500"
			required
			>
			  <option value="">-- Select Category --</option>
	            {categories?.map((cat) => (
	              <option key={cat.id} value={cat.id}>
	                {cat.title}
	              </option>
	            ))}
			</select>
			{/* Image */}
			<input
	            type="file"
	            accept="image/*"
				multiple
				id="name"
	            name="image"
	            placeholder="Enter blog image..."
	            onChange={handleImageUpload}
	            className="text-sm font-normal text-gray-600 w-full p-3 border border-gray-500 rounded-lg focus:outline-none focus:ring focus:border-green-500"
	            required
	        />
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
          {/* Rich Text Editor */}
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

          {/* Actions */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="text-lg px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Publish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
