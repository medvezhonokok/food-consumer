import React, {useEffect, useState} from 'react';
import styles from './Orders.module.css';
import Order from "../Order/Order";
import {useDispatch, useSelector} from "react-redux";
import {init, update} from "../../reducers/orders";
import {Plus, PlusCircle} from "react-bootstrap-icons";
import {Button} from "@mui/material";
import {v4} from "uuid";
import {Stack} from "react-bootstrap";
import MenuButton from "../MenuButton/MenuButton";


const Orders = () => {
    const orders = useSelector(state => state.orders.value)
    const dispatch = useDispatch()
    useEffect(() => {
        // client.get('/dishes').then(setStopListElements)
        dispatch(init())
        // dispatch(update({id: 0, text: "I'll have two number 9's, a number 9 large,\na number 6 with extra dip, a number 7, two number 45s, one with cheese, and a large soda"}))
    }, []);

    return (
        <>
            <div className={styles.Orders} data-testid="Orders">
                <Stack gap={3}>
                    {Object.values(orders).map(o => <Order key={o.id} orderId={o.id}/>)}
                </Stack>
            </div>
            <div className={styles.Create}>
                <Button className={styles.Btn} onClick={() => dispatch(update({id: v4(), text: ""}))}>Добавить</Button>
            </div>
            <div className={styles.Menu}>
                <MenuButton/>
            </div>
        </>
    );
}

export default Orders;
