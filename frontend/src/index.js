import React, {createRef} from 'react';
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
import Orders from "./components/Orders/Orders";
import store from "./store";
import Schedule from "./components/Schedule/Schedule";
import UserProfile from "./components/UserProfile/UserProfile";
import Users from "./components/Users/Users";
import Chat from "./components/Chat/Chat";

const router = createBrowserRouter([
    {path: '/', name: 'Home', element: <App/>, },
    {path: '/orders', name: 'Orders', element: <div><Orders/></div>, },
    {
        path: '/tasks',
        name: 'Tasks',
        element: <div><Tasks user={getUserFromLocalStorage()}/></div>,
        
    },
    {
        path: '/schedule',
        name: 'Schedule',
        element: <div><Schedule user={getUserFromLocalStorage()}/></div>,
        
    },
    {
        path: '/profile',
        name: 'Profile',
        element: <div><UserProfile user={getUserFromLocalStorage()}/></div>,
        
    },
    {
        path: '/chat',
        name: 'Chat',
        element: <div><Chat user={getUserFromLocalStorage()}/></div>,
        
    },
    {
        path: '/users',
        name: 'Users',
        element: <div><Users user={getUserFromLocalStorage()}/></div>,
        
    }
]);


function getUserFromLocalStorage() {
    const userString = localStorage.getItem('user');

    try {
        return JSON.parse(userString);
    } catch (ignored) {
        return null;
    }
}

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
