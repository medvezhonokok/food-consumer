import {Button} from "react-bootstrap";
import {assignTask, markTaskAsDone, takeTask} from "../data/updater";
import React from "react";

export const getTaskFooter = (task, user) => {
    if (task.executor === null) {
        return <Button onClick={() => {
            takeTask({
                userId: user.id,
                taskId: task.id
            }).then((ignored) => {
                window.location.reload();
            });
        }}>Взять на себя выполнение</Button>
    } else {
        if (task.executor.id === user.id) {
            if (task.done) {
                return <p>Выполнено</p>
            } else {
                return <Button onClick={() => {
                    markTaskAsDone({
                        userId: user.id,
                        taskId: task.id
                    }).then((ignored) => {
                        window.location.reload();
                    });
                }}>Пометить как выполненное</Button>
            }
        } else {
            return <p>Выполняет {task.executor.name}</p>
        }
    }
}

export const assignToUser = (event, newTaskContent, dateTime) => {
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