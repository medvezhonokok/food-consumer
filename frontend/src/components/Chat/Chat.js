import React, { useEffect, useRef, useState } from 'react';
import styles from './Chat.module.css';
import io from "socket.io-client";
import CustomNavbar from "../CustomNavbar/CustomNavbar";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

const socket = io.connect(process.env.REACT_APP_SOCKET_URL);

const Chat = ({ user }) => {
    const [message, setMessage] = useState("");
    const [messageHistory, setMessageHistory] = useState([]);
    const messagesEndRef = useRef(null);

    const sendMessage = () => {
        if (!message.trim()) {
            return;
        }
        socket.emit("send_message", { text: message.trim(), sender: user });
        setMessage("");
    };

    useEffect(() => {
        Notification.requestPermission().then(permission => {
            console.log('Notification permission:', permission);
        });

        socket.emit("get_message_history");
        socket.on("message_history", (history) => {
            setMessageHistory(history);
        });

        return () => {
            socket.off("message_history");
        };
    }, []);

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessageHistory(prevHistory => [...prevHistory, data]);
            sendBrowserNotification(data);
        });

        scrollToBottom();

        return () => {
            socket.off("receive_message");
        };
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

    const sendBrowserNotification = (message) => {
        if (Notification.permission === 'granted') {
            new Notification('Новое сообщение', {
                body: message.text,
            });
        }
    };

    return (
        <>
            <CustomNavbar user={user}/>
            <div className={styles.Chat}>
                <div className={styles.Chat__messages} style={{ animation: 'scroll 0.5s linear' }}>
                    {messageHistory.map((message, index) => (
                        <div key={index} className={styles.Chat__message}>
                            {((message.sender.name && message.sender.name === user.name) || message.sender === user.name) ? (
                                <>
                                    <div className={`${styles.Chat__myMessage}`}>
                                        <div style={{ marginBottom: "0.3rem" }}>
                                            {message.text}
                                        </div>
                                        <div className={`${styles.time}`}>
                                            {getTimeByDate(message.createdAt)}
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className={`${styles.Chat__otherMessage}`}>
                                    <div className={`${styles.author}`}>
                                        {(message.sender.name ? message.sender.name : message.sender)}
                                    </div>
                                    <div>
                                        {message.text}
                                    </div>
                                    <div className={`${styles.time}`}>
                                        {getTimeByDate(message.createdAt)}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                    <div ref={messagesEndRef}/>
                </div>
                <div className={styles.Chat__input}>
                    <textarea
                        placeholder="Message..."
                        value={message}
                        onChange={(event) => {
                            setMessage(event.target.value);
                        }}
                    />
                    <Button variant="contained" endIcon={<SendIcon/>} onClick={sendMessage}/>
                </div>
            </div>
        </>
    );
}

export default Chat;
