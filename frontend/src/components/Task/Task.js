import React from 'react';
import styles from './Task.module.css';
import { Button, Card, Placeholder, Row, Col } from "react-bootstrap";
import client from "../../utils/client";

const Task = ({ task, user }) => {
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

        const responseBody = await response.text();

        if (responseBody === "ALREADY_REMOVED") {
            message = "Данное задание было удалено";
        } else if (responseBody === "ALREADY_TAKEN") {
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
            <Card.Header className="d-flex justify-content-center">
        <span className={`${styles.Header} text-secondary`}><b>
          {task.loading ?
              <Placeholder animation={"glow"}><Placeholder xs={6} /></Placeholder>
              : ftime()
          }
        </b></span>
            </Card.Header>
            <Card.Body className={"w-100 h-100 d-flex flex-column"}>
                <Card.Text className="flex-grow-1">
                    {task.loading ?
                        <Placeholder animation={"glow"}>
                            <Placeholder xs={4} /> <Placeholder xs={6} /> <Placeholder xs={7} />
                        </Placeholder>
                        : task.text
                    }
                </Card.Text>
                <Row className="mt-auto">
                    <Col>
                        <Button className={`${styles.Button} btn-danger w-100`} onClick={() => removeTask(task.id)}>
                            Удалить
                        </Button>
                    </Col>
                    <Col>
                        <Button className={`${styles.Button} btn-warning w-100`}
                                style={task.userId !== null && task.userId !== user.id ? { display: "none" } : { background: "#B5B285" }}
                                onClick={handleCompleteClick}>
                            {task.userId === null ? "Взять" : "Отказаться"}
                        </Button>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
}

export default Task;
