import React from 'react';
import {Button, Stack} from "react-bootstrap";
import styles from "../MenuButtons/MenuButtons.module.css";

const MenuButtons = () => {
    return (
        <div style={{marginTop: '6rem'}}>
            <div className={`${styles.menuContainer}`}>
                <Stack direction="vertical">
                    <Button href={'orders'} className={`btn ${styles.btn}`}>
                        <img src="orders.png" alt="Avatar" className="w-50 h-100"/>
                    </Button>
                    <Button href={'schedule'} className={`btn ${styles.btn}`}>
                        <img src="schedule.png" alt="Avatar" className="w-90 h-100"/>
                    </Button>
                    <Button href={'tasks'} className={`btn ${styles.btn}`}>
                        <img src="tasks.png" alt="Avatar" className="w-90 h-100"/>
                    </Button>
                </Stack>
            </div>
            <div style={{marginTop: '4rem'}}>
                <h2>TASK</h2>
                <div className={`${styles.taskContainer}`}>
                    <Stack direction="vertical">
                        <Button href={'orders'} className={`btn ${styles.btn}`}>
                            <img src="orders.png" alt="Avatar" className="w-90 h-100"/>
                        </Button>
                    </Stack>
                </div>
            </div>
            <div style={{marginTop: '4rem'}}>
                <h2>SCHEDULE</h2>
                <div className={`${styles.taskContainer}`}>
                    <Stack direction="vertical">
                        <Button href={'orders'} className={`btn ${styles.btn}`}>
                            <img src="orders.png" alt="Avatar" className="w-90 h-100"/>
                        </Button>
                    </Stack>
                </div>
            </div>
        </div>
    );
};

MenuButtons.propTypes = {};

MenuButtons.defaultProps = {};

export default MenuButtons;
