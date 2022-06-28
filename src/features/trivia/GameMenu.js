import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {Button, Container, Form} from "react-bootstrap";
import {getIsFetchingCategories, getTriviaCategories} from "../categories/categoriesSelectors";
import {fetchTriviaCategories} from "../categories/categoriesAsyncThunks";
import Spinner from "../../common/Spinner";

const GameMenu = ({onTriviaStart}) => {
    const [categoryId, setCategoryId] = useState(0);

    const dispatch = useDispatch();
    const triviaCategories = useSelector(getTriviaCategories);
    const isFetchingCategories = useSelector(getIsFetchingCategories);

    useEffect(() => {
        dispatch(fetchTriviaCategories());
    }, [dispatch])

    if (isFetchingCategories) {
        return <Spinner/>
    }

    return (
        <Container className="p-3 center">
            <Form className="padding-bottom-center">
                <h1 className="mb-3">Trivia</h1>
                <Form.Group className="mb-3">
                    <Form.Select aria-label="Default select example" onChange={e => setCategoryId(e.target.value)}>
                        {triviaCategories.map((category) => <option key={category.id}
                                                                    value={category.id}>{category.name}</option>)}
                    </Form.Select>
                </Form.Group>
                <Button variant="primary" onClick={() => onTriviaStart(categoryId)}>Start</Button>
            </Form>
        </Container>
    )
}

export default GameMenu;