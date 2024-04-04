import React from 'react';
import styles from './Orders.module.css';
import StopListElements from "../StopListElements/StopListElements";
import OrderList from "../OrderList/OrderList";
import CustomNavbar from "../CustomNavbar/CustomNavbar";
import Drawer from 'react-modern-drawer'

import {BsChevronDown} from "react-icons/bs";
import {Button} from "react-bootstrap";

import 'react-modern-drawer/dist/index.css'

const Orders = () => {
    const getUserFromLocalStorage = () => {
        const userString = localStorage.getItem('user');
        return userString ? JSON.parse(userString) : null;
    };

    const [isOpen, setIsOpen] = React.useState(false)
    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
    }
    const user = getUserFromLocalStorage();

    return (
        (user
                ? <div className={styles.OrdersContainer}>
                    <div className={styles.Notes} data-testid="Orders">
                        <CustomNavbar user={user}/>
                        <div className={styles.ButtonContainer}>
                            <Button className={styles.ShowButton} onClick={toggleDrawer}>
                                <BsChevronDown/>
                            </Button>
                        </div>
                        <Drawer className={styles.Drawer}
                                open={isOpen}
                                onClose={toggleDrawer}
                                direction='top'
                                size={400}>
                            <StopListElements/>
                        </Drawer>
                        <OrderList/>
                    </div>
                </div>
                : <>nothing there</>
        )
    );
}
export default Orders;
