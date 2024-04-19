import React, {useEffect, useState} from 'react';
import './CheckList.css';
import {Button} from "react-bootstrap";
import {IoArrowBackSharp} from "react-icons/io5";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import AbstractBox from "../AbstractBox/AbstractBox";
import * as storage from "../../data/storage";
import {markCheckListTaskAsDone, takeCheckListTask} from "../../data/updater";

const CheckList = ({user}) => {
    const [checkList, setCheckList] = useState([]);

    useEffect(() => {
        storage.getCheckList().then(
            checkListJson => {
                setCheckList(checkListJson)
            }
        );
    }, []);

    const takeCheckListTaskById = (taskId) => {
        takeCheckListTask({
            userId: user.id,
            checkListId: taskId
        }).then((ignored) => {
            window.location.reload();
        });
    }

    const markCheckListTaskAsDoneById = (taskId) => {
        markCheckListTaskAsDone({
            userId: user.id,
            checkListId: taskId
        }).then((ignored) => {
            window.location.reload();
        });
    }
    const getCheckListTaskFooter = (checkListTask) => {
        if (checkListTask.executor === null) {
            return <Button onClick={() => takeCheckListTaskById(checkListTask.id)}>Взять на себя выполнение</Button>
        } else {
            if (checkListTask.executor.id === user.id) {
                return <Button onClick={() => markCheckListTaskAsDoneById(checkListTask.id)}>Пометить как
                    выполненное</Button>
            } else {
                return <p>Выполняет {checkListTask.executor.name}</p>
            }
        }
    }
    const getCheckListTasksByType = (type) => {
        return checkList.filter((checkListElement) => !checkListElement.done && checkListElement.type === type)
            .map((checkListElement) => (
                <AbstractBox
                    key={checkListElement.id}
                    title={checkListElement.type}
                    body={checkListElement.content}
                    footer={getCheckListTaskFooter(checkListElement)}
                />
            ));
    }

    const morningCheckListTasks = getCheckListTasksByType("MORNING");
    const dailyCheckListTasks = getCheckListTasksByType("DAY");
    const eveningCheckListTasks = getCheckListTasksByType("EVENING");

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
                            {morningCheckListTasks}
                        </li>
                        <li>
                            с 14:00 до 18:00
                            {dailyCheckListTasks}
                        </li>
                        <li>
                            с 20:00 до 00:00
                            {eveningCheckListTasks}
                        </li>
                    </ul>
                </div>
            </div>
            : <NotFoundPage/>
    );
};

export default CheckList;
