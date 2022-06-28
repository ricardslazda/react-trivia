import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const DEFAULT_QUESTION_AMOUNT = 5;

const getTriviaApiUrl = (questionAmount, categoryId) => `https://opentdb.com/api.php?amount=${questionAmount}&category=${categoryId}`

export const fetchTrivia = createAsyncThunk("trivia/getTrivia", async (categoryId) => {
    const triviaApiUrl = getTriviaApiUrl(DEFAULT_QUESTION_AMOUNT, categoryId)
    const response = await axios.get(triviaApiUrl);
    return response.data;
})