import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { ToastContainer, toast } from 'react-toastify';
import { uploadBlog } from "../redux/blogThunk.js"
import { useSelector, useDispatch } from "react-redux"
import { axiosInstance } from "../utilities/utiles.js"

export default function WriteBlogModal({ isOpen, onClose }) {
  const [blogData, setBlogData] = useState({
		title: '',
		description: '',
		content: '',
		categoryID: ''
	});
  const [categories, setCategories] = useState([])
  const [categoryId, setCategoryId] = useState([])
  const dispatch = useDispatch()
  const [toggle, setToggle] = useState(false);
  const { title, description, content, categoryID } = blogData;
  const [errors, setErrors] = useState({});
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(uploadBlog(blogData, toast));
    setBlogData({ title: "", description: "", content: "", categoryID: "" });
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
			value={parseInt(categoryID, 10)}
			onChange={onChange}
			className="text-sm font-normal text-gray-600 w-full p-3 border border-gray-500 rounded-lg focus:outline-none focus:ring focus:border-green-500"
			required
			>
			  <option value="">-- Select Category --</option>
	            {categories?.map((cat) => (
	              <option key={cat.id} value={parseInt(cat.id, 10)}>
	                {cat.title}
	              </option>
	            ))}
			</select>

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
