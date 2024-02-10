import React, {useEffect, useState} from 'react';
import styles from './StopListElements.module.css';
import {Collapse, Container, Stack} from "react-bootstrap";
import StopListElement from "../StopListElement/StopListElement";
import client from "../../utils/client";
import {useSwipeable} from "react-swipeable";
import {GripHorizontal, PcHorizontal} from "react-bootstrap-icons";

const StopListElements = () => {
    const [stopListElements, setStopListElements] = useState([]);
    const [show, setShow] = useState(false);
    const handlers = useSwipeable({
        onSwipedUp: () => setShow(false),
        onSwipedDown: () => setShow(true),
    })
    useEffect(() => {
        // client.get('/dishes').then(setStopListElements)
        setStopListElements([{name: "test1"}, {name: "test2"}])
    }, []);

    return (<>
            <div className={`${styles.Modal} ${show ? styles.ShowModal : styles.HideModal}`}/>
            <Container
                className={`rounded-bottom-5 ps-5 pe-5 bg-light`  +
                    ` ${styles.Container}`}
                {...handlers}
            >
                <Collapse in={show}>
                    <Stack gap={3} className={`${styles.StopListElements} mt-5 mb-5`} data-testid="Tasks">
                        {/* todo: handle if its null or empty..*/}
                        {stopListElements.map((s, idx) => <StopListElement key={idx} stopListElement={s}/>)}
                    </Stack>
                </Collapse>
                <span className={styles.Bar}><GripHorizontal/></span>
            </Container>
        </>
    );
};


export default StopListElements;
