import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App';
import * as serviceWorkerRegistration from './worker/serviceWorkerRegistration';
import reportWebVitals from './utils/reportWebVitals';

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import StopListElements from "./components/StopListElements/StopListElements";
import Orders from "./components/Orders/Orders";
import Tasks from "./components/Tasks/Tasks";
import Schedule from "./components/Schedule/Schedule";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
    },
    {
        path: "about",
        element: <div>About</div>,
    },
    {
        path: "orders",
        element:
            <div>
                <StopListElements/>
                <Orders/>
            </div>,
    },
    {
        path: "tasks",
        element: <div><Tasks/></div>,
    },
    {
        path: "schedule",
        element: <div><Schedule/></div>
    }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);

// If you want your App to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your App, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
