import React from 'react';
import styles from './StopListElement.module.css';
import {Dot} from "react-bootstrap-icons";

const StopListElement = (props: { stopListElement: { name: string, loading?: boolean } }) => {
    const {stopListElement} = props

    return (
        <div className={styles.StopListElement} data-testid="StopListElement">
            <Dot/>{stopListElement.name}
        </div>
    )
};
export default StopListElement;
