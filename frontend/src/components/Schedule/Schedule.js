import React, { useEffect, useState } from 'react';
import styles from './Schedule.module.css';
import { Spinner, Stack } from 'react-bootstrap';
import 'react-calendar/dist/Calendar.css';
import CustomCalendar from '../CustomCalendar/CustomCalendar';
import CustomNavbar from '../CustomNavbar/CustomNavbar';
import client from '../../utils/client';
import moment from 'moment/moment';
import ScheduleBox from '../ScheduleBox/ScheduleBox';

const Schedule = ({ user }) => {
    const [schedule, setSchedule] = useState([]);
    const [dateState, setDateState] = useState(new Date());
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
    };

    const changeDate = (e) => {
        setDateState(e);
    };

    const renderScheduleByRole = (role) => {
        const filteredScheduleByRole = schedule
            .filter((worker) => worker.role === role)
            .filter((scheduleElem) => {
                const taskDay = moment(scheduleElem.creationTime);
                return taskDay.isSame(moment(dateState), 'day') && taskDay.isSame(moment(dateState), 'month');
            })
            .map((scheduleElem) => <ScheduleBox key={scheduleElem.workerName} scheduleElem={scheduleElem}/>);

        return checkOnEmpty(filteredScheduleByRole, role);
    };

    const allRoles = ['WAITER', 'BARISTA', 'MANAGER'];

    return (
        <>
            {user ? (
                <>
                    <CustomNavbar user={user}/>
                    <Stack gap={3} className={`${styles.Schedule} mt-3`} data-testid="Schedule">
                        <div style={{ marginTop: "5rem" }}>
                            <CustomCalendar value={dateState} onChange={changeDate}/>
                        </div>
                        <div style={{ marginTop: '5rem' }}>
                            {loading ? (
                                <div className="text-center">
                                    <Spinner animation="border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </Spinner>
                                </div>
                            ) : (
                                <>
                                    {allRoles.map((role) => (
                                        <div key={role} style={{marginBottom: "1rem"}}>
                                            <h2>{role}</h2>
                                            {renderScheduleByRole(role)}
                                        </div>
                                    ))}
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
