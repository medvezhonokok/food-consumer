import React from 'react';
import styles from './Task.module.css';
import {Button, Card, Placeholder} from "react-bootstrap";
import client from "../../utils/client";

const Task = ({task, user}) => {
    const ftime = () => `${task.time.getHours().toString().padStart(2, "0")}:${task.time.getMinutes().toString().padStart(2, "0")}`;

    const handleCompleteClick = async () => {
        const taskId = task.id;
        let message;

        const response = await fetch(`${client.baseUrl}/api/take_or_return_task?taskId=${taskId}&userId=${user.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText);
        }

        if (await response.text() === "ALREADY_REMOVED") {
            message = "Данное задание было удалено";
        } else if (await response.text() === "ALREADY_TAKEN") {
            message = "Данное задание уже взято другим человеком.";
        } else if (task.userId === null) {
            message = "Задание взято.";
        } else {
            message = "Задание успешно возвращено.";
        }

        alert(message);
        window.location.reload();
    };


    const removeTask = async (taskId) => {
        const response = await fetch(`${client.baseUrl}/api/remove_task?taskId=${taskId}&userId=${user.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText);
        }

        alert("Владыка удалил задание");
        window.location.reload();
    }

    return (
        <Card className={"border-1 rounded-2 m-auto w-75"}>
            <Card.Header>
                <span
                    className={`${styles.Header} text-secondary`}
                ><b>
                    {task.loading ?
                        <Placeholder animation={"glow"}><Placeholder xs={6}/></Placeholder>
                        : ftime()
                    }
                </b></span>
                <div style={{float: "right", marginLeft: "1rem"}} className="ml-auto">
                    {!task.loading && user.admin && (
                        <Button onClick={() => removeTask(task.id)}>
                            Remove
                        </Button>
                    )}
                </div>
                <div style={{float: "right"}} className="ml-auto">
                    {!task.loading && (
                        <Button
                            style={task.userId !== null && task.userId !== user.id ? {display: "none"} : {background: "#B5B285"}}
                            variant={task.userId === null ? "success" : "warning"} onClick={handleCompleteClick}>
                            {task.userId === null ? "Взять" : "Отказаться"}
                        </Button>
                    )}
                </div>
            </Card.Header>
            <Card.Body className={"w-100 h-100"}>
                <Card.Text>
                    {task.loading ?
                        <Placeholder animation={"glow"}>
                            <Placeholder xs={4}/> <Placeholder xs={6}/> <Placeholder xs={7}/>
                        </Placeholder>
                        : task.text
                    }
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default Task;
