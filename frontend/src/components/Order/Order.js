import React, {useState} from 'react';
import styles from './Order.module.css';
import Textarea from '@mui/joy/Textarea';
import useDeferredEffect from "../../utils/hooks";
import {useDispatch, useSelector} from "react-redux";
import {remove, update} from "../../reducers/orders";
import {useSwipeable} from "react-swipeable";

const Order = (props: { orderId: number }) => {
    const orders = useSelector(state => state.orders.value)
    const dispatch = useDispatch()
    const [text, setText] = useState(orders[props.orderId].text);
    const [show, setShow] = useState(true);

    function del() {
        setShow(false)
        setTimeout(() => dispatch(remove({id: props.orderId})), 500)
    }

    const handlers = useSwipeable({
        onSwipedLeft: del,
        swipeDuration: 300
    })

    useDeferredEffect(200, () => {
        dispatch(update({id: props.orderId, text: text}))
        console.log("updated")
    }, [text])

    return (
        <div className={`${styles.Order} ${show ? "" : styles.Removed}`} data-testid="Order" {...handlers}>
            <Textarea className={"w-75 m-auto bg-light"} value={text} onChange={e => setText(e.target.value)}
                      variant={"plain"}/>
        </div>
    );
}

export default Order;
