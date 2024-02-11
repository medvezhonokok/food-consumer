import React from 'react';
import styles from './Notes.module.css';
import StopListElements from "../StopListElements/StopListElements";
import Orders from "../Orders/Orders";

const Notes = () => {
    const getUserFromLocalStorage = () => {
        const userString = localStorage.getItem('user');
        return userString ? JSON.parse(userString) : null;
    };

    const user = getUserFromLocalStorage();

    return (
        (user ?
                <div className={styles.Notes} data-testid="Notes">
                    <StopListElements/>
                    <Orders/>
                </div> :
                <>nothing there</>
        )
    );
}
export default Notes;
