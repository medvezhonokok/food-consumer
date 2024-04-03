import React from 'react';
import {Col, Container, Navbar} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import styles from './CustomNavbar.module.css';

const CustomNavbar = ({user}) => {
    return (
        <Navbar className={`${styles.CustomNavbar}`} sticky={'bottom'} data-testid="CustomNavbar">
            <Container fluid>
                <Col className="d-flex justify-content-between">
                    {user && (
                        <div className={`${styles.userName}`}>
                            <h3>{user.name}</h3>
                        </div>
                    )}
                    <Link className="rounded-circle overflow-hidden" style={{width: '50px', height: '50px'}} to="/">
                        <img src="1488228.png" alt="Avatar" className="w-100 h-100"/>
                    </Link>
                </Col>
            </Container>

        </Navbar>

    );
};

export default CustomNavbar;
