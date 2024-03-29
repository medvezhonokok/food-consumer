import React, { useState, useEffect } from "react";

const Tester = () => {
    const [notificationPermission, setNotificationPermission] = useState("");

    useEffect(() => {
        if (!("Notification" in window)) {
            console.log("Browser does not support desktop notification");
        } else {
            Notification.requestPermission().then((permission) => {
                setNotificationPermission(permission);
            });
        }
    }, []);

    const showNotification = () => {
        if (notificationPermission === "granted") {
            new Notification("Tester component");
        }
    };

    return (
        <div>
            <button onClick={showNotification}>Show notification</button>
        </div>
    );
};

export default Tester;
