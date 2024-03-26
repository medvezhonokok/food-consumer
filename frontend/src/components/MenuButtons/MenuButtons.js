import React from 'react';
import { Button, Stack } from "react-bootstrap";
import { Link } from 'react-router-dom';
import styles from './MenuButtons.module.css';

const MenuButtons = ({ handleLogout }) => {
    let style = {
        width: '13rem',
        height: '3.5rem',
        fontSize: '1.5rem',
        borderRadius: '0.8rem',
        animationDelay: '0.2s'
    };

    return (
        <div style={{ marginTop: '8rem', marginBottom: '3rem'}}>
            <Stack direction="vertical" gap={3} className={`d-flex flex-column align-items-center`}>
                <Link to="/tasks" className={`btn btn-primary btn-lg ${styles.animatedButton}`} style={style}>Tasks</Link>
                <Link to="/orders" className={`btn btn-primary btn-lg ${styles.animatedButton}`} style={style}>Orders</Link>
                <Link to="/schedule" className={`btn btn-primary btn-lg ${styles.animatedButton}`} style={style}>Schedule</Link>
                <Link to="/users" className={`btn btn-primary btn-lg ${styles.animatedButton}`} style={style}>All users</Link>
                <a href="http://5.101.51.223:6060" className={`btn btn-primary btn-lg ${styles.animatedButton}`} style={style}>Chat</a>
                <Link to="/profile" className={`btn btn-primary btn-lg ${styles.animatedButton}`} style={style}>Profile</Link>
                <Button onClick={handleLogout} className={`btn btn-primary btn-lg ${styles.animatedButton}`} style={style}>Log out</Button>
            </Stack>
        </div>
    );
};

export default MenuButtons;
