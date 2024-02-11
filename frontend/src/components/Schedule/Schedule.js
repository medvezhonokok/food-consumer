import React, {useEffect, useState} from 'react';
import styles from './Schedule.module.css';
import {Stack} from 'react-bootstrap';
import 'react-calendar/dist/Calendar.css';
import CustomCalendar from '../CustomCalendar/CustomCalendar';
import CustomNavbar from '../CustomNavbar/CustomNavbar';
import client from '../../utils/client';
import moment from "moment/moment";
import ScheduleBox from "../ScheduleBox/ScheduleBox";

const Schedule = ({user, handleLogout}) => {
    const [schedule, setSchedule] = useState(new Array(3).fill({loading: true}));
    const [dateState, setDateState] = useState(new Date());

    const getSchedule = async () => {
        try {
            const res = await client.get('/schedule');
            return res.map(el => ({
                workerName: el.workerName,
                creationTime: new Date(el.creationTime),
                info: el.info,
            }));
        } catch (error) {
            return [];
        }
    };

    useEffect(() => {
        getSchedule().then((res) => {
            setSchedule(res);
        });
    }, []);

    const changeDate = (e) => {
        setDateState(e);
    };

    let filteredScheduleByDate = schedule.filter((scheduleElem) => {
        const taskDay = moment(scheduleElem.creationTime);
        return taskDay.isSame(moment(dateState), 'day') && taskDay.isSame(moment(dateState), 'month');
    }).map((scheduleElem) => <ScheduleBox scheduleElem={scheduleElem}/>);

    if (!filteredScheduleByDate || filteredScheduleByDate.length === 0) {
        filteredScheduleByDate = <div className={`${styles.CenteredContent}`}>Schedule is clear for today</div>;
    }

    return (
        (user ?
                <>
                    <CustomNavbar user={user}/>
                    <Stack gap={3} className={`${styles.Schedule} mt-3`} data-testid="Schedule">
                        <CustomCalendar value={dateState} onChange={changeDate}/>

                        <div style={{marginTop: '2rem'}}>
                            {filteredScheduleByDate}
                        </div>
                    </Stack>
                </>
                :
                <>
                    nothing there
                </>
        )
    );
};

export default Schedule;
