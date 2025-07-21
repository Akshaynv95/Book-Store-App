import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.jsx';
import { useSelector } from 'react-redux';
import Auth from './pages/Auth/Auth.jsx';
import Home from './pages/Home/Home.jsx';
import BookList from './pages/BookList/BookList.jsx';
import BookDetail from './pages/BookDetail/BookDetail.jsx';
import UserProfile from './pages/UserProfile/UserProfile.jsx';
import AddBook from './pages/AddBook/AddBookPage.jsx';

const App = () => {
  const { token } = useSelector((state) => state.auth);

  return (
    <Router>
      {/* Navbar is always shown after login */}
      {token && <Navbar />}

      <Routes>
        <Route path="/" element={token ? <Navigate to="/home" /> : <Auth />} />
        <Route path="/home" element={<Home />} />
        <Route path="/books" element={<BookList />} />
        <Route path="/books/:id" element={<BookDetail />} />
        <Route path="/profile/:id" element={<UserProfile />} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
