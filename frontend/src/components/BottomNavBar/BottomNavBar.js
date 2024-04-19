import React from 'react';
import './BottomNavBar.css';
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import {Button} from "react-bootstrap";
import {IoBody, IoChatbubblesSharp, IoHome, IoPeopleCircle} from "react-icons/io5";

const BottomNavBar = ({user}) => {
    return (
        user ?
            <div className="bottomNavBar">
                <Button className="animatedButton button" href={'users'}><IoPeopleCircle/></Button>
                <Button className="animatedButton button" href={'/'}><IoHome/></Button>
                <Button className="animatedButton button" href={'chat'}><IoChatbubblesSharp/></Button>
                <Button className="animatedButton button" href={'profile'}><IoBody/></Button>
            </div>
            : <NotFoundPage/>
    );
};
export default BottomNavBar;
