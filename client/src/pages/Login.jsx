import React, { useState } from 'react'
//packages
import { MdOutlineChevronLeft, MdOutlineChevronRight } from 'react-icons/md';
import { useNavigate, Link } from 'react-router-dom';
import { FaRegUserCircle } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
// files
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginFailure, loginSuccess } from '../redux/userSlice.js';
import { axiosInstance } from "../utilities/utiles.js"
import { loginUser } from "../redux/authThunk.js"

const Login = () => {
	const navigate = useNavigate();
	const [loginData, setLoginData] = useState({
		email: '',
		password: '',
	});
	const dispatch = useDispatch()
	const [toggle, setToggle] = useState(false);
	const { email, password  } = loginData;
	const { user, loading, error, accessToken } = useSelector(state => state.auth);

	// console.log(user);
	const onChange = event => {
		const { name, value } = event.target;
		setLoginData((prev) => ({ ...prev, [name]: value }));
	};
	console.log(user)
	const resetForm = () => setLoginData({ email: "", password: "" });

	const handleSubmit = (event) => {
		event.preventDefault();
		if (email && password) {
		    dispatch(loginUser({ email, password }, navigate, toast));
		    resetForm();
	  	} else {
	    	toast.error("Sorry! Cannot log you without credentials");
	  	}
	}
	return (
		<div className="flex flex-col w-full h-screen items-center justify-center">
			<div className="reg-div relative">
				{/*<FaRegUserCircle className="signup-icon" /> */}
				<p className="flex text-2xl font-light text-gray-800 flex items-center p-2">LogIn.</p>
				<form className="flex flex-col space-y-6 w-4/5">
					<span className="input-span">
						<input
							onChange={onChange}
							// value={email}
							type="email"
							name="email"
							id="email"
							placeholder="Email e.g. jane.doe@gmail.com"
							className="form-input"
						/>
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
					</span>
					<button 
							onClick={handleSubmit}
							type="submit"
							// disabled={loading}
							className="bg-orange-400 text-white rounded-md text-xs font-semibold w-full h-12 px-3 py-2 cursor-pointer"
						>
							{loading ? "Logging..." : "Log In"}
					</button>
				</form>
				<div className="flex items-center text-xs text-gray-400 justify-self-center">
					Don't have an account?
					<Link to="/auth/register">
						<span className="cursor-pointer text-xs text-orange-400 transition-all delay-200 ml-2">
						Create Account
						</span>
					</Link>
					<Link to="/auth/forgot-password">
						<span className="cursor-pointer text-xs text-orange-400 transition-all delay-200 ml-2">
						Forgot Password?
						</span>
					</Link>
				</div>
			</div>
		</div>
	)
}

export default Login