import React from 'react';
import styles from './Task.module.css';
import {Card, Placeholder} from "react-bootstrap";


const Task = (props: { task: { time: Date, text: string, loading?: boolean } }) => {
    const {task} = props

    const ftime = () => `${task.time.getHours().toString().padStart(2, "0")}:${task.time.getMinutes().toString().padStart(2, "0")}`
    return (
        <Card className={"border-1 rounded-2 m-auto w-75"}>
            <Card.Header>
                <span
                    className={`${styles.Header} text-secondary`}
                ><b>
                    {task.loading?
                        <Placeholder animation={"glow"}><Placeholder xs={6}/></Placeholder>
                        : ftime()
                    }
                </b></span>
            </Card.Header>
            <Card.Body className={"w-100 h-100"}>
                <Card.Text>
                    {task.loading ?
                        <Placeholder animation={"glow"}>
                            <Placeholder xs={4}/> <Placeholder xs={6}/> <Placeholder xs={7}/>
                        </Placeholder>
                        :
                        task.text
                    }
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default Task;
