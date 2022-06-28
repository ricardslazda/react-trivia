import {createSlice} from "@reduxjs/toolkit";
import {DEFAULT_QUESTION_AMOUNT, fetchTrivia} from "./triviaAsyncThunks";

export const TRIVIA_GAME_STATUS_NEW = 'new';
export const TRIVIA_GAME_STATUS_IN_PROGRESS = 'in_progress';
export const TRIVIA_GAME_STATUS_FINISHED = 'finished';

const defaultScore = {
    points: 0,
    correctAnswers: 0,
    incorrectAnswers: 0
};

const triviaSlice = createSlice({
    name: "trivia",
    initialState: {
        gameStatus: TRIVIA_GAME_STATUS_NEW,
        triviaGame: {},
        questionCount: DEFAULT_QUESTION_AMOUNT,
        activeQuestionIndex: 0,
        score: defaultScore,
        isFetching: false,
    },
    reducers: {
        setActiveQuestionIndex: (state, action) => {
            state.activeQuestionIndex = action.payload;
        },
        setGameStatus: (state, action) => {
            state.gameStatus = action.payload;
        },
        startGame: (state) => {
            state.gameStatus = TRIVIA_GAME_STATUS_IN_PROGRESS;
            state.activeQuestionIndex = 0;
            state.score = defaultScore;
        },
        resetGame: (state) => {
            state.gameStatus = TRIVIA_GAME_STATUS_NEW;
            state.activeQuestionIndex = 0;
            state.score = defaultScore;
        },
        incrementScore: (state) => {
            state.score.points += 25;
            state.score.correctAnswers++;
        },
        decrementScore: (state) => {
            state.score.points -= 10;
            state.score.incorrectAnswers++;
        }
    },
    extraReducers: function (builder) {
        builder
            .addCase(fetchTrivia.pending, (state, action) => {
                state.isFetching = true;
            })
            .addCase(fetchTrivia.fulfilled, (state, action) => {
                state.triviaGame = action.payload.results;
                state.isFetching = false;
            })
    }
})

export const {
    setActiveQuestionIndex,
    setGameStatus,
    startGame,
    resetGame,
    incrementScore,
    decrementScore,
} = triviaSlice.actions;

export default triviaSlice.reducer;