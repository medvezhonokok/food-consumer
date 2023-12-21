import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './custom.scss'
import App from './components/App/App';
import * as serviceWorkerRegistration from './worker/serviceWorkerRegistration';
import reportWebVitals from './utils/reportWebVitals';
import {Provider} from "react-redux";
import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import Tasks from "./components/Tasks/Tasks";
import Notes from "./components/Notes/Notes";
import store from "./store";

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
                <Notes/>
            </div>,
    },
    {
        path: "tasks",
        element: <div><Tasks/></div>,
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router}/>
        </Provider>
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
