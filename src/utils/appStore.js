import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import moviesReducer from "./moviesSlice"
import getReducer from "./gptSlice"
import configReducer from "./configLangSlice"

const appStore = configureStore(
    {
        reducer:{
            user : userReducer,
            movies: moviesReducer,
            gpt: getReducer,
            config: configReducer,
        }
    }
)

export default appStore;