import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './custom.scss'
import App from './components/App/App';
import reportWebVitals from './utils/reportWebVitals';
import {Provider} from "react-redux";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import Tasks from "./components/Tasks/Tasks";
import Orders from "./components/Orders/Orders";
import store from "./store";
import Schedule from "./components/Schedule/Schedule";
import UserProfile from "./components/UserProfile/UserProfile";
import Users from "./components/Users/Users";
import Chat from "./components/Chat/Chat";
import Tester from "./components/Tester/Tester";

const router = createBrowserRouter([
    {
        path: '/',
        name: 'Home',
        element: <App/>,
    },
    {
        path: '/orders',
        name: 'Orders',
        element: <div><Orders/></div>,
    },
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
    },
    {
        path: "/test",
        name: "Test",
        element: <div><Tester/></div>
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

serviceWorkerRegistration.register();

reportWebVitals();
