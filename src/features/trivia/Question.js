import {useParams} from "react-router";
import {Button, Container} from "react-bootstrap";
import {randomArrayShuffle} from "../../helpers/array";
import {useSelector} from "react-redux";
import {TRIVIA_GAME_STATUS_IN_PROGRESS} from "./triviaSlice";
import Spinner from "../../common/Spinner";
import {getIsFetchingTrivia} from "./triviaSelectors";
import useIsGameValid from "../../common/useIsGameValid";

const Question = ({triviaGame, onAnswerSelect}) => {
    const {questionIndex} = useParams();
    const isFetchingTrivia = useSelector(getIsFetchingTrivia)
    const isGameValid = useIsGameValid(TRIVIA_GAME_STATUS_IN_PROGRESS);

    if (isFetchingTrivia || !isGameValid) {
        return <Spinner/>
    }

    const activeQuestion = triviaGame[questionIndex];

    const getAnswers = () => {
        const incorrectAnswers = activeQuestion.incorrect_answers.map((answer, index) => {
            return <Button className="m-1" key={index} variant="primary"
                           onClick={() => onAnswerSelect(false)}>{answer}</Button>;
        });
        const correctAnswer = [<Button className="m-1" key={-1} variant="primary"
                                       onClick={() => onAnswerSelect(true)}>{activeQuestion.correct_answer}</Button>];

        return randomArrayShuffle([...incorrectAnswers, ...correctAnswer]);
    };

    return (
        <Container className="center padding-bottom-center">
            <div>
                <div>
                    <h1 className="m-1 pb-4">{activeQuestion.question}</h1>
                </div>
                <div>
                    {getAnswers()}
                </div>
            </div>
        </Container>
    );
}

export default Question;