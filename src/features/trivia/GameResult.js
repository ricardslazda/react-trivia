import {useSelector} from "react-redux";
import {Button, Container} from "react-bootstrap";
import {getTriviaScore} from "./triviaSelectors";

const GameResult = ({onPlayAgain}) => {
    const score = useSelector(getTriviaScore);

    return (
        <Container className="center padding-bottom-center">
            <div>
                <h1>Correct answers: <span className="answer--correct">{score.correctAnswers}</span></h1>
                <h1>Incorrect answers: <span className="answer--incorrect">{score.incorrectAnswers}</span></h1>
                <h1>Score: {score.points}</h1>
                <Button variant="primary mt-4" onClick={onPlayAgain}>Play again</Button>
            </div>
        </Container>
    )
}

export default GameResult;