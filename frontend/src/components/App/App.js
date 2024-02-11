import React, { useEffect, useState } from 'react';
import './App.css';
import CustomNavbar from '../CustomNavbar/CustomNavbar';
import LoginForm from '../LoginForm/LoginForm';
import RegisterForm from '../RegisterForm/RegisterForm';
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
    const [showLoginForm, setShowLoginForm] = useState(true);

    useEffect(() => {
        setIsLoggedIn(!!user);
    }, [user]);

    const handleLogout = () => {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        window.location.pathname = '/';
    };

    const handleSwitchForm = () => {
        setShowLoginForm((prevShowLoginForm) => !prevShowLoginForm);
    };

    return (
        <div className="App">
            <div>
                {isLoggedIn ? (
                    <div>
                        <CustomNavbar user={user} />
                        <MenuButtons handleLogout={handleLogout} />
                    </div>
                ) : (
                    <div>
                        {showLoginForm ? (
                            <>
                                <LoginForm />
                                <p style={styles.switchFormText}>
                                <span onClick={handleSwitchForm} style={styles.switchFormTextButton}>
                                    Don't have an account?
                                </span>
                                </p>
                            </>
                        ) : (
                            <>
                                <RegisterForm />
                                <p style={styles.switchFormText}>
                                <span onClick={handleSwitchForm} style={styles.switchFormTextButton}>
                                    Already have an account?
                                </span>
                                </p>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

const styles = {
    switchFormText: {
        textAlign: 'center',
        marginTop: '10px',
    },
    switchFormTextButton: {
        textDecoration: 'underline',
        cursor: 'pointer',
        marginLeft: '5px',
        transition: 'color 0.3s ease',
    },
    switchFormTextButtonHover: {
        color: '#9c9a7d',
    },
};


export default App;
