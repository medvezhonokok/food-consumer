import React, {useState} from 'react';
import styles from './CustomCalendar.module.css';
import Calendar from "react-calendar";
import {Button} from "react-bootstrap";
import {BsChevronDown, BsChevronUp} from "react-icons/bs";

const CustomCalendar = function ({value, onChange}) {

    // change lib css..
    const elements = document.querySelectorAll('.react-calendar__tile--active');
    elements.forEach(element => {
        element.style.background = '#a09e73';
        element.style.borderRadius = '0.6rem';
    });

    const [isCalendarViewContainerHide, setIsCalendarViewContainerHide] = useState(true);
    const hideOrShowCalendarViewContainer = () => {
        const viewContainer = document.getElementsByClassName("react-calendar__viewContainer")[0];

        if (viewContainer) {
            viewContainer.style.display = (!viewContainer.style.display || viewContainer.style.display === 'block') ? 'none' : 'block';
            setIsCalendarViewContainerHide((prevState) => !prevState);
        }
    };

    return <div className={`${styles.CustomCalendar}`} data-testid="CustomCalendar" style={{position: 'relative'}}>
        <div className={`${styles.CenteredContent}`}>
            <Calendar className={`${styles.CustomCalendarStyle}`} value={value} onChange={onChange}/>
        </div>
        <Button onClick={hideOrShowCalendarViewContainer} style={{
            position: 'absolute', color: 'white', left: '50%', transform: 'translateX(-50%)', bottom: '-1rem'
        }}>
            {isCalendarViewContainerHide ? <BsChevronUp style={{fontSize: '0.5rem'}}/> :
                <BsChevronDown style={{fontSize: '0.5rem'}}/>}
        </Button>
    </div>;
};

export default CustomCalendar;
