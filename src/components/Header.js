import React, { useEffect } from 'react';
import logo from '../utils/chatflix-logo1.png';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../utils/Firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(store => store.user);
  const handleSignOut = () =>{
    signOut(auth).then(() => {
    })
    .catch((error) => {
      navigate('/error')
    })
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth,(user) => {
        if(user){
            const {uid, email, displayName} = user;
            dispatch(
              addUser({uid:uid, email:email, displayName:displayName})
            )
            navigate("/browse");
        }
        else{
            dispatch(removeUser());
            navigate("/");
        }
    });

    //unsubscribe when component unmounts
    return () => unsubscribe();
  }, []);
  return (
    <div className="absolute w-screen  bg-red-500 p-2 flex justify-between items-center">
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
