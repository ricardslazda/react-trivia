import {createSlice} from "@reduxjs/toolkit";
import {fetchTriviaCategories} from "./categoriesAsyncThunks";

const categoriesSlice = createSlice({
    name: "categories",
    initialState: {
        categories: [],
        isFetching: true,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTriviaCategories.pending, (state) => {
                state.isFetching = true;
            })
            .addCase(fetchTriviaCategories.fulfilled, (state, action) => {
                state.isFetching = false;
                state.categories = action.payload.trivia_categories;
            })
    }
})

export default categoriesSlice.reducer;