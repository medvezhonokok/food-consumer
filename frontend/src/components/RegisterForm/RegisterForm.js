import React, {useState} from 'react';
import styles from './RegisterForm.module.css';

const RegistrationForm = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const {name, value} = e.target;
        if (name === 'login') {
            setLogin(value);
        } else if (name === 'phoneNumber') {
            setPhoneNumber(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    };

    const handleRegistrationSuccess = async (user) => {
        localStorage.setItem('user', JSON.stringify(user));

        try {
            const jwtResponse = await fetch(`http://localhost:8080/api/1/jwt`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    login: user.login,
                    password: user.password,
                }),
            });

            if (!jwtResponse.ok) {
                const errorText = await jwtResponse.text();
                alert(errorText);
                return;
            }

            const jwt = await jwtResponse.text();
            localStorage.setItem('jwtToken', jwt);

            window.location.reload();
        } catch (error) {
            console.error('Failed to fetch user information:', error.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (!/^[a-zA-Z]{2,24}$/.test(login)) {
            setErrors({registration: 'Use Latin letters (2-24 characters) in login'});
            return;
        }

        if (!/^[+]?[0-9]+$/.test(phoneNumber) || phoneNumber.length < 3 || phoneNumber.length > 12) {
            setErrors({registration: 'Bad phone number declaration. Use \"+\" or digits'});
            return;
        }

        if (password.length < 1 || password.length > 60) {
            setErrors({registration: 'Password must be between 1 and 60 characters.'});
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/1/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    login,
                    phoneNumber,
                    password,
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText);
            }

            const user = await response.json();

            const userIdResponse = await fetch(`http://localhost:8080/api/1/users/getId`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    login: login
                }),
            });

            user.id = await userIdResponse.json();

            await handleRegistrationSuccess(user);
        } catch (error) {
            if (error.message.includes('Duplicate entry')) {
                setErrors({
                    registration: 'This login or phone number is already registered',
                });
            } else {
                console.error('Registration failed:', error.message);
                setErrors({registration: 'Registration failed'});
            }
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
                    <label className={styles.label}>Phone Number:</label>
                    <input
                        type="text"
                        name="phoneNumber"
                        value={phoneNumber}
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
                {errors.registration && (
                    <div className={styles.error}>{errors.registration}</div>
                )}
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        </div>
    );
};

export default RegistrationForm;
