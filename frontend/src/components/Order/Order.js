// Order.js

import React, { useState } from 'react';
import styles from './Order.module.css';
import { useDispatch, useSelector } from "react-redux";
import { remove, update } from "../../reducers/orders";
import { useSwipeable } from "react-swipeable";

const Order = ({ orderId }) => {
    const dispatch = useDispatch()
    const order = useSelector(state => state.orders.value[orderId]);
    const [text, setText] = useState(order.text);
    const [show, setShow] = useState(true);
    const [editedText, setEditedText] = useState(order.text); // Локальное состояние для отслеживания изменений текста

    const handleRemove = () => {
        setShow(false)
        setTimeout(() => dispatch(remove({ id: orderId })), 500)
    }

    const handlers = useSwipeable({
        onSwipedLeft: handleRemove,
        swipeDuration: 300
    })

    const handleTextChange = (e) => {
        setEditedText(e.target.value); // Обновляем локальное состояние при изменении текста в поле ввода
    };

    const handleSave = () => {
        dispatch(update({ id: orderId, text: editedText })); // Отправляем обновленный текст в Redux при сохранении изменений
        setText(editedText); // Обновляем текст в компоненте сразу после сохранения
    }

    return (
        <div className={`${styles.Order} ${show ? "" : styles.Removed}`} data-testid="Order" {...handlers}>
            <textarea
                className={styles.TextArea}
                value={editedText}
                onChange={handleTextChange}
                placeholder="Enter your note here..."
            />
            {/*<button className={styles.SaveButton} onClick={handleSave}>Save</button>*/}
        </div>
    );
}

export default Order;
