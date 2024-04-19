import React, {useEffect, useState} from 'react';
import './Tasks.css';
import {format, isSameDay} from 'date-fns';
import {Button} from "react-bootstrap";
import {IoAddOutline, IoArrowBackSharp} from "react-icons/io5";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import * as storage from "../../data/storage";
import {getUsers} from "../../data/storage";
import AbstractBox from "../AbstractBox/AbstractBox";
import {assignTask, markTaskAsDone, takeTask} from "../../data/updater";
import Modal from "../Modal/Modal";
import CustomCalendar from "../CustomCalendar/CustomCalendar";

const Tasks = ({user}) => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [users, setUsers] = useState([]);
    const [newTaskContent, setNewTaskContent] = useState("");
    const [date, setDate] = useState(new Date());
    const [dateTime, setDateTime] = useState(new Date())

    useEffect(() => {
        getUsers().then(usersJson => {
            setUsers(usersJson);
        });
    }, []);

    useEffect(() => {
        storage.getTasks().then(
            tasksJson => {
                setTasks(tasksJson)
            }
        );
    }, []);

    const takeTaskById = (taskId) => {
        takeTask({
            userId: user.id,
            taskId: taskId
        }).then((ignored) => {
            window.location.reload();
        });
    }

    const markTaskAsDoneById = (taskId) => {
        markTaskAsDone({
            userId: user.id,
            taskId: taskId
        }).then((ignored) => {
            window.location.reload();
        });
    }

    const getTaskFooter = (task) => {
        if (task.executor === null) {
            return <Button onClick={() => takeTaskById(task.id)}>Взять на себя выполнение</Button>
        } else {
            if (task.executor.id === user.id) {
                if (task.done) {
                    return <p>Выполнено</p>
                } else {
                    return <Button onClick={() => markTaskAsDoneById(task.id)}>Пометить как выполненное</Button>
                }
            } else {
                return <p>Выполняет {task.executor.name}</p>
            }
        }
    }

    const assignToUser = (event) => {
        event.preventDefault();
        const selectedUserId = event.target.querySelector('select').value;
        const taskContent = newTaskContent.trim()

        if (taskContent && selectedUserId) {
            assignTask({
                dateTime: dateTime,
                content: newTaskContent.trim(),
                userId: event.target.querySelector('select').value
            }).then((ignored) => {
                window.location.reload();
            })
        } else {
            alert("Пожалуйста, заполните все поля.");
        }
    }

    let mappedTasks = tasks
        .filter((task) => isSameDay(new Date(task.creationTime), date) && task.executor.id === user.id)
        .map((task) => (
            <AbstractBox
                key={task.id}
                title={task.content}
                body={task.creationTime.split('T')[1]}
                footer={getTaskFooter(task)}
            />
        ));

    if (!mappedTasks || mappedTasks.length === 0) {
        mappedTasks = (
            <div className="centeredContent" style={{marginTop: "2rem"}}>
                На {format(date, 'PP')} у тебя задач нет.
            </div>);
    }

    return (
        user ?
            <div>
                <h3 className="pageHeader">Tasks</h3>
                <CustomCalendar selected={date} onSelect={setDate}/>
                <div className="containerHeader">
                    <Button className="commonStopListButton animatedButton backButton" href={'/'}>
                        <IoArrowBackSharp/>
                    </Button>
                    {user.admin &&
                        <Button className="commonStopListButton animatedButton addButton"
                                onClick={() => setIsFormOpen(true)}>
                            <IoAddOutline/>
                        </Button>
                    }
                </div>
                <div className="usersBox">
                    {mappedTasks}
                </div>
                <Modal
                    isOpen={isFormOpen}
                    onClose={() => setIsFormOpen(false)}>
                    <form onSubmit={assignToUser}>
                        <textarea
                            required={true}
                            autoFocus={true}
                            placeholder="Че надо сделать?"
                            value={newTaskContent}
                            onChange={(event) => (setNewTaskContent(event.target.value))}
                        />
                        <select
                            className="profileInput"
                            style={{margin: "1rem 0"}}
                            required={true}
                            autoFocus={true}
                            defaultValue={user.id}>
                            <option value="" disabled hidden>Выберите пользователя</option>
                            {users.map(user => (
                                <option key={user.id} value={user.id}>{user.name}</option>
                            ))}
                        </select>
                        <input
                            style={{
                                marginBottom: "1rem"
                            }}
                            className="profileInput"
                            type="datetime-local"
                            required={true}
                            autoFocus={true}
                            value={dateTime}
                            onChange={(event) => (setDateTime(event.target.value))}
                        />
                        <Button className="animatedButton addStopListElementButton" type="submit">Озадачить</Button>
                    </form>
                </Modal>
            </div>
            : <NotFoundPage/>
    );
};
export default Tasks;
