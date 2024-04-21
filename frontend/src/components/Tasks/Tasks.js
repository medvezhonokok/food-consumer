import React, {useEffect, useState} from 'react';
import './Tasks.css';
import {format, isSameDay} from 'date-fns';
import {Button} from "react-bootstrap";
import {IoAddOutline, IoArrowBackSharp} from "react-icons/io5";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import * as storage from "../../data/storage";
import {getUsers} from "../../data/storage";
import AbstractBox from "../AbstractBox/AbstractBox";
import Modal from "../Modal/Modal";
import CustomCalendar from "../CustomCalendar/CustomCalendar";
import {assignToUser, getTaskFooter} from "../../utils/taskHelper";

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
                setTasks(tasksJson.filter((task) => task.isPermanent === false))
            }
        );
    }, []);

    let mappedTasks = tasks
        .filter((task) => date
            ? isSameDay(new Date(task.creationTime), date) && (!task.executor || task.executor.id === user.id)
            : false)
        .map((task) => (
            <AbstractBox
                key={task.id}
                title={task.content}
                body={task.creationTime.split('T')[1]}
                footer={getTaskFooter(task, user)}
            />
        ));

    if (!mappedTasks || mappedTasks.length === 0) {
        mappedTasks = (date &&
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
                            Add
                        </Button>
                    }
                </div>
                {mappedTasks}
                <Modal
                    isOpen={isFormOpen}
                    onClose={() => setIsFormOpen(false)}>
                    <form onSubmit={(event) => assignToUser(event, newTaskContent, dateTime)}>
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
