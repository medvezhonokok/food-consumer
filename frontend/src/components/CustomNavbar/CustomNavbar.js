import React from 'react';
import { Col, Container, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './CustomNavbar.module.css';

const CustomNavbar = ({ user }) => {
    return (
        <Navbar className={`${styles.CustomNavbar}`} sticky={'top'} data-testid="CustomNavbar">
            <Container fluid>
                <Col className="d-flex justify-content-between align-items-center">
                    {user && (
                        <div className={`${styles.userNameBox}`}>
                            <h3 className={`${styles.userName}`}>{user.name}</h3>
                        </div>
                    )}
                    <div className={`${styles.homeNavbar}`}  style={{ width: '45px', height: '45px'}}>
                        <Link className="rounded-circle overflow-hidden"  to="/">
                            <img src="1488228.png" alt="Avatar" className="w-100 h-100" />
                        </Link>
                    </div>
                </Col>
            </Container>
        </Navbar>
    );
};

export default CustomNavbar;
