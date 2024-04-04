import React, { useEffect, useRef, useState } from 'react';
import styles from './Chat.module.css';
import io from "socket.io-client";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import CustomNavbar from "../CustomNavbar/CustomNavbar";

const socket = io.connect(process.env.REACT_APP_SOCKET_URL);

const Chat = ({ user }) => {
    const [message, setMessage] = useState("");
    const [messageHistory, setMessageHistory] = useState([]);
    const messagesEndRef = useRef(null);
    const [rows, setRows] = useState(1);
    const textareaRef = useRef(null);

    const sendMessage = () => {
        if (!message.trim()) {
            return;
        }
        socket.emit("send_message", { text: message.trim(), sender: user });
        setMessage("");
        textareaRef.current.style.height = '2.5rem';
        setRows(1);
    };

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
        socket.on("receive_message", (data) => {
            setMessageHistory(prevHistory => [...prevHistory, data]);
        });

        scrollToBottom();

        return () => {
            socket.off("receive_message");
        };
    }, [messageHistory]);

    useEffect(() => {
        socket.on("send_push_notification", (data) => {
            showNotification(data.title, data.message);
        });

        return () => {
            socket.off("send_push_notification");
        };
    }, []);

    function showNotification(title, message) {
        if (Notification.permission === "granted") {
            new Notification(title, {
                body: message,
            });
        }
    }

    useEffect(() => {
        scrollToBottom();
    }, [messageHistory]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    function getTimeByDate(createdAt) {
        const date = new Date(createdAt);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }

    const isSameDay = (date1, date2) => {
        return (
            date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate()
        );
    };

    const renderMessagesWithDates = () => {
        let lastMessageDate = null;

        const formatDate = (date) => {
            const options = { day: 'numeric', month: 'long' };
            return new Intl.DateTimeFormat('ru-RU', options).format(date);
        };

        return messageHistory.map((message, index) => {
            const messageDate = new Date(message.createdAt);
            const showDate = !lastMessageDate || !isSameDay(lastMessageDate, messageDate);

            lastMessageDate = messageDate;

            return (
                <React.Fragment key={index}>
                    {showDate && (
                        <div className={styles.Chat__date}>
                            {formatDate(messageDate)}
                        </div>
                    )}
                    <div className={styles.Chat__message}>
                        {(message.sender.name && message.sender.name === user.name) || message.sender === user.name ? (
                            <div className={`${styles.Chat__message} ${styles.Chat__myMessage}`}>
                                <div style={{ marginBottom: "0.3rem" }}>
                                    {message.text}
                                </div>
                                <div className={`${styles.time}`}>
                                    {getTimeByDate(message.createdAt)}
                                </div>
                            </div>
                        ) : (
                            <div className={`${styles.Chat__message} ${styles.Chat__otherMessage}`}>
                                <div className={styles.messageBox}>
                                    <div className={styles.flexContainer}>
                                        <div className={styles.avatar}>
                                            <img src={"/avatars/" + message.sender_login + ".JPG"} alt="Avatar"/>
                                        </div>
                                        <div className={styles.name}>
                                            {message.sender.name ? message.sender.name : message.sender}
                                        </div>
                                    </div>
                                    <div className={styles.messageText}>
                                        {message.text}
                                    </div>
                                    <div className={styles.time}>
                                        {getTimeByDate(message.createdAt)}
                                    </div>
                                </div>

                            </div>
                        )}
                    </div>
                </React.Fragment>
            );
        });
    };

    const handleTextareaInput = (event) => {
        const textarea = event.target;
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
        setRows(textarea.rows);
    };

    return (
        user
            ? <>
                <CustomNavbar user={user}/>
                <div className={styles.Chat}>
                    <div className={styles.Chat__messages} style={{ animation: 'scroll 0.5s linear' }}>
                        {renderMessagesWithDates()}
                        <div ref={messagesEndRef} />
                    </div>
                    <div className={styles.Chat__input}>
                        <textarea
                            ref={textareaRef}
                            placeholder="Message..."
                            value={message}
                            onChange={(event) => setMessage(event.target.value)}
                            onInput={handleTextareaInput}
                            rows={rows}
                            style={{ margin: "0 0.4rem 2rem 0.4rem", resize: "none", overflow: "hidden" }}
                        />
                        <Button variant="contained" endIcon={<SendIcon />} onClick={sendMessage}
                                style={{ height: "2rem", background: "#524e4e", margin: "auto 0.3rem 2.25rem 0" }} />
                    </div>
                </div>
            </>
            : null
    );
}

export default Chat;
