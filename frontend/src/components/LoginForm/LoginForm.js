import React, {useState} from 'react';
import './LoginForm.css';
import axios from 'axios';
import {Button} from "react-bootstrap";
import * as constants from "./../../constants/constants";

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

    const authenticateUserByJWT = async (jwtToken) => {
        localStorage.setItem('jwtToken', jwtToken);

        try {
            const response = await axios.get(constants.BACKEND_JAVA_URL + `/1/users/auth?jwt=${jwtToken}`,{
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                }
            });

            const user = JSON.stringify(response.data);
            localStorage.setItem('user', user);
            window.location.reload();
        } catch (error) {
            console.error('Failed to fetch user information:', error);
        }
    };

    const submitLoginForm = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(constants.BACKEND_JAVA_URL + '/2/jwt', {
                login,
                password,
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            await authenticateUserByJWT(response.data);
        } catch (error) {
            console.error('Authentication failed:', error);
            setErrors({authentication: 'Invalid login or password'});
        }
    };

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
