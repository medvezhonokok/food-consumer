import React from 'react';
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

    return (
        <div className="App">
            <div>
                {user ?
                    (
                        <div>
                            <CustomNavbar user={user}/>
                            <MenuButtons/>
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
