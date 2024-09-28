import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = ({ onLogin, showAnimation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      {showAnimation ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <h1 className="text-6xl font-bold text-white animate-fade-in-out">
            H&D ENTERTAINMENT
          </h1>
        </div>
      ) : (
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
          H&D ENTERTAINMENT
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <Link to="/signup" className="text-sm text-red-500 hover:text-red-400">
                Sign Up
              </Link>
            </div>
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-500 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
            >
              Login
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
