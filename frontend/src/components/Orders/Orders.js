import React, { useEffect, useState } from 'react';
import styles from './Orders.module.css';
import Order from "../Order/Order";
import { useDispatch, useSelector } from "react-redux";
import { init, add, update } from "../../reducers/orders"; // Добавляем действие update
import { Button } from "@mui/material";
import { v4 } from "uuid";
import { Stack } from "react-bootstrap";
import { useSwipeable } from 'react-swipeable'; // Импортируем хук useSwipeable
import MenuButton from "../MenuButton/MenuButton";

const Orders = ({ user }) => {
    const orders = useSelector(state => state.orders.value)
    const dispatch = useDispatch()
    const [addingNewOrder, setAddingNewOrder] = useState(false);
    const [newOrderText, setNewOrderText] = useState('');
    const [editingOrder, setEditingOrder] = useState(null); // Состояние для хранения информации о редактируемом заказе

    useEffect(() => {
        dispatch(init())
    }, []);

    const handleAddNewOrder = () => {
        setAddingNewOrder(true);
    };

    const handleEditOrder = (orderId) => {
        setEditingOrder(orderId);
        setNewOrderText(orders[orderId].text); // Устанавливаем текст редактируемого заказа в текстовое поле
    };

    const handleBackToList = () => {
        if (editingOrder) {
            dispatch(update({ id: editingOrder, text: newOrderText }));
            setEditingOrder(null);
        } else if (addingNewOrder) {
            const newOrderId = v4();
            dispatch(add({ id: newOrderId, text: newOrderText }));
        }
        setNewOrderText("");
        setAddingNewOrder(false);
    };

    const handleSwipeRight = () => {
        handleBackToList();
    };

    const swipeHandlers = useSwipeable({
        onSwipedRight: handleSwipeRight
    });

    let content;
    if (addingNewOrder || editingOrder) {
        content = (
            <div className={styles.NewOrder} {...swipeHandlers}> {/* Применяем swipeHandlers к элементу .NewOrder */}
                <textarea
                    className={styles.TextArea}
                    value={newOrderText}
                    onChange={(e) => setNewOrderText(e.target.value)}
                />
                <div className={styles.Actions}>
                    <Button onClick={handleBackToList}>Save</Button> {/* Изменяем кнопку для сохранения */}
                </div>
            </div>
        );
    } else {
        let filteredOrders = !orders || orders.length === 0 ?
            <div className={`${styles.CenteredContent} `}>No tasks for today</div> : (
                <Stack gap={3}>
                    {Object.values(orders).reverse().map(o => (
                        <div key={o.id} onClick={() => handleEditOrder(o.id)}> {/* Добавляем обработчик клика для каждого заказа */}
                            <Order orderId={o.id} />
                        </div>
                    ))}
                </Stack>
            );

        content = (
            <>
                <div className={styles.Orders} data-testid="Orders">
                    {filteredOrders}
                </div>
                <div className={styles.Actions}>
                    <Button onClick={handleAddNewOrder}>Add</Button> {/* Изменяем обработчик клика для добавления заказа */}
                </div>
            </>
        );
    }

    return (
        <div className={styles.Container}>
            {content}
        </div>
    );
}

export default Orders;
