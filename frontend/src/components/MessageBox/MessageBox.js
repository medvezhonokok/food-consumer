import React from 'react';
import './MessageBox.css';

function getMessageTime(messageDateTime) {
    const date = new Date(messageDateTime);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

const MessageBox = ({isMyMessage, text, time, login, name}) => {
    const messageClass = isMyMessage ? 'myMessage' : 'notMyMessage';
    const avatarPath = `/avatars/${login}.JPG`;

    return (
        <div className={`messageBox ${messageClass}`}>
            {!isMyMessage && (
                <div className="messageBoxHeader">
                    <img src={avatarPath} alt="Avatar" className="avatar"/>
                    <div className="authorName">
                        {name}
                    </div>
                </div>
            )}
            <div>
                <div className="messageText">{text}</div>
                <div className="time">{getMessageTime(time)}</div>
            </div>
        </div>
    );
};

export default MessageBox;
