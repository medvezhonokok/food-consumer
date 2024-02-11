import React from 'react';
import styles from './CustomNavbar.module.css';
import {Col, Container, Navbar} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {House} from 'react-bootstrap-icons'; // Import the home icon

const CustomNavbar = ({user}) => {
    return (
        <Navbar className={`${styles.CustomNavbar} `} sticky={'top'} data-testid="CustomNavbar">
            <Container fluid>
                <Col className="d-flex justify-content-center align-items-center">
                    <Link to="/">
                        <House size={30} className="me-2" style={{color: '#bcba91'}}/>
                    </Link>
                    {user ? (
                        <div className="d-flex flex-column align-items-center">
                            <div id="avatar" className="rounded-circle overflow-hidden"
                                 style={{width: '60px', height: '60px', margin: '0.5rem 1.5rem'}}>
                                <img src="311d8218638a96b7c47a6d006346a839.jpeg" alt="Avatar" className="w-100 h-100"/>
                            </div>
                        </div>
                    ) : null}
                </Col>
            </Container>
        </Navbar>
    );
};

export default CustomNavbar;
