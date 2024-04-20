import React, {useEffect, useState} from 'react';
import './CheckList.css';
import {Button} from "react-bootstrap";
import {IoArrowBackSharp} from "react-icons/io5";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import AbstractBox from "../AbstractBox/AbstractBox";
import * as storage from "../../data/storage";
import {getTaskFooter} from "../../utils/taskHelper";

const CheckList = ({user}) => {
    const [permanentTasks, setPermanentTasks] = useState([]);

    useEffect(() => {
        storage.getTasks().then(
            (tasksJson) => {
                setPermanentTasks(tasksJson.filter(task => task.isPermanent === true));
            }
        );
    }, []);

    const getPermanentTasksByType = (type) => {
        return permanentTasks
            .filter((permanentTask) => permanentTask.done === false && permanentTask.type === type)
            .map((permanentTask) => (
                <AbstractBox
                    key={permanentTask.id}
                    title={permanentTask.type}
                    body={permanentTask.content}
                    footer={getTaskFooter(permanentTask, user)}
                />
            ));
    }

    const morningPermanentTasks = getPermanentTasksByType("MORNING");
    const dailyPermanentTasks = getPermanentTasksByType("DAY");
    const eveningPermanentTasks = getPermanentTasksByType("EVENING");

    return (
        user ?
            <div>
                <h3 className="pageHeader">TODO list</h3>
                <div className="containerHeader">
                    <Button className="commonStopListButton animatedButton backButton" href={'/'}>
                        <IoArrowBackSharp/>
                    </Button>
                </div>
                <div>
                    Здесь будут появляться поседневные задачки в зависимости от текущего времени:
                    <ul style={{marginTop: "3rem"}}>
                        <li>
                            с 8:00 до 12:00
                            {morningPermanentTasks}
                        </li>
                        <li>
                            с 14:00 до 18:00
                            {dailyPermanentTasks}
                        </li>
                        <li>
                            с 20:00 до 00:00
                            {eveningPermanentTasks}
                        </li>
                    </ul>
                </div>
            </div>
            : <NotFoundPage/>
    );
};

export default CheckList;
