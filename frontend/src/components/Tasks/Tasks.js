import React, {useEffect, useState} from 'react';
import styles from './Tasks.module.css';
import Task from "../Task/Task";
import {Stack} from "react-bootstrap";
import client from "../../utils/client";
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import CustomCalendar from "../CustomCalendar/CustomCalendar";
import CustomNavbar from "../CustomNavbar/CustomNavbar";


async function getTasks() {
    const res = await client.get("/tasks")
    return [...res.map(el => ({
            text: el.content,
            time: new Date(Date.parse(el.creationTime))
        })
    )]
}

const Tasks = () => {
    const [tasks, setTasks] = useState(new Array(3).fill({loading: true}));
    useEffect(() => {
            getTasks().then((res) => {
                setTasks(res)
            })
        },
        []
    )

    const [dateState, setDateState] = useState(new Date());
    const changeDate = (e) => {
        setDateState(e)
    }

    let filteredTasksByDay = tasks.filter((task) => {
        const taskDay = moment(task.time);
        return taskDay.isSame(moment(dateState), 'day');
    }).map((t) => <Task task={t}/>);

    if (!filteredTasksByDay || filteredTasksByDay.length === 0) {
        filteredTasksByDay = <div className={`${styles.CenteredContent} `}>No one task today</div>;
    }

    return (
        <Stack gap={3} className={`${styles.Tasks} mt-3`} data-testid="Tasks">
            <CustomNavbar/>
            <CustomCalendar value={dateState} onChange={changeDate}/>

            <div className={`${styles.CenteredContent}`}>
                <p>Selected date: {moment(dateState).format('MMMM Do YYYY')}</p>
            </div>

            {filteredTasksByDay}
        </Stack>
    );
}

export default Tasks;