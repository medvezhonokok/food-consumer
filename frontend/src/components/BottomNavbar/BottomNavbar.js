import React from 'react';
import { Button, Col, Container, Navbar } from 'react-bootstrap';
import styles from './BottomNavbar.module.css';

const BottomNavbar = ({ user }) => {
    return (
        <Navbar className={`${styles.BottomNavbar}`} sticky={'bottom'} data-testid="BottomNavbar">
            <Container fluid>
                <Col className="d-flex justify-content-center align-items-center">
                    {user && (
                        <div className="d-flex">
                            <Button href={'profile'} className={`btn ${styles.navButton}`}>P</Button>
                            <Button href={'chat'} className={`btn ${styles.navButton}`}>C</Button>
                            <Button href={'users'} className={`btn ${styles.navButton}`}>A</Button>
                            <Button href={'news'} className={`btn ${styles.navButton}`}>N</Button>
                        </div>
                    )}
                </Col>
            </Container>
        </Navbar>
    );
};

export default BottomNavbar;
