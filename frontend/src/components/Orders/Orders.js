import React, { useEffect, useState } from 'react';
import styles from './Orders.module.css';
import Order from "../Order/Order";
import { useDispatch, useSelector } from "react-redux";
import { init, add, update, remove } from "../../reducers/orders"; // Добавляем действие update и remove
import { Button } from "@mui/material";
import { v4 } from "uuid";
import { Stack } from "react-bootstrap";
import { useSwipeable } from 'react-swipeable'; // Импортируем хук useSwipeable

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
        if (addingNewOrder && !newOrderText.trim()) {
            // Если создаваемая заметка пуста, просто заканчиваем процесс добавления
            setAddingNewOrder(false);
            setNewOrderText('');
            return;
        }

        if (editingOrder) {
            if (!newOrderText.trim()) {
                // Если текст пуст при редактировании, удаляем заметку
                dispatch(remove({ id: editingOrder }));
            } else {
                dispatch(update({ id: editingOrder, text: newOrderText }));
            }
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
            <div className={styles.NewOrder} {...swipeHandlers}>
                <textarea
                    className={styles.TextArea}
                    value={newOrderText}
                    onChange={(e) => setNewOrderText(e.target.value)}
                />
            </div>
        );
    } else {
        let filteredOrders = !orders || orders.length === 0 ?
            <div className={`${styles.CenteredContent} `}>No tasks for today</div> : (
                <Stack gap={3}>
                    {Object.values(orders).reverse().map(o => (
                        <div key={o.id} onClick={() => handleEditOrder(o.id)}>
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
                    <Button onClick={handleAddNewOrder}>Add</Button>
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
