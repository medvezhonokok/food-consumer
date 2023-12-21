import React, {useState} from 'react';
import styles from './CustomNavbar.module.css';
import {Button, Col, Container, Form, FormLabel, Navbar, Stack} from "react-bootstrap";
import {List} from "react-bootstrap-icons"
import SideMenu from "../SideMenu/SideMenu";
import MenuButton from "../MenuButton/MenuButton";

const CustomNavbar = () => {
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
                    <Form inline>
                        <FormLabel className={"text-secondary me-3 align-text-top h-auto"}>username</FormLabel>
                        <Button variant={"outline-primary"} className={"h-auto"}>Выйти</Button>
                    </Form>
                </Col>
            </Container>

        </Navbar>
    );
}
export default CustomNavbar;
