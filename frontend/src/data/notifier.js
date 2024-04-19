import axios from "axios";
import * as constants from "../constants/constants";

const jwtToken = localStorage.getItem('jwtToken');

export const sentNotificationToEveryOneExceptCurrentUser = (message) => {
    return axios.post(constants.BACKEND_JAVA_URL + '/notifications/sent?jwt=' + jwtToken, {
        message: message,
    }).then((ignore) => {
        // No operations
    }).catch((err) => {
        console.error("Failed to sent notification", err);
    });
}
