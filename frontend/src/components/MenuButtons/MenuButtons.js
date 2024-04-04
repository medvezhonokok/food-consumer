import React from 'react';
import {Button, Stack} from "react-bootstrap";
import styles from "../MenuButtons/MenuButtons.module.css";

const MenuButtons = () => {
    return (
        <div style={{marginTop: '6rem', marginBottom: '8rem'}}>
            <div className={`${styles.menuContainer}`}>
                <Stack direction="vertical">
                    <Button href={'orders'} className={`btn ${styles.btn}`}>
                        <img src="orders.png" alt="Avatar" className="w-90 h-100"/>
                    </Button>
                    <Button href={'schedule'} className={`btn ${styles.btn}`}>
                        <img src="schedule.png" alt="Avatar" className="w-90 h-100"/>
                    </Button>
                    <Button href={'tasks'} className={`btn ${styles.btn}`}>
                        <img src="tasks.png" alt="Avatar" className="w-90 h-100"/>
                    </Button>
                </Stack>
            </div>
            <div className={`${styles.menuContainer}`} style={{marginTop: '2rem'}}>
                <div style={{color: '#ffffff'}}>
                    <h2>TASKS</h2>
                </div>
                <div className={`${styles.taskContainer}`}>
                    <Stack direction="vertical">
                        <div className={`${styles.box}`}>
                            <h3>Task Title</h3>
                            <p>Description: Здесь будет напоминание о ближайшей задачке на сегодня.</p>
                        </div>
                    </Stack>
                </div>
            </div>
            <div className={`${styles.menuContainer}`} style={{marginTop: '2rem'}}>
                <div style={{color: '#ffffff'}}>
                    <h4>SCHEDULE</h4>
                </div>
                <div className={`${styles.taskContainer}`}>
                    <Stack direction="vertical">
                        <div className={`${styles.box}`}>
                            <h5>YOUR ROLE</h5>
                            <p>Description: Здесь будет напоминание о твоей ближайшей смене.</p>
                        </div>
                    </Stack>
                </div>
            </div>
        </div>
    );
};

MenuButtons.propTypes = {};

MenuButtons.defaultProps = {};

export default MenuButtons;
