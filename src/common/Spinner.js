import {Spinner as BootstrapSpinner} from "react-bootstrap";

const Spinner = () => {
    return <div className="center padding-bottom-center">
        <BootstrapSpinner animation="border" role="status"/>
    </div>
}

export default Spinner;