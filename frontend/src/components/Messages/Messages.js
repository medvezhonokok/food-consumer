import React, {useEffect, useRef, useState} from 'react';
import './Messages.css';
import io from "socket.io-client";
import * as constants from "../../constants/constants";
import MessageBox from "../MessageBox/MessageBox";
import {sentNotificationToEveryOneExceptCurrentUser} from "../../data/notifier";

const Messages = ({user}) => {
    const socket = io.connect(constants.BACKEND_JS_URL);

    const [messageHistory, setMessageHistory] = useState([]);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        socket.on("receive_message", (data) => {
            sentNotificationToEveryOneExceptCurrentUser("Новое сообщение:\n" + data.text.trim())
            setMessageHistory(prevHistory => [...prevHistory, data]);
        });

        scrollToBottom();

        return () => {
            socket.off("receive_message");
        };
    }, [messageHistory]);

    useEffect(() => {
        socket.emit("get_message_history");
        socket.on("message_history", (history) => {
            setMessageHistory(history);
            scrollToBottom();
        });

        return () => {
            socket.off("message_history");
        };
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messageHistory]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({behavior: "smooth"});
    };
    const isSameDay = (date1, date2) => {
        return (
            date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate()
        );
    };

    const formatDate = (date) => {
        const options = {day: 'numeric', month: 'long'};
        return new Intl.DateTimeFormat('ru-RU', options).format(date);
    };

    let lastMessageDate = null;

    const mappedMessages = messageHistory.map((message, idx) => {
        const messageDate = new Date(message.creation_time);
        const showDate = !lastMessageDate || !isSameDay(lastMessageDate, messageDate);

        lastMessageDate = messageDate;

        const messageBoxProps = {
            text: message.text,
            time: message.creation_time,
            name: message.sender_name || user.name,
            login: message.sender_login || user.login,
            isMyMessage: message.sender_login === user.login
        };

        return (
            <div key={idx}>
                {showDate && (
                    <div className="date">
                        {formatDate(messageDate)}
                    </div>
                )}
                <MessageBox {...messageBoxProps} />
            </div>
        );
    });

    return (
        <div className="messagesContainer">
            {mappedMessages}
            <div ref={messagesEndRef}/>
        </div>
    )
};
export default Messages;
