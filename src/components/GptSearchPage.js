import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMovieSuggestion from './GptMovieSuggestion'
import { BG_URL } from '../utils/constant'
import Header from './Header';

const GptSearchPage = () => {
  return (
    // <div className='relative w-full h-screen'>
    //     <div className='absolute top-0 left-0 w-full h-full object-cover'>
    //         <img 
    //         className="absolute "
    //         src ={BG_URL} alt="logo" />
    //     </div>
    //   <GptSearchBar/>
    //   <GptMovieSuggestion/>
    // </div>



<div className="relative w-full h-screen overflow-hidden">
  {/* Background Image */}
  <img
    className="absolute inset-0 w-full h-full object-cover -z-10"
    src={BG_URL}
    alt="Background"
  />

  {/* Header (Make sure it's on top) */}
  <div className="relative z-20">
    <Header />
  </div>

  {/* Content (Search Bar and Suggestions) */}
  <div className="relative z-10 flex flex-col items-center mt-20">
    <GptSearchBar />
    <GptMovieSuggestion />
  </div>
</div>
  )}



export default GptSearchPage;