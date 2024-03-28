import React, { useState, useEffect, useRef } from 'react';
import styles from './Order.module.css';
import { useDispatch, useSelector } from "react-redux";
import { remove, update } from "../../reducers/orders";
import { useSwipeable } from "react-swipeable";

const Order = ({ orderId }) => {
    const dispatch = useDispatch();
    const order = useSelector(state => state.orders.value[orderId]);
    const [text, setText] = useState(order.text);
    const [show, setShow] = useState(true);
    const [editedText, setEditedText] = useState(order.text);
    const [isEditing, setIsEditing] = useState(false);

    const textareaRef = useRef(null); // Создаем ref для textarea

    const handleRemove = () => {
        setShow(false);
        setTimeout(() => dispatch(remove({ id: orderId })), 500);
    };

    const handlers = useSwipeable({
        onSwipedLeft: handleRemove,
        swipeDuration: 300
    });

    const handleTextChange = (e) => {
        setEditedText(e.target.value);
    };

    const handleSave = () => {
        dispatch(update({ id: orderId, text: editedText }));
        setText(editedText);
        setIsEditing(false);
    };

    useEffect(() => {
        if (isEditing) {
            textareaRef.current.focus();
        }
    }, [isEditing]);

    const toggleEdit = () => {
        setIsEditing(!isEditing);
        setEditedText(text);
    };

    const truncatedText = text.length > 15 ? text.substring(0, 15) + " ..." : text;

    return (
        <div className={`${styles.Order} ${show ? "" : styles.Removed}`} data-testid="Order" {...handlers}>
            {isEditing ? (
                <textarea
                    ref={textareaRef}
                    className={styles.TextArea}
                    value={editedText}
                    onChange={handleTextChange}
                    onBlur={handleSave}
                    placeholder="Enter your note here..."
                />
            ) : (
                <div className={styles.DisplayArea} onClick={toggleEdit}>
                    {truncatedText}
                </div>
            )}
        </div>
    );
};

export default Order;
