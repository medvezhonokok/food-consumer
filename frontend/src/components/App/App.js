import React, {useEffect, useState} from 'react';
import './App.css';
import CustomNavbar from '../CustomNavbar/CustomNavbar';
import LoginForm from '../LoginForm/LoginForm';
import MenuButtons from '../MenuButtons/MenuButtons';

function App() {
    const getUserFromLocalStorage = () => {
        const userString = localStorage.getItem('user');

        try {
            return JSON.parse(userString);
        } catch (ignored) {
            return null;
        }
    };

    const user = getUserFromLocalStorage();
    const [isLoggedIn, setIsLoggedIn] = useState(!!user);

    useEffect(() => {
        setIsLoggedIn(!!user);
    }, [user]);

    const handleLogout = () => {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        window.location.pathname = '/';
    };

    return (
        <div className="App">
            <div>
                {isLoggedIn ?
                    (
                        <div>
                            <CustomNavbar user={user}/>
                            <MenuButtons handleLogout={handleLogout}/>
                        </div>
                    ) :
                    (
                        <div>
                            <LoginForm/>
                        </div>
                    )
                }
            </div>
        </div>
    );
}


export default App;
