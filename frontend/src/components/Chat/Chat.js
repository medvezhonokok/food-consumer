import React from 'react';
import './Chat.css';
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import ChatInput from "../ChatInput/ChatInput";
import Messages from "../Messages/Messages";

const Chat = ({user}) => {
    return (
        user ?
            <div>
                <div className="chat">
                    <Messages user={user}/>
                    <ChatInput user={user}/>
                </div>
            </div>
            : <NotFoundPage/>
    )
};

export default Chat;
