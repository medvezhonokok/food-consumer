import React, {useState} from 'react';
import styles from './Tasks.module.css';
import Task from "../Task/Task";
import {Stack} from "react-bootstrap";


async function getTasks() {
    await new Promise(res => setTimeout(res, 1000))
    return new Array(5).fill(
        {
            time: new Date(),
            text: "test task exampltest task exampletest task exampletest task exampletest task exampletest task exampletest task exampletest task examplee"
        }
    )
}

const Tasks = () => {
    const [tasks, setTasks] = useState(new Array(3).fill({loading: true}))

    getTasks().then((res) => {
        setTasks(res)
    })

    return (
        <Stack gap={3} className={`${styles.Tasks} mt-3`} data-testid="Tasks">
            {tasks.map(t => <Task task={t}/>)}
        </Stack>
    );
}

export default Tasks;
