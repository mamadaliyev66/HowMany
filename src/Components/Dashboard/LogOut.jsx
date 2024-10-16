import React from 'react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory

const LogOut = () => {
  const navigate = useNavigate(); // Use useNavigate for navigation

  const handleLogOut = () => {
    // Clear local storage
    localStorage.clear();

    // Redirect to the login or home page
    navigate('/login'); // Change this to your desired route
  };

  return (
    <div className="w-full max-w-md mx-auto mt-10 text-white text-center">
      <h1 className="text-2xl font-bold mb-4">Are you sure you want to log out?</h1>
      <button
        onClick={handleLogOut}
        className="w-full p-2 bg-red-600 rounded hover:bg-red-500 transition duration-300"
      >
        Log Out
      </button>
    </div>
  );
};

export default LogOut;
