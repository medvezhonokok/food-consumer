import React from 'react';
import {Button, Col, Container, Navbar} from 'react-bootstrap';
import styles from './BottomNavbar.module.css';

const BottomNavbar = ({user}) => {
    return (
        <Container>
            <Col>
                {user && (
                    <div className={`${styles.BottomNavbar}`}>
                        <div className={`${styles.buttons}`}>
                            <Button href={'news'} className={`btn ${styles.navButton}`}>
                                <img src="news.png" alt="Avatar" className="w-100 h-100"/>
                            </Button>
                            <Button href={'users'} className={`btn ${styles.navButton}`}>
                                <img src="allusers.png" alt="Avatar" className="w-100 h-100"/>
                            </Button>
                            <Button href={'chat'} className={`btn ${styles.navButton}`}>
                                <img src="chat.png" alt="Avatar" className="w-100 h-100"/>
                            </Button>
                            <Button href={'profile'} className={`btn ${styles.navButton}`}>
                                <img src="profile.png" alt="Avatar" className="w-100 h-100"/>
                            </Button>
                        </div>
                    </div>
                )}
            </Col>
        </Container>
    );
};

export default BottomNavbar;
