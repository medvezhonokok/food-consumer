import React, {useState} from 'react';
import CustomNavbar from '../CustomNavbar/CustomNavbar';
import styles from './UserProfile.module.css';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import client from "../../utils/client";

const UserProfile = ({user}) => {
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
        const response = await fetch(client.baseUrl + `/api/1/users/update/${userId}`, {
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
            const updatedUser = {...user, phoneNumber: newPhoneNumber};
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

