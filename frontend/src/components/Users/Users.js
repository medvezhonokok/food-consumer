import React, {useEffect, useState} from 'react';
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import AbstractBox from "../AbstractBox/AbstractBox";
import {getUsers} from "../../data/storage";
import './Users.css';
import {Button} from "react-bootstrap";
import {IoArrowBackSharp} from "react-icons/io5";

const Users = ({user}) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers().then(usersJson => {
            setUsers(usersJson);
        });
    }, []);

    const mappedUsers = users.map(user =>
        <AbstractBox key={user.id} title={user.name} body={user.about} footer={"Позвони мне:" + user.phoneNumber}/>
    );

    return (
        user ?
            <div>
                <h3 className="pageHeader">Users</h3>
                <div className="containerHeader">
                    <Button className="commonStopListButton animatedButton backButton" href={'/'}>
                        <IoArrowBackSharp/>
                    </Button>
                </div>
                {mappedUsers}
            </div>
            : <NotFoundPage/>
    )
};


export default Users;
