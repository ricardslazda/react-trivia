import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const TRIVIA_CATEGORY_API_URL = "https://opentdb.com/api_category.php";

export const fetchTriviaCategories = createAsyncThunk("trivia/getTriviaCategories", async () => {
    const response = await axios.get(TRIVIA_CATEGORY_API_URL);
    return response.data;
})