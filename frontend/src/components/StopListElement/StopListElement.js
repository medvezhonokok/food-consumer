import React from 'react';
import styles from './StopListElement.module.css';

const StopListElement = (props: { stopListElement: { name: string, loading?: boolean } }) => {
    const {stopListElement} = props

    return (
        <div className={styles.StopListElement} data-testid="StopListElement">
            {stopListElement.name}
        </div>
    )
};
export default StopListElement;
