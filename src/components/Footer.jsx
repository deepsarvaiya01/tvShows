import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 py-8">
      <div className="container mx-auto text-center text-gray-500">
        <p>&copy; 2024 Entertainment Channel. All rights reserved.</p>
        <div className="mt-4">
          <a href="#" className="hover:text-red-500 mx-2">Facebook</a>
          <a href="#" className="hover:text-red-500 mx-2">Twitter</a>
          <a href="#" className="hover:text-red-500 mx-2">Instagram</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer