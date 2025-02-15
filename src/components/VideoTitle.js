import React from 'react'

const VideoTitle = ({title, overview}) => {
  return (
    <div className='w-screen aspect-video pt-[12%] px-14 absolute text-white bg-gradient-to-t from-black'>
      <h1 className='text-5xl font-bold'>{title}</h1>
      <p className='py-5 text-base w-1/4'>{overview}</p>
      <div className='px-2'>
        <button className='bg-white text-black p-3 px-11 text-lg rounded-md hover:bg-opacity-50'> Play</button>
        <button className='mx-2 bg-gray-500 text-white p-3 px-11 text-lg bg-opacity-60 rounded-md'>More Info</button>
      </div>
    </div>
  )
  
}

export default VideoTitle;