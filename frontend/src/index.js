import React, {createRef} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './custom.scss';
import {createBrowserRouter, RouterProvider, useLocation, useOutlet} from 'react-router-dom';
import {CSSTransition, SwitchTransition} from 'react-transition-group';
import {Container} from 'react-bootstrap';
import App from './components/App/App';
import * as serviceWorkerRegistration from './worker/serviceWorkerRegistration';
import reportWebVitals from './utils/reportWebVitals';
import {Provider} from 'react-redux';
import Tasks from './components/Tasks/Tasks';
import Notes from './components/Notes/Notes';
import store from './store';
import Schedule from './components/Schedule/Schedule';
import UserProfile from './components/UserProfile/UserProfile';
import Users from './components/Users/Users';

const routes = [
    {path: '/', name: 'Home', element: <App/>, nodeRef: createRef()},
    {path: '/orders', name: 'Orders', element: <div><Notes/></div>, nodeRef: createRef()},
    {
        path: '/tasks',
        name: 'Tasks',
        element: <div><Tasks user={getUserFromLocalStorage()}/></div>,
        nodeRef: createRef()
    },
    {
        path: '/schedule',
        name: 'Schedule',
        element: <div><Schedule user={getUserFromLocalStorage()}/></div>,
        nodeRef: createRef()
    },
    {
        path: '/profile',
        name: 'Profile',
        element: <div><UserProfile user={getUserFromLocalStorage()}/></div>,
        nodeRef: createRef()
    },
    {path: '/users', name: 'Users', element: <div><Users user={getUserFromLocalStorage()}/></div>, nodeRef: createRef()}
];

const router = createBrowserRouter([
    {
        path: '/',
        element: <PathContainer/>,
        children: routes.map((route) => ({
            index: route.path === '/',
            path: route.path === '/' ? undefined : route.path,
            element: route.element,
        })),
    },
]);

function PathContainer() {
    const location = useLocation();
    const currentOutlet = useOutlet();
    const {nodeRef} = routes.find((route) => route.path === location.pathname) ?? {};
    return (
        <>
            <Container className="container">
                <SwitchTransition>
                    <CSSTransition
                        key={location.pathname}
                        nodeRef={nodeRef}
                        timeout={300}
                        classNames="page"
                        unmountOnExit
                    >
                        {(state) => (
                            <div ref={nodeRef} className="page">
                                {currentOutlet}
                            </div>
                        )}
                    </CSSTransition>
                </SwitchTransition>
            </Container>
        </>
    );
}

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

serviceWorkerRegistration.unregister();

reportWebVitals();
