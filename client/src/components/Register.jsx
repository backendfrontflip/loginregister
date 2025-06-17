import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import registerImage from '/register.jpg';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const createUser = () => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    axios
      .post(
        "https://legendary-pancake-pjj66v9w6gp92xrv-3000.app.github.dev/register",
        {
          email,
          username,
          password,
        }
      )
      .then(() => {
        toast.success("Account successfully created!");
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      })
      .catch((error) => {
        console.error("There was an error creating the account!", error);
        toast.error("Failed to create account. Please try again.");
      });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      <div className="w-full md:w-1/2">
        <img src={registerImage} alt="Register" className="h-full w-full object-cover" />
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-green-50">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-green-700 mb-6">Create an Account</h2>

          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              createUser();
            }}
          >
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-green-700">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="mt-1 w-full px-4 py-2 border border-green-300 rounded-md"
                required
              />
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-green-700">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="mt-1 w-full px-4 py-2 border border-green-300 rounded-md"
                required
              />
            </div>

            <div>
              <label htmlFor="username" className="block text-sm font-medium text-green-700">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 w-full px-4 py-2 border border-green-300 rounded-md"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-green-700">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full px-4 py-2 border border-green-300 rounded-md"
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full px-4 py-2 border border-green-300 rounded-md pr-10"
                required
              />
              <span
                className="absolute top-9 right-3 cursor-pointer text-green-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <div className="relative">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-green-700">
                Confirm Password
              </label>
              <input
                type={showConfirm ? 'text' : 'password'}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 w-full px-4 py-2 border border-green-300 rounded-md pr-10"
                required
              />
              <span
                className="absolute top-9 right-3 cursor-pointer text-green-600"
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
            >
              Register
            </button>
          </form>

          <p className="mt-4 text-sm text-green-600">
            Already have an account?{' '}
            <Link to="/" className="text-green-800 underline hover:text-green-900">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
