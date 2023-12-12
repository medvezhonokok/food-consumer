import React, {useEffect, useState} from 'react';
import styles from './Tasks.module.css';
import Task from "../Task/Task";
import {Stack} from "react-bootstrap";
import client from "../../utils/client";
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';


async function getTasks() {
    const res = await client.get("/tasks")
    return [...res.map(el => ({
            text: el.content,
            time: new Date(Date.parse(el.creationTime))
        })
    )]
}

const Tasks = () => {
    const [tasks, setTasks] = useState(new Array(3).fill({loading: true}))

    useEffect(() => {
            getTasks().then((res) => {
                setTasks(res)
            })
        },
        []
    )

    const [dateState, setDateState] = useState(new Date())
    const changeDate = (e) => {
        setDateState(e)
    }

    return (
        <Stack gap={3} className={`${styles.Tasks} mt-3`} data-testid="Tasks">
            <div className={`${styles.CenteredContent} `}>
                <Calendar value={dateState} onChange={changeDate}/>
            </div>
            <div className={`${styles.CenteredContent}`}>
                <p>Selected date: {moment(dateState).format('MMMM Do YYYY')}</p>
            </div>
            {tasks.map(t => <Task task={t}/>)}
        </Stack>
    );
}

export default Tasks;
