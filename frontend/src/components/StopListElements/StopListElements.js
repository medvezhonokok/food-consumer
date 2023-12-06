import React, {useEffect, useState} from 'react';
import styles from './StopListElements.module.css';
import {Stack} from "react-bootstrap";
import StopListElement from "../StopListElement/StopListElement";
import {post} from "axios";

const StopListElements = () => {
    const [stopListElements, setStopListElements] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/dishes')
            .then((res) => res.json())
            .then((data) => {
                setStopListElements(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    return (
        <Stack gap={3} className={`${styles.StopListElements} mt-3`} data-testid="Tasks">
            {/* todo: handle if its null or empty..*/}
            {stopListElements.map(s => <StopListElement stopListElement={s}/>)}
        </Stack>
    );
};


export default StopListElements;
