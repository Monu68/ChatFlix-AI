import React, { useRef, useState } from 'react';
import Header from './Header';
import {checkValidData} from '../utils/Validate'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../utils/Firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Login = () => {

    const [isSignInForm,setIsSignInForm] = useState(true);
    const [errorMessage,setErrorMessage] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);

    const handleButtonClick = () => {

        const message = checkValidData(name.current?.value,email.current?.value,password.current?.value);
        setErrorMessage(message);

        if(message) return;

        //SignUp and SignIn Logic

        if(!isSignInForm){
            //SignUp Logic
            createUserWithEmailAndPassword(auth, email.current?.value,password.current?.value)
            .then((userCredential) => {
                
                const user = userCredential.user;
                updateProfile(user,{
                    displayName: name.current?.value
                })
                .then(() => {
                    const {uid, email, displayName} = auth.currentUser;
                    dispatch(addUser({uid:uid, email:email, displayName:displayName}))
                    navigate('/browse')
                })
                .catch((error) => {
                    setErrorMessage(error.message)
                })

                console.log(user)
               
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMessage(errorCode + " : " + errorMessage)
            })
        }
        else{
            //SignIn Logic
            signInWithEmailAndPassword(auth, email.current?.value,password.current?.value)
            .then((userCredential) => {
                const user = userCredential.user
                console.log(user)
                navigate('/browse')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMessage(errorCode + " : " + errorMessage)
            })
        }
    }

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm)
    }
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <img
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="https://img.freepik.com/free-vector/cinema-stage-background-with-clapperboard-popcorn-chairs_1017-38722.jpg?semt=ais_hybrid"
        alt="Background"
      />
      <Header />
      <form 
        onSubmit={(e) => e.preventDefault()}
        className='m-24 w-3/12 p-12 relative mx-auto left-0 right-0 bg-black text-white bg-opacity-80'>
        <h1 className='font-bold text-3xl py-4'>{isSignInForm ?"Sign In" : "Sign Up"}</h1>

        {!isSignInForm && ( 
          <input 
            ref = {name}
          className='p-3 my-3 w-full rounded outline-none bg-slate-600' 
          type='text' placeholder='Full Name' 
        />
        )}
        <input 
          ref = {email}
          className='p-3 my-3 w-full rounded outline-none bg-slate-600' 
          type='text' placeholder='Email Address' 
        />
       
        <input 
          ref = {password}
          type='password' placeholder='Password' 
          className='p-3 my-3 w-full rounded outline-none  bg-slate-600'
        />

        <p className='text-red-500'>{errorMessage}</p>
        <button 
          className='bg-red-700 text-white p-3 my-5 w-full rounded' onClick={handleButtonClick}>
          {isSignInForm ?"Sign In" : "Sign Up"}
        </button>
        <p 
          className='py-4 cursor-pointer' onClick={toggleSignInForm}>
          {isSignInForm ?"New to ChatFlix? Sign Up Now" : "Already Registered? Sign In Now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
