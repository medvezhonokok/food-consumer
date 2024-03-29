import React from 'react';
import {Button, Stack} from "react-bootstrap";

const MenuButtons = () => {
    return (<div style={{marginTop: '5rem'}}>
        <Stack direction="vertical" gap={3} className="d-flex flex-column align-items-center">
            <Button href={'tasks'} className="btn btn-primary" style={{width: '10rem'}}>Tasks</Button>
            <Button href={'orders'} className="btn btn-primary" style={{width: '10rem'}}>Orders</Button>
            <Button href={'schedule'} className="btn btn-primary" style={{width: '10rem'}}>Schedule</Button>
            <Button href={'users'} className="btn btn-primary" style={{width: '10rem'}}>All users</Button>
            <Button href={'chat'} className="btn btn-primary" style={{width: '10rem'}}>Chat</Button>
            <Button href={'profile'} className="btn btn-primary" style={{width: '10rem'}}>Profile</Button>
            <Button href={'test'} className="btn btn-primary" style={{width: '10rem'}}>Test</Button>
        </Stack>
    </div>)
};

MenuButtons.propTypes = {};

MenuButtons.defaultProps = {};

export default MenuButtons;
