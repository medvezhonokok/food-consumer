import React, {useEffect, useRef, useState} from 'react';
import {Button} from 'react-bootstrap';
import {IoAddOutline, IoArrowBackSharp, IoCloseSharp} from 'react-icons/io5';
import {useDispatch, useSelector} from 'react-redux';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import Modal from './../Modal/Modal';
import AbstractBox from '../AbstractBox/AbstractBox';
import {add, remove, update} from '../../reducers/orders';
import './Orders.css';

const Orders = ({user}) => {
    const orders = useSelector(state => state.orders.value);
    const [newOrder, setNewOrder] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const dispatch = useDispatch();
    const textareaRef = useRef(null);

    useEffect(() => {
        if (selectedOrder) {
            setNewOrder(selectedOrder.text);
        } else {
            setNewOrder('');
        }
    }, [selectedOrder]);

    useEffect(() => {
        if (showModal && textareaRef.current) {
            textareaRef.current.focus();
            textareaRef.current.selectionStart = textareaRef.current.selectionEnd = textareaRef.current.value.length;
        }
    }, [showModal]);

    const addOrEditOrder = (e) => {
        e.preventDefault();
        if (selectedOrder) {
            dispatch(update({...selectedOrder, text: newOrder}));
        } else {
            dispatch(add({id: Date.now(), text: newOrder}));
        }
        setSelectedOrder(null);
        setShowModal(false);
    };

    const handleOrderClick = (order) => {
        setSelectedOrder(order);
        setShowModal(true);
    };

    return (
        user ? (
            <div>
                <h3 className="pageHeader">Orders</h3>
                <div className="containerHeader">
                    <Button className="commonStopListButton animatedButton backButton" href={'/'}>
                        <IoArrowBackSharp/>
                    </Button>
                    <Button className="commonStopListButton animatedButton addButton"
                            onClick={() => {
                                setShowModal(true)
                                setNewOrder('')
                                setSelectedOrder(null);
                            }}>
                        <IoAddOutline/>
                    </Button>
                </div>
                <div className="orderList">
                    {Object.values(orders).map((order, index) => (
                        <AbstractBox key={index} title={
                            <div>
                                Order №{index + 1}
                                <Button
                                    className="animatedButton removeOrderButton"
                                    onClick={() => {
                                        dispatch(remove({id: order.id}))
                                        setNewOrder('');
                                    }}><IoCloseSharp/></Button>
                            </div>
                        } body={
                            <div key={index} onClick={() => handleOrderClick(order)}>
                                {order.text}
                            </div>
                        }/>
                    ))}
                </div>
                <Modal
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}>
                    <form onSubmit={addOrEditOrder}>
                        <textarea
                            ref={textareaRef}
                            required={true}
                            autoFocus={true}
                            value={newOrder}
                            onChange={(event) => setNewOrder(event.target.value)}
                        />
                        <Button className="animatedButton addStopListElementButton" type="submit">
                            {selectedOrder ? 'Save' : 'Add'}
                        </Button>
                    </form>
                </Modal>
            </div>
        ) : <NotFoundPage/>
    );
};

export default Orders;
