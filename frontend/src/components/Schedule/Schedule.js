import React, {useEffect, useState} from 'react';

import './Schedule.css';
import BottomNavBar from "../BottomNavBar/BottomNavBar";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import CustomCalendar from "../CustomCalendar/CustomCalendar";
import * as storage from "./../../data/storage";
import AbstractBox from "../AbstractBox/AbstractBox";

const Schedule = ({user}) => {
    const [date, setDate] = useState(new Date());
    const [schedule, setSchedule] = useState([]);

    useEffect(() => {
        storage.getSchedule().then(
            scheduleJson => {
                setSchedule(scheduleJson)
            }
        );
    }, []);

    const groupedSchedule = schedule.reduce((acc, curr) => {
        if (!acc[curr.role]) {
            acc[curr.role] = [];
        }
        acc[curr.role].push(curr);
        return acc;
    }, {});

    const mappedSchedule = Object.keys(groupedSchedule).map((role, idx) => (
        <AbstractBox key={idx}
                     title={<h4 className="userRoleHeader">{role}</h4>}
                     body={groupedSchedule[role]
                         .filter(scheduleElem => (
                             scheduleElem.creationTime.getMonth() === date.getMonth()
                             && scheduleElem.creationTime.getDate() === date.getDate()
                         ))
                         .map((scheduleElem, idx) => (
                             <AbstractBox
                                 key={idx}
                                 title={scheduleElem.workerName}
                                 body={scheduleElem.info}
                             />
                         ))}
        >
        </AbstractBox>
    ));

    return (
        user ?
            <div>
                <h3 className="pageHeader">Schedule</h3>
                <CustomCalendar selected={date} onSelect={setDate}/>
                <div className="usersBox">
                    {mappedSchedule}
                </div>
                <BottomNavBar user={user}/>
            </div>
            : <NotFoundPage/>
    );
};

export default Schedule;
