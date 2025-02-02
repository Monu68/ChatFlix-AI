import React from 'react';
import logo from '../utils/chatflix-logo1.png';
import { signOut } from 'firebase/auth';
import { auth } from '../utils/Firebase';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector(store => store.user);
  const handleSignOut = () =>{
    signOut(auth).then(() => {
      navigate('/')
    })
    .catch((error) => {
      navigate('/error')
    })
  }
  return (
    <div className="absolute w-screen  bg-red-800 p-2 flex justify-between items-center">
      <img className="w-36 h-auto object-contain" src={logo} alt="Chatflix Logo" />
    
     {user && <div className='flex mx-2'>
        <img 
        alt='usericon'
        className='w-12' 
        src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
        />

        <button onClick={handleSignOut} className='font-bold text-white'>(Sign Out)</button>
      </div>} 
    </div>
  );
};

export default Header;
