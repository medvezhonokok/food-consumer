import React from 'react';
import styles from './CustomNavbar.module.css';
import {Button, Col, Container, Navbar, Stack} from "react-bootstrap";
import MenuButton from "../MenuButton/MenuButton";

const CustomNavbar = ({user, handleLogout}) => {
    return (
        <Navbar className={`${styles.CustomNavbar} `} sticky={"top"} data-testid="CustomNavbar">
            <Container fluid>
                <Col xs={7}>
                    <Stack direction={"horizontal"} gap={3}>
                        <MenuButton/>
                        <Button variant={"outline-secondary"} href={"orders"}>Заказ</Button>
                    </Stack>
                </Col>
                <Col>
                    {user ? (
                        <>
                            <p>Welcome, {user.login}!</p>
                            <Button variant={"outline-primary"} onClick={handleLogout}>Logout</Button>
                        </>
                    ) : null}
                </Col>
            </Container>
        </Navbar>
    );
}

export default CustomNavbar;
