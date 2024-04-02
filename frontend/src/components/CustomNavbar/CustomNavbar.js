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
                        <div className="rounded-circle overflow-hidden" style={{width: '60px', height: '60px'}}>
                            <img src="1488228.png" alt="Avatar" className="w-100 h-100"/>
                        </div>
                    )}
                    <Link className="rounded-circle overflow-hidden" style={{width: '60px', height: '60px'}} to="/">
                        <img src="311d8218638a96b7c47a6d006346a839.jpeg" alt="Avatar" className="w-100 h-100"/>
                    </Link>
                </Col>
            </Container>
        </Navbar>
    );
};

export default CustomNavbar;
