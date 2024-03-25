import React, { useState } from 'react';
import CustomNavbar from '../CustomNavbar/CustomNavbar';
import styles from './UserProfile.module.css';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import client from "../../utils/client";

const UserProfile = ({ user }) => {
    const [newPhoneNumber, setNewPhoneNumber] = useState(user ? user.phoneNumber : '');
    const [phoneNumberError, setPhoneNumberError] = useState('');

    const [newName, setNewName] = useState(user ? user.name : '');
    const [nameError, setNameError] = useState('');

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

        if (newName.trim() === '') {
            setNameError('Name is required');
            isValid = false;
        } else {
            setNameError('');
        }

        return isValid;
    };

    const handleSaveChanges = async () => {
        if (!validateInputs()) {
            return;
        }

        const userId = user.id;
        const response = await fetch(client.baseUrl + `/api/1/users/update/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                phoneNumber: newPhoneNumber,
                name: newName,
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText);
        } else {
            const updatedUser = { ...user, phoneNumber: newPhoneNumber, name: newName };
            localStorage.setItem('user', JSON.stringify(updatedUser));
            window.location.reload();
            alert("Данные обновлены!!!")
        }
    };

    return (
        <div className={styles.textCenter}>
            <CustomNavbar user={user}/>
            <div className={styles.container}>
                <h2 className={styles.heading}>User Profile</h2>
                <div className={styles.inputContainer}>
                    <label className={styles.label}>Login</label>
                    <input
                        type="text"
                        value={user.login}
                        readOnly={true}
                        className={`${styles.input}`}
                    />
                </div>
                <div className={styles.inputContainer}>
                    <label className={styles.label}>Name</label>
                    <input
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className={`${styles.input} ${nameError ? styles.inputError : ''}`}
                    />
                    {nameError && <div className={styles.error}>{nameError}</div>}
                </div>
                <div className={styles.inputContainer}>
                    <label className={styles.label}>Phone Number</label>
                    <PhoneInput
                        defaultCountry="Russia"
                        value={newPhoneNumber}
                        onChange={(value) => setNewPhoneNumber(value)}
                    />
                    {phoneNumberError && <div className={styles.error}>{phoneNumberError}</div>}
                </div>
                <button onClick={handleSaveChanges} className={styles.button}>Save Changes</button>
            </div>
        </div>
    );
};

export default UserProfile;
