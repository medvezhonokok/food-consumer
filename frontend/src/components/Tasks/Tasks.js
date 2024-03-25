import React, {useEffect, useState} from 'react';
import styles from './Tasks.module.css';
import Task from "../Task/Task";
import {Button, Form, Modal, Stack} from "react-bootstrap";
import client from "../../utils/client";
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import CustomCalendar from "../CustomCalendar/CustomCalendar";
import CustomNavbar from "../CustomNavbar/CustomNavbar";

async function getTasks() {
    // const tasksRes = await client.get("/api/tasks");
    const permTasksRes = await client.get("/api/perm_tasks");

    // const tasks = tasksRes.map(task => ({
    //     id: task.id,
    //     userId: task.userId,
    //     text: task.content,
    //     time: new Date(Date.parse(task.creationTime))
    // }));

    const permTasks = permTasksRes.map(task => ({
        text: task.content,
        id: task.id,
        userId: task.userId,
        time: new Date(Date.parse(task.creationTime))
    }));

    return [...permTasks];
}

const Tasks = ({user}) => {
    const [tasks, setTasks] = useState(new Array(3).fill({loading: true}));
    const [showModal, setShowModal] = useState(false);
    const [time, setTime] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        getTasks().then(res => {
            setTasks(res);
        });
    }, []);

    const [dateState, setDateState] = useState(new Date());
    const changeDate = (e) => {
        setDateState(e);
    };

    const currentHour = moment().hour();

    let filteredTasksByDay = tasks.filter((task) => {
        const taskHour = moment(task.time).hour();
        if (currentHour >= 6 && currentHour < 9) {
            return taskHour >= 6 && taskHour < 9;
        } else if (currentHour >= 16 && currentHour < 21) {
            return taskHour >= 16 && taskHour < 21;
        } else if (currentHour >= 21 && currentHour < 23) {
            return taskHour >= 21 && taskHour < 23;
        } else {
            return false;
        }
    }).map((t, index) => <Task key={index} task={t} user={user}/>);

    if (!filteredTasksByDay || filteredTasksByDay.length === 0) {
        filteredTasksByDay = <div className={`${styles.CenteredContent} `}>No tasks scheduled for today</div>;
    }

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleAddPermanentTask = async () => {
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0];
        const dateTimeString = `${formattedDate}T${time}:00`;

        const requestBody = {
            content: content,
            userId: user.id,
            time: dateTimeString
        };

        const response = await fetch(`${client.baseUrl}/api/add_new_perm_task`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText);
        }

        setTime('');
        setContent('');
        setShowModal(false);

        alert("Task added successfully");
        window.location.reload();
    };


    return (
        (user ?
                <>
                    <CustomNavbar user={user}/>
                    <div style={{marginTop: "2rem"}}>
                        <CustomCalendar value={dateState} onChange={changeDate}/>
                    </div>
                    <div style={{margin: "4rem 0"}}>
                        <Stack gap={3} className={`${styles.Tasks} mt-3`} data-testid="Tasks">
                            {filteredTasksByDay}
                        </Stack>
                        <div style={{textAlign: "center", marginTop: "2rem"}} className="ml-auto">
                            {user.admin && (
                                <Button onClick={handleOpenModal}>
                                    Add new permanent task
                                </Button>
                            )}
                        </div>
                    </div>
                    <Modal show={showModal} onHide={handleCloseModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add New Permanent Task</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Group controlId="time">
                                <Form.Label>Time:</Form.Label>
                                <Form.Control type="time" value={time} onChange={(e) => setTime(e.target.value)}/>
                            </Form.Group>
                            <Form.Group controlId="content">
                                <Form.Label>Content:</Form.Label>
                                <Form.Control as="textarea" rows={3} value={content}
                                              onChange={(e) => setContent(e.target.value)}/>
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseModal}>
                                Cancel
                            </Button>
                            <Button variant="primary" onClick={handleAddPermanentTask}>
                                Add
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
                :
                <>nothing there</>
        )
    );
}

export default Tasks;
