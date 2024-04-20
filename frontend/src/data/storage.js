import * as constants from './../constants/constants';
import axios from "axios";

const jwtToken = localStorage.getItem('jwtToken');

export const getUsers = () => {
    return axios.get(constants.BACKEND_JAVA_URL + '/1/users/all?jwt=' + jwtToken)
        .then((response) => {
            return response.data.map(user => ({
                id: user.id,
                login: user.login,
                phoneNumber: user.phoneNumber,
                name: user.name,
                about: user.about,
                role: user.userRole
            }));
        }).catch((err) => {
            console.error("Failed to get users", err);
            return [];
        });
}

export const getSchedule = () => {
    return axios.get(constants.BACKEND_JAVA_URL + '/schedule?jwt=' + jwtToken)
        .then(response => {
            return response.data.map((scheduleElement) => ({
                workerName: scheduleElement.workerName,
                creationTime: new Date(scheduleElement.creationTime),
                info: scheduleElement.info,
                role: scheduleElement.role,
            }));
        }).catch(err => {
            console.error("Failed to get schedule", err);
            return [];
        });
};

export const getStopList = () => {
    return axios.get(constants.BACKEND_JAVA_URL + '/stop_list/all?jwt=' + jwtToken)
        .then(response => {
            return response.data.map((stopListElement) => ({
                id: stopListElement.id,
                name: stopListElement.name,
            }));
        }).catch(err => {
            console.error("Failed to get stop list", err);
            return [];
        });
};

export const getTasks = () => {
    return axios.get(constants.BACKEND_JAVA_URL + '/tasks/all?jwt=' + jwtToken)
        .then(response => {
            return response.data.map((task) => ({
                id: task.id,
                userId: task.userId,
                content: task.content,
                creationTime: task.creationTime,
                executor: task.executor,
                done: task.done,
                type: task.type,
                isPermanent: task.permanent,
            }));
        }).catch(err => {
            console.error("Failed to get tasks", err);
            return [];
        });
};

export const getNews = () => {
    return axios.get(constants.BACKEND_JAVA_URL + '/news/all?jwt=' + jwtToken)
        .then(response => {
            return response.data.map((news) => ({
                id: news.id,
                description: news.description,
                pathToFile: news.pathToFile,
                author: news.author,
                comments: news.comments,
                creationTime: news.creationTime
            }));
        }).catch(err => {
            console.error("Failed to get news", err);
            return [];
        });
}