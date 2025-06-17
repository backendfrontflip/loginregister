import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaRegArrowAltCircleRight } from 'react-icons/fa';
import logingatewise from '/logingatewise.jpg';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      {/* Image Section */}
      <div className="w-full md:w-1/2">
        <img
          src={logingatewise}
          alt="Login Gatewise"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-green-50">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-green-700 mb-6">Login to Gatewise</h2>

          <form className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-green-700">
                Email address
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 w-full px-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div className="relative">
              <label htmlFor="password" className="block text-sm font-medium text-green-700">
                Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                className="mt-1 w-full px-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 pr-10"
                required
              />
              <span
                className="absolute top-9 right-3 cursor-pointer text-green-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <Link
              to="/dashboard"
              className="w-full inline-block text-center bg-green-600 text-2xl text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Login <FaRegArrowAltCircleRight className="inline ml-2" />
            </Link> 
          </form>

          <p className="mt-4 text-sm text-green-600">
            Don’t have an account?{' '}
            <Link to="/register" className="text-green-800 underline hover:text-green-900">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
