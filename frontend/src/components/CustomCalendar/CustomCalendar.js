import './CustomCalendar.css';
import {DayPicker} from 'react-day-picker';
import {useState} from "react";
import {Button} from "react-bootstrap";
import {BsChevronDown, BsChevronUp} from "react-icons/bs";

const CustomCalendar = function ({selected, onSelect}) {
    const [hide, setHide] = useState(true);

    return (
        <>
            <DayPicker
                mode="single"
                selected={selected}
                onSelect={onSelect}
                hidden={hide}
            />
            <Button className="calendarButton" onClick={() => setHide(!hide)}>
                {!hide ? <BsChevronUp/> : <BsChevronDown/>}
            </Button>
        </>
    );
};

export default CustomCalendar;
