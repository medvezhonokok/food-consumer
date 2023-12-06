import React, {useState} from 'react';
import styles from './CustomNavbar.module.css';
import {Button, Col, Container, Form, FormLabel, Navbar, Stack} from "react-bootstrap";
import {Icon, IconButton} from "@mui/material";
import {List} from "react-bootstrap-icons"
import SideMenu from "../SideMenu/SideMenu";

const CustomNavbar = () => {
    const [showMenu, setShowMenu] = useState(false);
    return (
        <Navbar className={`${styles.CustomNavbar} `} sticky={"top"} data-testid="CustomNavbar">
            <Container fluid>
                <Col xs={7}>
                    <Stack direction={"horizontal"} gap={3}>
                        <Button variant={"outline-primary"} onClick={() => setShowMenu(!showMenu)}><List/></Button>
                        <Button variant={"outline-secondary"} href={"orders"}>Заказ</Button>
                    </Stack>
                </Col>
                <Col>
                    <Form inline>
                        <FormLabel className={"text-secondary me-3 align-text-top h-auto"}>username</FormLabel>
                        <Button variant={"outline-primary"} className={"h-auto"}>Выйти</Button>
                    </Form>
                </Col>
            </Container>
            <SideMenu show={showMenu} onClose={() => setShowMenu(false)}/>
        </Navbar>
    );
}
export default CustomNavbar;
