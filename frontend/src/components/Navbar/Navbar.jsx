import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/authSlice';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/home">BOOKSTORE</Link>
        <Link to="/books">Books</Link>
        <Link to="/add-book">Add Book</Link>
      </div>
      <div className="navbar-right">
        <Link to={`/profile/${user?.id || user?._id}`}>Profile</Link>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
