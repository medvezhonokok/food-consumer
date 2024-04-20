import React from 'react';
import './App.css';
import * as index from "./index";
import {
    EditOutlined,
    HddOutlined,
    HomeFilled,
    InstagramOutlined,
    ScheduleOutlined,
    StopOutlined,
    UnorderedListOutlined
} from '@ant-design/icons';
import {Button} from 'antd';
import LoginForm from "./components/LoginForm/LoginForm";
import {Link} from "react-router-dom";
import BottomNavBar from "./components/BottomNavBar/BottomNavBar";

const App = () => {
    const user = index.getUser();

    return (
        <>
            {user
                ? <div className="centeredContent">
                    <div className="avatarContainer">
                        <Link to="/profile">
                            <img className="animatedButton smallAvatar" src={"/avatars/" + user.login + ".JPG"}
                                 alt={"Avatar"}/>
                        </Link>
                    </div>
                    <div className="content">
                        <h2 className="greetingsHeader"><HomeFilled/> Hello, {user.name}</h2>
                        <div className="mainMenuButtons">
                            <Button className="animatedButton menuButton" href={"/stop_list"} icon={<StopOutlined/>}>Stop
                                List</Button>
                            <Button className="animatedButton menuButton" href={'/schedule'}
                                    icon={<ScheduleOutlined/>}>Schedule</Button>
                            <Button className="animatedButton menuButton" href={'/orders'}
                                    icon={<EditOutlined/>}>Orders</Button>
                        </div>
                        <div className="mainMenuButtons">
                            <Button className="animatedButton menuButton" href={"/check_list"}
                                    icon={<UnorderedListOutlined/>}>Check List</Button>
                            <Button className="animatedButton menuButton" href={"/tasks"}
                                    icon={<HddOutlined/>}>Tasks</Button>
                            <Button className="animatedButton menuButton" href={'/news'}
                                    icon={<InstagramOutlined/>}>News</Button>
                        </div>
                    </div>
                    <BottomNavBar user={user}/>
                </div>
                :
                <LoginForm/>}
        </>
    );
}

export default App;
