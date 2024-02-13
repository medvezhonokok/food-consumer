import React, { useState } from 'react';
import CustomNavbar from '../CustomNavbar/CustomNavbar';
import styles from './UserProfile.module.css';

const UserProfile = ({ user }) => {
    const [newLogin, setNewLogin] = useState(user ? user.login : '');
    const [newPhoneNumber, setNewPhoneNumber] = useState(user ? user.phoneNumber : '');
    const [loginError, setLoginError] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState('');

    if (!user) {
        return <div>Nothing there</div>;
    }

    const validateInputs = () => {
        let isValid = true;

        if (!newPhoneNumber.match(/^[+]?[0-9]+$/)) {
            setPhoneNumberError('Expected numbers or plus');
            isValid = false;
        } else {
            setPhoneNumberError('');
        }

        return isValid;
    };

    const handleSaveChanges = async () => {
        if (!validateInputs()) {
            return;
        }

        const userId = user.id;
        const response = await fetch(`http://localhost:8080/api/1/users/update/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                phoneNumber: newPhoneNumber,
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText);
        } else {
            const updatedUser = { ...user, phoneNumber: newPhoneNumber };
            localStorage.setItem('user', JSON.stringify(updatedUser));
            window.location.reload();
            alert("Номер телефона был успешно обновлен!")
        }
    };

    return (
        <div className={styles.textCenter}>
            <CustomNavbar user={user}/>
            <div className={styles.container}>
                <h2 className={styles.heading}>User Profile</h2>
                <div className={styles.inputContainer}>
                    <label className={styles.label}>Login:</label>
                    <textarea
                        value={newLogin}
                        readOnly // Add readOnly attribute
                        className={`${styles.textarea} ${loginError ? styles.textareaError : ''}`}
                    />
                    {loginError && <div className={styles.error}>{loginError}</div>}
                </div>
                <div className={styles.inputContainer}>
                    <label className={styles.label}>Phone Number:</label>
                    <input
                        type="text"
                        value={newPhoneNumber}
                        onChange={(e) => setNewPhoneNumber(e.target.value)}
                        className={`${styles.input} ${phoneNumberError ? styles.inputError : ''}`}
                    />
                    {phoneNumberError && <div className={styles.error}>{phoneNumberError}</div>}
                </div>
                <button onClick={handleSaveChanges} className={styles.button}>Save Changes</button>
            </div>
        </div>
    );
};

export default UserProfile;
