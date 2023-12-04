import React from 'react';
import styles from './SideMenu.module.css';
import {Button, Offcanvas, Stack} from "react-bootstrap";

const SideMenu = (props: { show: boolean, onClose: Function }) => {
    const buttons = ['Задачи', 'Расписание', 'Кнопка 1', 'Кнопка 2', 'Кнопка 3']
    return (
        <Offcanvas className={styles.SideMenu} show={props.show} onHide={props.onClose} data-testid="SideMenu">
            <Offcanvas.Header>
                Меню
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Stack gap={3}>
                    {buttons.map(t => <Button variant={'outline-primary'} className={"w-75 m-auto"}>{t}</Button>)}
                </Stack>
            </Offcanvas.Body>
        </Offcanvas>
    );
}

export default SideMenu;
