import React, {useEffect, useState} from 'react';
import styles from './Users.module.css';
import CustomNavbar from "../CustomNavbar/CustomNavbar";
import client from "../../utils/client";

const Users = ({user}) => {
    const [users, setUsers] = useState([])

    async function getUsers() {
        try {
            const usersResponse = await fetch(client.baseUrl + "/api/1/users/all", {
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
        getUsers().then(setUsers)
    })

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


export default Users;
