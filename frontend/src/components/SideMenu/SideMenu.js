import React from 'react';
import {Button, Offcanvas, Stack} from "react-bootstrap";

const SideMenu = (props: { show: boolean, onClose: Function }) => {
    const buttons = [
        <Button href={'profile'}>Profile</Button>,
        <Button href={'tasks'}>Tasks</Button>,
        <Button href={'orders'}>Orders</Button>,
        <Button href={'schedule'}>Schedule</Button>,
        <Button href={'http://5.101.51.223:6060'}>Chat</Button>,
    ]

    return (
        <Offcanvas className={"w-75"} show={props.show} onHide={props.onClose} data-testid="SideMenu">
            <Offcanvas.Header>
                Меню
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Stack gap={3}>
                    {buttons.map(t => t)}
                </Stack>
            </Offcanvas.Body>
        </Offcanvas>
    );
}

export default SideMenu;
