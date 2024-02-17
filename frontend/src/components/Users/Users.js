// Users.jsx
import React from 'react';
import PropTypes from 'prop-types';
import styles from './Users.module.css';
import CustomNavbar from "../CustomNavbar/CustomNavbar";

const Users = ({user, users}) => {
    return (
        <div className={styles.Users} data-testid="Users">
            {user ? <CustomNavbar user={user}/> : null}
            <div className={styles.userList}>
                {user ? users.map((user) => (
                    <div key={user.id} className={styles.userCard}>
                        <div className={styles.userInfo}>
                            <h3>{user.login}</h3>
                            <p>Phone Number: {user.phoneNumber}</p>
                        </div>
                    </div>
                )) : null}
            </div>
        </div>
    );
};

Users.propTypes = {
    users: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            phoneNumber: PropTypes.string.isRequired,
            login: PropTypes.string.isRequired,
            creationTime: PropTypes.string.isRequired,
            // Add more prop types for additional user details
        })
    ).isRequired,
};

export default Users;
