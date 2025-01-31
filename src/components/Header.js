import React from 'react';
import logo from '../utils/chatflix-logo1.png';

const Header = () => {
  return (
    <div className="absolute top-5 left-7">
      <img className="w-36 h-auto object-contain" src={logo} alt="Chatflix Logo" />
    </div>
  );
};

export default Header;
