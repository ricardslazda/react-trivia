import React, {useEffect} from "react";
import {Route, Routes} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router";
import {
    decrementScore,
    incrementScore,
    setActiveQuestionIndex,
    setGameStatus,
    startGame,
    resetGame,
    TRIVIA_GAME_STATUS_FINISHED,
} from "./features/trivia/triviaSlice";
import GameResult from "./features/trivia/GameResult";
import Question from "./features/trivia/Question";
import {fetchTrivia} from "./features/trivia/triviaAsyncThunks";
import GameMenu from "./features/trivia/GameMenu";
import {getActiveQuestionIndex, getQuestionCount, getTriviaGame} from "./features/trivia/triviaSelectors";
import "./app.scss";

export const App = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const triviaGame = useSelector(getTriviaGame);
    const activeQuestionIndex = useSelector(getActiveQuestionIndex);
    const questionCount = useSelector(getQuestionCount);

    useEffect(() => {
        navigate("/");
    }, [])

    const onTriviaStart = async (categoryId) => {
        dispatch(fetchTrivia(categoryId));
        dispatch(startGame());

        navigate(`/question/${activeQuestionIndex}`);
    }

    const onAnswerSelect = (isAnswerCorrect) => {
        const nextQuestionIndex = activeQuestionIndex + 1;
        const isGameOver = nextQuestionIndex === questionCount;
        isAnswerCorrect ? dispatch(incrementScore()) : dispatch(decrementScore());

        if (!isGameOver) {
            const newActiveQuestionIndex = nextQuestionIndex;
            dispatch(setActiveQuestionIndex(newActiveQuestionIndex));

            navigate(`/question/${newActiveQuestionIndex}`);
        } else {
            dispatch(setGameStatus(TRIVIA_GAME_STATUS_FINISHED));
            navigate('/score');
        }
    }

    const onPlayAgain = () => {
        navigate('/');
        dispatch(resetGame());
    };

    return (
        <div>
            <Routes>
                <Route path="/" element={<GameMenu onTriviaStart={onTriviaStart}/>}/>
                <Route path="/question/:questionIndex"
                       element={<Question triviaGame={triviaGame} onAnswerSelect={onAnswerSelect}/>}/>
                <Route path="/score" element={<GameResult onPlayAgain={onPlayAgain}/>}/>
            </Routes>
        </div>
    );
}

export default App;