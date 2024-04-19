import React, {useRef, useState} from 'react';
import './ChatInput.css';
import {Button} from "react-bootstrap";
import io from "socket.io-client";
import {IoArrowUpCircleSharp} from "react-icons/io5";
import * as constants from "../../constants/constants";
import NotFoundPage from "../NotFoundPage/NotFoundPage";

const ChatInput = ({user}) => {
    const socket = io.connect(constants.BACKEND_JS_URL);

    const textareaRef = useRef(null);
    const [rows, setRows] = useState(1);
    const [message, setMessage] = useState("");
    const ensureTextAreaHeight = (event) => {
        const textarea = event.target;
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
        setRows(textarea.rows);
    };

    const sendMessage = () => {
        if (!message.trim()) {
            return;
        }
        socket.emit("send_message", {
            text: message.trim(),
            authorId: user.id,
            senderName: user.name,
            senderLogin: user.login
        });
        setMessage("");
        textareaRef.current.style.height = '2.5rem';
        setRows(1);
    };

    return (user
            ? <div className="inputContainer">
                <textarea
                    className="inputMessage"
                    ref={textareaRef}
                    placeholder="Message"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    onInput={ensureTextAreaHeight}
                    rows={rows}
                />
                <Button className="animatedButton sentButton" onClick={sendMessage}>
                    <IoArrowUpCircleSharp/>
                </Button>
            </div>
            : <NotFoundPage/>
    )
};

export default ChatInput;
