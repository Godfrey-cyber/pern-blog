import React, { useState } from 'react'
//packages
import { MdOutlineChevronLeft, MdOutlineChevronRight } from 'react-icons/md';
import { useNavigate, Link } from 'react-router-dom';
import { FaRegUserCircle } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
// files
// import { loginUser } from "../services/userService.js"
import { axiosInstance } from "../utilities/utiles.js"

const Login = () => {
	const navigate = useNavigate();
	const [loginData, setLoginData] = useState({
		email: '',
		password: '',
	});
	const [toggle, setToggle] = useState(false);
	const { email, password  } = loginData;
	// const { user, loading, error, accessToken } = useSelector(
	// 	state => state.auth
	// );

	// console.log(user);
	const onChange = event => {
		setLoginData(prev => ({
			...prev,
			[event.target.name]: event.target.value,
		}));
	};

	const handleSubmit = async event => {
		event.preventDefault();
		// dispatch(signUpStart());
		if (email !== "" || password !== "") {
			try {
				const res = await axiosInstance.post(
					'/users/login',
					loginData
				);
				if (res.status === 200 || res.statusText === 'OK') {
					// dispatch(signUpSuccess(res.data));
					setLoginData({
						email: '',
						password: '',
					});
					navigate('/');
					toast.success("Successfully Logged in🥇")
				}
				console.log(res);
			} catch (error) {
				if (error || !res.status === 200 || !res.statusText === 'OK') {
					// dispatch(signUpFailure(err?.response?.data.msg));
					setLoginData({
						email: '',
						password: '',
					});
					toast.error(error?.response?.data?.msg)
				}
			}
		} else {
			toast.error('Sorry! • Cannot log you without credentials')
			console.log('error');
		}
	};
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
							SUBMIT
					</button>
				</form>
				<div className="flex items-center text-sm text-gray-400 justify-self-center">
					Don't have an account?
					<Link to="/auth/register">
						<span className="cursor-pointer text-orange-400 transition-all delay-200 ml-2">
						Create Account
						</span>
					</Link>
				</div>
			</div>
		</div>
	)
}

export default Login