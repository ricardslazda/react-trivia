import {configureStore} from "@reduxjs/toolkit";
import TriviaReducer from "../features/trivia/triviaSlice"
import CategoriesReducer from "../features/categories/categoriesSlice"

export const store = configureStore({
    reducer: {
        trivia: TriviaReducer,
        categories: CategoriesReducer
    }
})