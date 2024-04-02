import React from 'react';
import {Button, Stack} from "react-bootstrap";
import styles from "../MenuButtons/MenuButtons.module.css";

const MenuButtons = () => {
    return (
        <div style={{marginTop: '5rem'}}>
            <div className={`${styles.menuContainer}`}>
                <Stack direction="vertical" gap={3} className="d-flex flex-column align-items-center">
                    <Button href={'tasks'} className={`${styles.btn}`}>Tasks</Button>
                    <Button href={'orders'} className={`${styles.btn}`}>Orders</Button>
                    <Button href={'schedule'} className={`${styles.btn}`}>Schedule</Button>
                </Stack>
            </div>
        </div>
    );
};

MenuButtons.propTypes = {};

MenuButtons.defaultProps = {};

export default MenuButtons;
