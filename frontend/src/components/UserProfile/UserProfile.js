import React, {useState} from 'react';
import CustomNavbar from '../CustomNavbar/CustomNavbar';
import styles from './UserProfile.module.css';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import {Button} from "react-bootstrap";
import client from "../../utils/client";

const UserProfile = ({user}) => {
    const [newPhoneNumber, setNewPhoneNumber] = useState(user ? user.phoneNumber : '');
    const [phoneNumberError, setPhoneNumberError] = useState('');

    const [newName, setNewName] = useState(user ? user.name : '');
    const [nameError, setNameError] = useState('');

    const [newAbout, setNewAbout] = useState(user ? user.about : '');
    const [aboutError, setAboutError] = useState('');

    const pathToUserAvatar = `/avatars/` + user.login + ".JPG";

    const handleFocus = (e) => {
        e.target.setSelectionRange(0, 0);
    };

    if (!user) {
        return <div>Nothing there</div>;
    }

    const handleLogout = () => {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('user');
        window.location.pathname = '/';
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
                about: newAbout,
                phoneNumber: newPhoneNumber,
                name: newName,
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText);
        } else {
            const updatedUser = {...user, phoneNumber: newPhoneNumber, name: newName, about: newAbout};
            localStorage.setItem('user', JSON.stringify(updatedUser));
            window.location.reload();
            alert("Данные обновлены!!!")
        }
    };

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

        if (newAbout && newAbout.length > 250) {
            setAboutError("Too long text, need less than 250 characters");
            isValid = false;
        }

        return isValid;
    };

    return (
        <div className={styles.textCenter}>
            <CustomNavbar user={user}/>
            <div className={styles.imageContainer}>
                <img src={pathToUserAvatar} alt="Profile" className={styles.profileImage}/>
            </div>
            <div className={styles.infoContainer}>
                <label className={styles.label}>UserLogin</label>
                <div>
                    <h3>{user.login}</h3>
                </div>
                <div className={styles.nameContainer}>
                    <label className={styles.label}>Name</label>
                    <input
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className={`${styles.input} ${nameError ? styles.inputError : ''}`}
                        onFocus={handleFocus}
                    />
                    {nameError && <div className={styles.error}>{nameError}</div>}
                </div>
                <div className={styles.phoneContainer}>
                    <label className={styles.label}>Phone Number</label>
                    <PhoneInput
                        defaultCountry="Russia"
                        value={newPhoneNumber}
                        onChange={(value) => setNewPhoneNumber(value)}
                        inputStyle={{width: "100%"}}
                        className={`${styles.PhoneInput}`}
                        onFocus={handleFocus}
                    />
                    {phoneNumberError && <div className={styles.error}>{phoneNumberError}</div>}
                </div>
            </div>
            <div className={styles.aboutContainer}>
                <label className={styles.label}>About</label>
                <textarea
                    value={newAbout}
                    onChange={(e) => setNewAbout(e.target.value)}
                    className={`${styles.textarea} `}
                    onFocus={handleFocus}
                />
                {aboutError && <div className={styles.error}>{aboutError}</div>}
            </div>
            <button onClick={handleSaveChanges} className={`${styles.button} ${styles.saveChangesButton}`}>Save
                Changes
            </button>
            <Button onClick={handleLogout} className={`${styles.button} ${styles.logoutButton}`}>Log out</Button>
        </div>
    );
};

export default UserProfile;
