import React, {useEffect, useRef, useState} from 'react';
import styles from './OrderList.module.css';
import Order from "../Order/Order";
import {useDispatch, useSelector} from "react-redux";
import {add, init, remove, update} from "../../reducers/orders";
import {Button} from "@mui/material";
import {v4} from "uuid";
import {Stack} from "react-bootstrap";
import {useSwipeable} from 'react-swipeable';

const OrderList = ({}) => {
    const orders = useSelector(state => state.orders.value);
    const dispatch = useDispatch();
    const [addingNewOrder, setAddingNewOrder] = useState(false);
    const [newOrderText, setNewOrderText] = useState('');
    const [editingOrder, setEditingOrder] = useState(null);
    const textareaRef = useRef();
    const [buttonWidth, setButtonWidth] = useState('auto');

    const textareaRefs = useRef([]);

    const focusEndOfTextarea = () => {
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(textareaRef.current.value.length, textareaRef.current.value.length);
    };

    useEffect(() => {
        dispatch(init());
    }, [dispatch]);

    useEffect(() => {
        if (addingNewOrder || editingOrder) {
            focusEndOfTextarea();
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }, [addingNewOrder, editingOrder]);

    useEffect(() => {
        function handleResize() {
            setButtonWidth(window.innerWidth);
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleAddNewOrder = () => {
        setAddingNewOrder(true);
    };

    const handleEditOrder = (orderId) => {
        setEditingOrder(orderId);
        setNewOrderText(orders[orderId].text);
    };

    const handleBackToList = () => {
        if ((addingNewOrder || editingOrder) && !newOrderText.trim()) {
            setAddingNewOrder(false);
            setEditingOrder(null);
            setNewOrderText('');
            return;
        }

        if (editingOrder) {
            if (!newOrderText.trim()) {
                dispatch(remove({id: editingOrder}));
            } else {
                dispatch(update({id: editingOrder, text: newOrderText}));
            }
            setEditingOrder(null);
        } else if (addingNewOrder) {
            const newOrderId = v4();
            dispatch(add({id: newOrderId, text: newOrderText}));
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

    return (
        <div className={styles.Container}>
            {(addingNewOrder || editingOrder) ? (
                <div className={`${styles.ordersContainer}`}>
                    <div className={`${styles.NewOrder} ${addingNewOrder ? styles.Open : ''}`} {...swipeHandlers}>
                        <textarea
                            ref={textareaRef}
                            className={styles.TextArea}
                            value={newOrderText}
                            onChange={(e) => setNewOrderText(e.target.value)}
                        />
                    </div>
                </div>
            ) : (
                <>
                <div className={`${styles.ordersContainer}`}>
                    <div className="d-flex justify-content-center align-items-center" style={{color: '#ffffff'}}>
                        <h1>ORDERS</h1>
                    </div>
                        <div className={styles.Orders} data-testid="OrderList">
                            {!orders || orders.length === 0 ? (
                                <div className={`${styles.CenteredContent} `}>No tasks for today</div>
                            ) : (
                                <Stack gap={3}>
                                    {Object.values(orders).reverse().map((o, index) => (
                                        <div key={o.id} onClick={() => handleEditOrder(o.id)}>
                                            <Order orderId={o.id} textareaRef={ref => textareaRefs.current[index] = ref}/>
                                        </div>
                                    ))}
                                </Stack>
                            )}
                        </div>
                </div>
                    <div className={styles.Actions}>
                        <Button onClick={handleAddNewOrder} style={{width: '20rem'}}>Add</Button>
                    </div>
                </>
            )}
        </div>
    );
}

export default OrderList;
