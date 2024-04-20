import * as constants from './../constants/constants';
import axios from "axios";

const jwtToken = localStorage.getItem('jwtToken');
export const updateUserSettings = (data, userId) => {
    return axios.post(constants.BACKEND_JAVA_URL + `/1/users/update/${userId}?jwt=` + jwtToken, data)
        .then((ignored) => {
            // No operations.
        }).catch((err) => {
            console.error("Failed to get users", err);
            return [];
        });
}

export const addStopListElement = (data) => {
    return axios.post(constants.BACKEND_JAVA_URL + `/stop_list/add?jwt=` + jwtToken, data)
        .then((ignored) => {
            // No operations.
        }).catch((err) => {
            console.log("Failed to add stop list element", err);
            return [];
        });
}

export const removeStopListElement = (data) => {
    return axios.post(constants.BACKEND_JAVA_URL + `/stop_list/remove?jwt=` + jwtToken, data)
        .then((ignored) => {
            // No operations.
        }).catch((err) => {
            console.log("Failed to remove stop list element", err);
            return [];
        });
}

export const takeTask = (data) => {
    return axios.post(constants.BACKEND_JAVA_URL + `/tasks/take?jwt=` + jwtToken, data)
        .then((ignored) => {
            // No operations.
        }).catch((err) => {
            console.log("Failed to take task", err);
            return [];
        });
}

export const markTaskAsDone = (data) => {
    return axios.post(constants.BACKEND_JAVA_URL + `/tasks/mark_as_done?jwt=` + jwtToken, data)
        .then((ignored) => {
            // No operations.
        }).catch((err) => {
            console.log("Failed to mark as done task", err);
            return [];
        });
}


export const addNews = (data) => {
    return axios.post(constants.BACKEND_JAVA_URL + '/news/add', data, {
        headers: {"Content-Type": "multipart/form-data"},
    });
}

export const assignTask = (data) => {
    return axios.post(constants.BACKEND_JAVA_URL + `/tasks/add_and_assign_to_user?jwt=` + jwtToken, data)
        .then((ignored) => {
            // No operations.
        }).catch((err) => {
            console.log("Failed to mark as done task", err);
            return [];
        });
}