import React, {useEffect, useState} from 'react';
import styles from './Users.module.css';
import CustomNavbar from '../CustomNavbar/CustomNavbar';
import client from '../../utils/client';

const UserDetails = ({user}) => {
    const formatAbout = (aboutText) => {
        if (!aboutText) {
            return "";
        }

        return aboutText.split('\n').map((line, index) => (
            <span key={index}>
        {line}
                <br/>
      </span>
        ));
    };

    return (
        <>
            <div className={styles.userDetails}>
                <div className="rounded-circle overflow-hidden" style={{width: '60px', height: '60px'}}>
                    <img src={"avatars/" + user.login + ".JPG"} className="w-100 h-100"/>
                </div>
                <h3>{user.name}</h3>
            </div>
            <div className={styles.aboutUser}>
                <p>About: {formatAbout(user.about)}</p>
            </div>
        </>
    );
}

const Users = ({user}) => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showDetails, setShowDetails] = useState(false);

    async function getUsers() {
        try {
            const usersResponse = await fetch(client.baseUrl + '/api/1/users/all', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!usersResponse.ok) {
                const errorText = await usersResponse.text();
                alert(errorText);
                return [];
            }

            return await usersResponse.json();
        } catch (error) {
            console.error('Error fetching users:', error);
            return [];
        }
    }

    useEffect(() => {
        getUsers().then(setUsers);
    }, []);

    const openUserDetails = (user) => {
        setSelectedUser(user);
        setShowDetails(true);
        document.body.style.overflow = 'hidden';
    };

    const closeUserDetails = () => {
        setSelectedUser(null);
        setShowDetails(false);
        document.body.style.overflow = '';
    };

    return (
        <div className={styles.Users} data-testid="Users">
            {user ? <CustomNavbar user={user}/> : null}
            {showDetails && selectedUser && (
                <div className={styles.overlay} onClick={closeUserDetails}>
                    <div className={`${styles.modal}`} onClick={(e) => e.stopPropagation()}>
                        <UserDetails user={selectedUser} onClose={closeUserDetails}/>
                    </div>
                </div>
            )}

            <div className={styles.userList}>
                {users.map((user) => (
                    <button
                        key={user.id}
                        onClick={() => openUserDetails(user)}
                        className={styles.userCard}
                    >
                        <div>
                            <div className={styles.userName}>
                                <h3>{user.name}</h3>
                            </div>
                            <p>Phone Number: {user.phoneNumber}</p>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Users;
