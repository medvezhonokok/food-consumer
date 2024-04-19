import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import UserProfile from "./components/UserProfile/UserProfile";
import Users from "./components/Users/Users";
import Schedule from "./components/Schedule/Schedule";
import News from "./components/News/News";
import Chat from "./components/Chat/Chat";
import StopList from "./components/StopList/StopList";
import Tasks from "./components/Tasks/Tasks";
import Orders from "./components/Orders/Orders";
import {Provider} from 'react-redux';
import store from './data/store';
import {init} from "./reducers/orders";
import CheckList from "./components/CheckList/CheckList";

store.dispatch(init());

export function logout() {
    localStorage.removeItem('user');
    window.location.href = "/";
}

export function getUser() {
    try {
        return JSON.parse(localStorage.getItem('user'));
    } catch (ignored) {
        return null;
    }
}

const router = createBrowserRouter([
    {
        path: '/',
        name: 'Home',
        element: <App/>,
    },
    {
        path: '/profile',
        name: 'Profile',
        element: <UserProfile user={getUser()}/>,
    },
    {
        path: '/users',
        name: 'Users',
        element: <Users user={getUser()}/>,
    },
    {
        path: '/schedule',
        name: 'Schedule',
        element: <Schedule user={getUser()}/>,
    },
    {
        path: '/news',
        name: 'News',
        element: <News user={getUser()}/>,
    },
    {
        path: '/chat',
        name: 'Chat',
        element: <Chat user={getUser()}/>,
    },
    {
        path: '/stop_list',
        name: 'Stop list',
        element: <StopList user={getUser()}/>,
    },
    {
        path: '/tasks',
        name: 'Tasks',
        element: <Tasks user={getUser()}/>,
    },
    {
        path: '/orders',
        name: 'Orders',
        element: <Orders user={getUser()}/>,
    },
    {
        path: '/check_list',
        name: 'Check list',
        element: <CheckList user={getUser()}/>,
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

serviceWorkerRegistration.unregister();

reportWebVitals();
