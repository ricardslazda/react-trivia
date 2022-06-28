import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {getGameStatus, getTriviaGame} from "../features/trivia/triviaSelectors";

const useIsGameValid = (status) => {
    const triviaGame = useSelector(getTriviaGame);
    const gameStatus = useSelector(getGameStatus)

    const [isGameValid, setIsGameValid] = useState();

    useEffect(() => {
        setIsGameValid(Object.keys(triviaGame).length !== 0 && gameStatus === status);
    }, [gameStatus, status, triviaGame])

    return isGameValid;
}

export default useIsGameValid;