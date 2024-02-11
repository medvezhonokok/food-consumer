import React, {useState} from 'react';

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
            const userResponse = await fetch(`http://localhost:8080/api/1/users/auth?jwt=${jwtToken}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            });

            if (!userResponse.ok) {
                alert("Пиздец, ошибка!")
                return
            }

            const user = await userResponse.json();
            localStorage.setItem('user', JSON.stringify(user));
            window.location.reload();
        } catch (error) {
            console.error('Failed to fetch user information:', error.message);
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/api/1/jwt', {
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
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Login:</label>
                    <input
                        type="text"
                        name="login"
                        value={login}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={handleChange}
                    />
                </div>
                {errors.authentication && (
                    <div style={{color: 'red'}}>{errors.authentication}</div>
                )}
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginForm;
