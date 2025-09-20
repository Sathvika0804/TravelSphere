import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom'; // Import Link

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/user/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        toast.success('✅ Registration successful! Please sign in.');
        navigate('/signin');
      } else {
        toast.error('❌ Registration failed. Email may already exist.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('❌ An error occurred during registration.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex flex-col justify-center items-center p-4">
      {/* Container with fade-in animation */}
      <div className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-xl animate-fadeIn">
        
        {/* Title with emoji */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6 flex items-center justify-center">
          Sign Up 
          <span className="ml-2 text-3xl">🚀</span>
        </h2>

        <form onSubmit={handleRegister} className="space-y-6">
          {/* Name Input */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-600">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
            />
          </div>

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
            />
          </div>

          {/* Sign Up Button with hover and click effects */}
          <button
            type="submit"
            className="w-full py-3 px-4 rounded-lg bg-purple-600 text-white font-semibold shadow-md transition-all duration-300 transform hover:bg-purple-700 active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            Sign Up
          </button>
        </form>

        {/* Link to Sign In */}
        <div className="mt-6 text-center text-sm">
          <p className="flex items-center justify-center text-gray-600">
            <span className="mr-1">Already have an account?</span>{" "}
            <Link to="/signin" className="font-medium text-purple-600 hover:text-purple-700 transition-colors duration-200 ml-1">
              Sign In
            </Link>
            <span className="ml-1">👋</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;