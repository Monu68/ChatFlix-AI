import React from "react";
import { useSelector } from "react-redux";
import lang from "../utils/languageConstant";


const GptSearchBar = () => {

  const langKey = useSelector((store) => store.config.lang);
  console.log("Current Language Key:", langKey);
          console.log("Language Data:", lang[langKey]);

  return (
    <div className="absolute top-[180%] left-1/2 transform -translate-x-1/2 z-10 w-full flex justify-center">
      <form className="w-3/4 max-w-2xl bg-black bg-opacity-70 rounded-lg grid grid-cols-12 p-4">
        <input
          type="text"
          className="p-4 col-span-9 rounded-md outline-none"
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button className="col-span-3 ml-2 py-2 px-4 bg-red-700 text-white rounded-md">
        {lang[langKey].search }
        </button>
        
      </form>
    </div>
  );
};

export default GptSearchBar;
