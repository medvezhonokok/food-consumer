import React, {useState} from 'react';
import './UserProfile.css';
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import {IoLogOutOutline} from "react-icons/io5";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css';
import BottomNavBar from "../BottomNavBar/BottomNavBar";
import {Button} from "react-bootstrap";
import {updateUserSettings} from "../../data/updater";

const UserProfile = ({user}) => {
    const [newPhoneNumber, setNewPhoneNumber] = useState(user ? user.phoneNumber : '');
    const [phoneNumberError, setPhoneNumberError] = useState('');

    const [newName, setNewName] = useState(user ? user.name : '');
    const [nameError, setNameError] = useState('');

    const [newAbout, setNewAbout] = useState(user ? user.about : '');
    const [aboutError, setAboutError] = useState('');

    const logout = () => {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('user');
        window.location.pathname = '/';
    };
    const saveChanges = () => {
        if (validateInputs()) {
            updateUserSettings({
                name: newName === user.name ? null : newName,
                phoneNumber: newPhoneNumber === user.phoneNumber ? null : newPhoneNumber,
                about: newAbout === user.about ? null : newAbout
            }, user.id).then(
                () => {
                    const updatedUser = {...user, phoneNumber: newPhoneNumber, name: newName, about: newAbout};
                    localStorage.setItem('user', JSON.stringify(updatedUser));
                    alert("Данные обновлены!!!")
                }
            );
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

    return (user
            ? <div className="centeredContent">
                <h3 className="pageHeader">Profile</h3>
                <div className="profileContainer">
                    <div className="profileInfoBox">
                        <label>Name</label>
                        <input
                            type="text"
                            className="profileInput"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                        />
                        {nameError && <div className="error">{nameError}</div>}
                    </div>
                    <div className="profileInfoBox">
                        <label>Phone number</label>
                        <PhoneInput
                            inputStyle={{fontSize: "1rem", width: "95%"}}
                            defaultCountry="Russia"
                            placeholder="Your mobile phone number goes here"
                            value={newPhoneNumber}
                            onChange={(value) => setNewPhoneNumber(value)}
                        />
                        {phoneNumberError && <div className="error">{phoneNumberError}</div>}
                    </div>
                    <div className="profileInfoBox">
                        <label>About</label>
                        <textarea
                            className="profileInput"
                            value={newAbout}
                            placeholder="Write something about yourself"
                            onChange={(e) => setNewAbout(e.target.value)}
                        />
                        {aboutError && <div className="error">{aboutError}</div>}
                    </div>
                    <div className="buttons">
                        <Button className="animatedButton buttonCommon saveChangesButton" onClick={saveChanges}>
                            Save changes
                        </Button>
                        <Button className="animatedButton buttonCommon logoutButton" onClick={logout}><IoLogOutOutline/></Button>
                    </div>
                </div>
                <BottomNavBar user={user}/>
            </div>
            : <NotFoundPage/>
    );
};

export default UserProfile;
