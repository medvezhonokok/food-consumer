import React, {useEffect, useState} from 'react';
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import AbstractBox from "../AbstractBox/AbstractBox";
import BottomNavBar from "../BottomNavBar/BottomNavBar";
import {getUsers} from "../../data/storage";
import './Users.css';

const Users = ({user}) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers().then(usersJson => {
            setUsers(usersJson);
        });
    }, []);

    const mappedUsers = users.map(user =>
        <AbstractBox key={user.id} title={user.name} body={user.about} footer={user.phoneNumber}/>
    );

    return (
        user ?
            <div>
                <h3 className="pageHeader">Users</h3>
                <div className="usersBox">
                    {mappedUsers}
                </div>
                <BottomNavBar user={user}/>
            </div>
            : <NotFoundPage/>
    )
};


export default Users;
