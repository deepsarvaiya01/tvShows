import React, { lazy, Suspense, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Schedule from './components/Schedule';
import Login from './components/Login';
import SignUp from './components/SignUp';
import HDEntAnimation from './components/HDEntAnimation';
import Footer from './components/Footer';
import BottomNavbar from './components/BottomNavbar';

// Lazy loading of Modal and other components
const LazyModal = lazy(() => import('./components/Modal'));
const TvShows = lazy(() => import('./components/TvShows'));
const Movies = lazy(() => import('./components/Movies'));
const Sports = lazy(() => import('./components/Sports'));
const Series = lazy(() => import('./components/Series'));

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const [showAnimation, setShowAnimation] = useState(false); // Track if animation should show
  const [users, setUsers] = useState([]); // Track registered users
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState('');

  // Load users from local storage on component mount
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(storedUsers);
  }, []);

  // Handle user sign-up
  const handleSignUp = (userData) => {
    const newUsers = [...users, userData];
    setUsers(newUsers);
    localStorage.setItem('users', JSON.stringify(newUsers));
    alert('Sign up successful! Please log in with your new credentials.');
  };

  // Handle user login
  const handleLogin = (username, password) => {
    const user = users.find((u) => u.username === username && u.password === password);
    if (user) {
      setShowAnimation(true); // Show the animation
      setTimeout(() => {
        setShowAnimation(false); // Hide animation after 3 seconds
        setIsLoggedIn(true); // Mark user as logged in
      }, 3000);
    } else {
      alert('Invalid credentials. Please try again.');
    }
  };

  // Handle user logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    alert('Logged out successfully!');
  };

  const openModal = (videoUrl) => {
    setCurrentVideo(videoUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentVideo('');
  };

  return (
    <Router>
      <div className="bg-gray-900 text-gray-200 min-h-screen">
        {showAnimation ? (
          <HDEntAnimation />
        ) : (
          <>
            {isLoggedIn && <Navbar onLogout={handleLogout} />} {/* Show navbar only when logged in */}
            <Routes>
              <Route
                path="/"
                element={
                  isLoggedIn ? (
                    <Navigate to="/home" /> // Redirect to home page after login
                  ) : (
                    <Login onLogin={handleLogin} /> // Show login page if not logged in
                  )
                }
              />
              <Route
                path="/signup"
                element={<SignUp onSignUp={handleSignUp} />} // Sign-up page
              />
              <Route
                path="/home"
                element={
                  isLoggedIn ? (
                    <>
                      <Home openModal={openModal} /> {/* Show home page if logged in */}
                      <BottomNavbar /> {/* Show Bottom Navbar */}
                    </>
                  ) : (
                    <Navigate to="/" /> // Redirect to login if not logged in
                  )
                }
              />
              <Route
                path="/schedule"
                element={
                  isLoggedIn ? (
                    <>
                      <Schedule /> {/* Show schedule page if logged in */}
                      <BottomNavbar /> {/* Show Bottom Navbar */}
                    </>
                  ) : (
                    <Navigate to="/" /> // Redirect to login if not logged in
                  )
                }
              />
              <Route path="/tv-shows" element={
                isLoggedIn ? (
                  <>
                    <Suspense fallback={<div>Loading...</div>}>
                      <TvShows openModal={openModal} />
                    </Suspense>
                    <BottomNavbar /> {/* Show Bottom Navbar */}
                  </>
                ) : (
                  <Navigate to="/" />
                )
              } />
              <Route path="/movies" element={
                isLoggedIn ? (
                  <>
                    <Suspense fallback={<div>Loading...</div>}>
                      <Movies openModal={openModal} />
                    </Suspense>
                    <BottomNavbar /> {/* Show Bottom Navbar */}
                  </>
                ) : (
                  <Navigate to="/" />
                )
              } />
              <Route path="/sports" element={
                isLoggedIn ? (
                  <>
                    <Suspense fallback={<div>Loading...</div>}>
                      <Sports openModal={openModal} />
                    </Suspense>
                    <BottomNavbar /> {/* Show Bottom Navbar */}
                  </>
                ) : (
                  <Navigate to="/" />
                )
              } />
              <Route path="/series" element={
                isLoggedIn ? (
                  <>
                    <Suspense fallback={<div>Loading...</div>}>
                      <Series openModal={openModal} />
                    </Suspense>
                    <BottomNavbar /> {/* Show Bottom Navbar */}
                  </>
                ) : (
                  <Navigate to="/" />
                )
              } />
            </Routes>
          </>
        )}

        <Footer />
        {isModalOpen && (
          <Suspense fallback={<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">Loading...</div>}>
            <LazyModal videoUrl={currentVideo} closeModal={closeModal} />
          </Suspense>
        )}
      </div>
    </Router>
  );
};

export default App;
