import React, { useState } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector, useDispatch } from "react-redux"

//packages
import { MdOutlineChevronLeft, MdOutlineChevronRight } from 'react-icons/md';
import { useNavigate, Link } from 'react-router-dom';
import { FaRegUserCircle } from "react-icons/fa";
// files
import { signUpUser } from "../redux/authThunk.js"
import { axiosInstance } from "../utilities/utiles.js"

const Register = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [signUpData, setSignUpData] = useState({
		email: '',
		password: '',
		username: '',
	});
	const [toggle, setToggle] = useState(false);
	const { email, password, username } = signUpData;
	const [errors, setErrors] = useState({});
	const { user, loading, error, accessToken } = useSelector(state => state.auth);

	// console.log(user);
	const onChange = event => {
		setSignUpData(prev => ({
			...prev,
			[event.target.name]: event.target.value,
		}));
		setErrors({ ...errors, [event.target.name]: "" });
	};

	const validate = () => {
	    let newErrors = {};

	    if (!username.trim()) {
	      newErrors.username = "Username is required.";
	    }

	    if (!email.trim()) {
	      newErrors.email = "Email is required.";
	    } else if (!/\S+@\S+\.\S+/.test(email)) {
	      newErrors.email = "Please enter a valid email address.";
	    }

	    if (!password.trim()) {
	      newErrors.password = "Password is required.";
	    } else if (password.length < 6) {
	      newErrors.password = "Password must be at least 6 characters.";
	    }

	    return newErrors;
	};
	console.log(signUpData);
	const handleSubmit = async (event) => {
		event.preventDefault();
		const validationErrors = validate();

		if (Object.keys(validationErrors).length > 0) {
	      setErrors(validationErrors);
	      return;
	    }

	    dispatch(signUpUser(signUpData, navigate, toast));
	    setSignUpData({ email: "", password: "", username: "" });
	    setErrors({});
	}
	return (
		<div className="flex flex-col w-full h-screen items-center justify-center">
			<div className="reg-div relative">
				{/*<FaRegUserCircle className="signup-icon" /> */}
				<p className="flex text-2xl font-light text-gray-800 flex items-center p-2">Create a new account.</p>
				<form className="flex flex-col space-y-6 w-4/5">
					<span className="input-span">
						<input
							onChange={onChange}
							value={username}
							type="text"
							name="username"
							id="username"
							placeholder="User Name e.g. Jane"
							className="form-input"
						/>
						{errors.username && (
			              <p className="text-red-500 text-xs mt-1">{errors.username}</p>
			            )}
					</span>
					<span className="input-span">
						<input
							onChange={onChange}
							value={email}
							type="email"
							name="email"
							id="email"
							placeholder="Email e.g. jane.doe@gmail.com"
							className="form-input"
						/>
						{errors.email && (
			              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
			            )}
					</span>
					<span className="input-span">
						<input
							onChange={onChange}
							value={password}
							type="password"
							name="password"
							id="password"
							placeholder="Password"
							className="form-input"
						/>
						{errors.password && (
			              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
			            )}
					</span>
					<button 
							onClick={handleSubmit}
							type="submit"
							disabled={loading}
							className="bg-orange-400 text-white rounded-md text-xs font-semibold w-full h-12 px-3 py-2 cursor-pointer"
						>
							{loading ? "Signing up..." : "Sign Up"}
					</button>
					{error && <p className="error">{error}</p>}
				</form>
				<div className="flex items-center text-sm text-gray-400 justify-self-center">
					Already have an account?
					<Link to="/auth/login">
						<span className="cursor-pointer text-orange-400 transition-all delay-200 ml-2">
						Login here
						</span>
					</Link>
				</div>
			</div>
		</div>
	)
}

export default Register