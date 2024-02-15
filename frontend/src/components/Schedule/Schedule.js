import React, {useEffect, useState} from 'react';
import styles from './Schedule.module.css';
import {Spinner, Stack, ToggleButton, ToggleButtonGroup} from 'react-bootstrap';
import 'react-calendar/dist/Calendar.css';
import CustomCalendar from '../CustomCalendar/CustomCalendar';
import CustomNavbar from '../CustomNavbar/CustomNavbar';
import client from '../../utils/client';
import moment from 'moment/moment';
import ScheduleBox from '../ScheduleBox/ScheduleBox';

const Schedule = ({user}) => {
    const [schedule, setSchedule] = useState([]);
    const [dateState, setDateState] = useState(new Date());
    const [workerScheduleRole, setWorkerScheduleRole] = useState("WAITER");
    const [loading, setLoading] = useState(true);

    const getSchedule = async () => {
        try {
            const response = await client.get('/api/schedule');
            return response.map((el) => ({
                workerName: el.workerName,
                creationTime: new Date(el.creationTime),
                info: el.info,
                role: el.role,
            }));
        } catch (error) {
            return [];
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await getSchedule();
                setSchedule(res);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const checkOnEmpty = (list, role) => {
        if (!list || list.length === 0) {
            list = <div className={`${styles.CenteredContent}`}> {role}'s schedule is clear for today</div>;
        }
        return list;
    }

    const changeDate = (e) => {
        setDateState(e);
    };

    const changeRole = (role) => {
        setWorkerScheduleRole(role);
    };

    let filteredScheduleByDate = schedule
        .filter((scheduleElem) => {
            const taskDay = moment(scheduleElem.creationTime);
            return taskDay.isSame(moment(dateState), 'day') && taskDay.isSame(moment(dateState), 'month');
        })
        .map((scheduleElem) => <ScheduleBox key={scheduleElem.workerName} scheduleElem={scheduleElem}/>);

    let filteredWaiterScheduleByDate = filteredScheduleByDate
        .filter((worker) => worker.props.scheduleElem.role === "WAITER");

    let filteredBaristaScheduleByDate = filteredScheduleByDate
        .filter((worker) => worker.props.scheduleElem.role === "BARISTA");

    let filteredManagerScheduleByDate = filteredScheduleByDate
        .filter((worker) => worker.props.scheduleElem.role === "MANAGER");

    filteredManagerScheduleByDate = checkOnEmpty(filteredManagerScheduleByDate, "Manager");
    filteredBaristaScheduleByDate = checkOnEmpty(filteredBaristaScheduleByDate, "Barista");
    filteredWaiterScheduleByDate = checkOnEmpty(filteredWaiterScheduleByDate, "Waiter");

    return (
        <>
            {user ? (
                <>
                    <CustomNavbar user={user}/>
                    <Stack gap={3} className={`${styles.Schedule} mt-3`} data-testid="Schedule">
                        <CustomCalendar value={dateState} onChange={changeDate}/>

                        <div style={{marginTop: '2rem'}}>
                            {loading ? (
                                <div className="text-center">
                                    <Spinner animation="border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </Spinner>
                                </div>
                            ) : (
                                <>
                                    <ToggleButtonGroup
                                        style={{textAlign: "center", marginBottom: '2rem', display: "flow"}}
                                        type="radio" name="options"
                                        defaultValue={2}>
                                        <ToggleButton id="tbg-radio-1" value={1}
                                                      onChange={() => changeRole("MANAGER")}>
                                            Manager's schedule
                                        </ToggleButton>
                                        <ToggleButton id="tbg-radio-2" value={2}
                                                      onChange={() => changeRole("WAITER")}>
                                            Waiter's schedule
                                        </ToggleButton>
                                        <ToggleButton id="tbg-radio-3" value={3}
                                                      onChange={() => changeRole("BARISTA")}>
                                            Barista's schedule
                                        </ToggleButton>
                                    </ToggleButtonGroup>
                                    {
                                        // filteredScheduleByDate
                                        workerScheduleRole === "WAITER" ?
                                            filteredWaiterScheduleByDate
                                            :
                                            (
                                                workerScheduleRole === "BARISTA"
                                                    ? filteredBaristaScheduleByDate
                                                    : filteredManagerScheduleByDate
                                            )
                                    }
                                </>
                            )}
                        </div>
                    </Stack>
                </>
            ) : (
                <>
                    nothing there
                </>
            )}
        </>
    );
};

export default Schedule;
