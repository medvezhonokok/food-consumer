import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styles from './Notes.module.css';
import StopListElements from "../StopListElements/StopListElements";
import Orders from "../Orders/Orders";

const Notes = () => {

    return (
        <div className={styles.Notes} data-testid="Notes">
            <StopListElements/>
            <Orders/>
        </div>
    );
}
export default Notes;
