import React, {useState} from 'react';
import './LoginForm.css';
import {Button} from "react-bootstrap";

const LoginForm = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const setLoginOrPasswordValue = (e) => {
        const {name, value} = e.target;

        if (name === 'login') {
            setLogin(value);
        } else if (name === 'password') {
            setPassword(value);
        } else {
            throw Error('Unexpected error.');
        }
    };

    const handleLoginSuccess = async (jwtToken) => {
        localStorage.setItem('jwtToken', jwtToken);
        try {
            const userResponse = await fetch(`http://5.101.51.223:8080/api/1/users/auth?jwt=${jwtToken}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            });

            if (!userResponse.ok) {
                alert("Oops, an error occurred!");
                return;
            }

            const user = await userResponse.json();
            localStorage.setItem('user', JSON.stringify(user));
            window.location.reload();
        } catch (error) {
            console.error('Failed to fetch user information:', error.message);
        }
    };

    const submitLoginForm = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://5.101.51.223:8080/api/2/jwt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    login,
                    password,
                }),
            });
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText);
            }
            const jwtToken = await response.text();
            await handleLoginSuccess(jwtToken);
        } catch (error) {
            console.error('Authentication failed:', error);
            setErrors({authentication: 'Authentication failed'});
        }
    }

    return (
        <form className="loginForm" onSubmit={submitLoginForm}>
            <div>
                <label>Login</label>
                <input className="profileInput" type="text" name="login" value={login}
                       onChange={setLoginOrPasswordValue}/>
            </div>
            <div>
                <label>Password</label>
                <input className="profileInput" type="password" name="password" value={password}
                       onChange={setLoginOrPasswordValue}/>
            </div>
            {errors.authentication && <div className="error">{errors.authentication}</div>}
            <Button className="animatedButton buttonCommon" type="submit">Log in</Button>
        </form>
    );
};
export default LoginForm;
