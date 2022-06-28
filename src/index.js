import React from 'react';
import {createRoot} from 'react-dom/client';
import {Provider} from "react-redux";
import {store} from "./app/store";

/** Bootstrap **/
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router } from "react-router-dom";
import App from "./app";

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <Router>
                <App/>
            </Router>
        </Provider>
    </React.StrictMode>
);