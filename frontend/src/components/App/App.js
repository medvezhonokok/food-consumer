import React, {useEffect, useState} from 'react';
import './App.css';
import CustomNavbar from '../CustomNavbar/CustomNavbar';
import LoginForm from '../LoginForm/LoginForm';
import RegisterForm from '../RegisterForm/RegisterForm';

function App() {
    const getUserFromLocalStorage = () => {
        const userString = localStorage.getItem('user');
        return userString ? JSON.parse(userString) : null;
    };

    const user = getUserFromLocalStorage();
    const [isLoggedIn, setIsLoggedIn] = useState(!!user);
    const [showLoginForm, setShowLoginForm] = useState(true);

    useEffect(() => {
        setIsLoggedIn(!!user);
    }, [user]);

    const handleLogout = () => {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        window.location.reload();
    };

    const handleSwitchForm = () => {
        setShowLoginForm((prevShowLoginForm) => !prevShowLoginForm);
    };

    return (
        <div className="App">
            <div>
                {isLoggedIn ? (
                    <div>
                        <CustomNavbar user={user} handleLogout={handleLogout}/>
                    </div>
                ) : (
                    <div>
                        {showLoginForm ? (
                            <>
                                <LoginForm/>
                                <p>
                                    Don't have an account?{' '}
                                    <button onClick={handleSwitchForm}>Register</button>
                                </p>
                            </>
                        ) : (
                            <>
                                <RegisterForm/>
                                <p>
                                    Already have an account?{' '}
                                    <button onClick={handleSwitchForm}>Login</button>
                                </p>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
