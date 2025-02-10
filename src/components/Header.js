import React, { useEffect } from "react";
import logo from "../utils/chatflix-logo1.png";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/Firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { toggleGptSearchView } from "../utils/gptSlice";
import { SUPPORTED_LANGUAGE } from "../utils/constant";
import { changeLanguage } from "../utils/configLangSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store)=> store.gpt.showGptSearch)
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    //unsubscribe when component unmounts
    return () => unsubscribe();
  }, []);

  const handleGptButton = () => {
    //Toggle Gpt search
    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange = (e) =>{
    dispatch(changeLanguage(e.target.value))
  }
  return (
    <div className="absolute w-screen  bg-red-800 bg-opacity-80 p-2 flex justify-between items-center">
      <img
        className="w-36 h-auto object-contain"
        src={logo}
        alt="Chatflix Logo"
      />

      {user && (
        <div className="flex mx-2">
          {showGptSearch && (
             <select className="z-50 py-2 px-4  my-2 bg-gray-600 text-white rounded-sm pointer-events-auto hover:bg-gray-700"
             onChange={handleLanguageChange} 
           >
             {SUPPORTED_LANGUAGE.map((lang) => (
               <option key={lang.identifier} value={lang.identifier}>
                 {lang.name}
               </option>
             ))}
           </select>
 
          )}
         
          <button
            className="z-50 py-2 px-4 mx-5 my-2 bg-purple-800 text-white rounded-sm pointer-events-auto hover:bg-gray-700"
            onClick={handleGptButton}
          >
            {showGptSearch? "Home Page" : "GPT Search"}
          </button>
          <img
            alt="usericon"
            className="w-12 mx-2"
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
          />

          <button
            onClick={handleSignOut}
            className="z-50 font-bold text-white px-2 py-2 rounded-md  hover:bg-red-900 cursor-pointer pointer-events-auto"
          >
            (Sign Out)
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
