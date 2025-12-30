import React, { useState } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector, useDispatch } from "react-redux"

//packages
import { MdOutlineChevronLeft, MdOutlineChevronRight } from 'react-icons/md';
import { useNavigate, Link } from 'react-router-dom';
import { FaRegUserCircle } from "react-icons/fa";
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
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
	const [showPassword, setShowPassword] = useState(false);
 	const [focusedField, setFocusedField] = useState(null);
	// const isFormValid = email.trim() !== '' && password.trim() !== '';
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

	const isFormValid = () => {
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
		const validationErrors = isFormValid();

		if (Object.keys(validationErrors).length > 0) {
	      setErrors(validationErrors);
	      return;
	    }

	    dispatch(signUpUser(signUpData, navigate, toast));
	    setSignUpData({ email: "", password: "", username: "" });
	    setErrors({});
	}
	const handleKeyPress = (event) => {
		const errors = isFormValid();
	    if (event.key === 'Enter' && Object.keys(errors).length < 0) {
	      handleSubmit();
	    }
	};
	const socialLogins = [
	    {
	      name: 'Google',
	      icon: (
	        <svg className="w-5 h-5" viewBox="0 0 24 24">
	          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
	          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
	          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
	          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
	        </svg>
	      ),
	    },
	    {
	      name: 'GitHub',
	      icon: (
	        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
	          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/>
	        </svg>
	      ),
	    },
	    {
	      name: 'Facebook',
	      icon: (
	        <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
	          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
	        </svg>
	      ),
	    },
  	];
	return (
		<div className="min-h-screen flex">
		{/* Left side - Image */}
	    <div className="hidden lg:block lg:w-2/3 relative overflow-hidden">
	        <div className="absolute inset-0 bg-gradient-to-br from-green-600 via-green-300 to-gray-800">
	          <div className="absolute inset-0 bg-black opacity-20"></div>
	          <div className="absolute inset-0 flex items-center justify-center p-12">
	            <div className="text-white max-w-2xl">
	              <h1 className="text-5xl font-bold mb-6">Welcome Back.</h1>
	              <p className="text-xl text-gray-100 leading-relaxed">
	                Login in and continue your journey with us. Experience seamless access to all your favorite blog topics.
	              </p>
	              <div className="mt-12 grid grid-cols-3 gap-8">
	                <div className="text-start">
	                  <div className="text-4xl font-bold">500K+</div>
	                  <div className="text-sm text-gray-200 mt-2">Active Users</div>
	                </div>
	                <div className="text-start">
	                  <div className="text-4xl font-bold">99.9%</div>
	                  <div className="text-sm text-gray-200 mt-2">Uptime</div>
	                </div>
	                <div className="text-start">
	                  <div className="text-4xl font-bold">4.9★</div>
	                  <div className="text-sm text-gray-200 mt-2">Rating</div>
	                </div>
	              </div>
	            </div>
	          </div>
	        </div>
	    </div>
	    {/* Right side - Form */}
      <div className="w-full lg:w-1/3 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign Up</h2>
            <p className="text-gray-600">Creae an account and explore blogs from all topics of life.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Username 
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className={`h-5 w-5 ${focusedField === 'username' ? 'text-green-600' : 'text-gray-400'}`} />
                </div>
                <input
                  id="username"
                  type="username"
                  name="username"
                  value={username}
                  onChange={onChange}
                  onFocus={() => setFocusedField('username')}
                  onBlur={() => setFocusedField(null)}
                  onKeyPress={handleKeyPress}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder:text-sm placeholder:text-gray-400 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all outline-none"
                  placeholder="Usename e.g. Jane"
                />
              </div>
            </div>
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className={`h-5 w-5 ${focusedField === 'email' ? 'text-green-600' : 'text-gray-400'}`} />
                </div>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={onChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  onKeyPress={handleKeyPress}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder:text-sm placeholder:text-gray-400 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all outline-none"
                  placeholder="Email e.g. jane.doe@gmail.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className={`h-5 w-5 ${focusedField === 'password' ? 'text-green-600' : 'text-gray-400'}`} />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={onChange}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  onKeyPress={handleKeyPress}
                  className="block w-full pl-10 pr-12 py-3 border border-gray-300 placeholder:text-sm placeholder:text-gray-400 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all outline-none"
                  placeholder="Enter your password"
                />		
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                  )}
                </button>
              </div>
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              disabled={!isFormValid && loading}
              className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all ${
                isFormValid
                  ? 'bg-green-600 hover:bg-green-700 transform hover:scale-105 shadow-lg'
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              Sign Up
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-3 gap-3">
            {socialLogins.map((social) => (
              <button
                key={social.name}
                type="button"
                className="flex items-center justify-center py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all transform hover:scale-105"
              >
                {social.icon}
              </button>
            ))}
          </div>

          {/* Sign Up Link */}
          <span className="mt-8 text-center text-sm text-gray-600">
            Already have an account?{' '}
            
            <Link to="/auth/register">
				<span className="text-sm cursor-pointer text-green-600 transition-all delay-200 ml-2">
				Login here.
				</span>
			</Link>
          </span>
        </div>
      </div>
	</div>
	)
}

export default Register