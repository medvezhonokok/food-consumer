import React from 'react';
import './BottomNavBar.css';
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import {Button} from "react-bootstrap";
import {ContactsFilled, MehFilled, MessageFilled} from '@ant-design/icons';

const BottomNavBar = ({user}) => {
    return (
        user ?
            <div className="bottomNavBar">
                <Button className="animatedButton button" href={'users'}><ContactsFilled/></Button>
                <Button className="animatedButton button" href={'chat'}><MessageFilled/></Button>
                <Button className="animatedButton button" href={'profile'}><MehFilled/></Button>
            </div>
            : <NotFoundPage/>
    );
};
export default BottomNavBar;
