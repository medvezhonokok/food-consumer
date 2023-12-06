import React, {useEffect, useState} from 'react';
import styles from './Tasks.module.css';
import Task from "../Task/Task";
import {Stack} from "react-bootstrap";
import client from "../../utils/client";


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

    return (
        <Stack gap={3} className={`${styles.Tasks} mt-3`} data-testid="Tasks">
            {tasks.map(t => <Task task={t}/>)}
        </Stack>
    );
}

export default Tasks;
