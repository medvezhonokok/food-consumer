import React, {useState} from 'react';
import styles from './LoginForm.module.css';
import {Button} from "react-bootstrap";
import client from "../../utils/client";

const LoginForm = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const {name, value} = e.target;
        if (name === 'login') {
            setLogin(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    };

    const handleLoginSuccess = async (jwtToken) => {
        localStorage.setItem('jwtToken', jwtToken);

        try {
            const user = await client.get(`/api/1/users/auth`, {jwt: jwtToken});
            localStorage.setItem('user', JSON.stringify(user));
            window.location.reload();
        } catch (error) {
            console.error('Failed to fetch user information:', error.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(client.baseUrl + '/api/1/jwt', {
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
            setErrors({authentication: 'Invalid login or password'});
        }
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Login:</label>
                    <input
                        type="text"
                        name="login"
                        value={login}
                        onChange={handleChange}
                        className={styles.input}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={handleChange}
                        className={styles.input}
                    />
                </div>
                {errors.authentication && (
                    <div className={styles.error}>{errors.authentication}</div>
                )}

                <Button type="submit" className="btn btn-primary">Log in</Button>
            </form>
        </div>
    );
};

export default LoginForm;
