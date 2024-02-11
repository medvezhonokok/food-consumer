import React, {useState} from 'react';
import {List} from "react-bootstrap-icons";
import {Button} from "react-bootstrap";
import SideMenu from "../SideMenu/SideMenu";

const MenuButton = () => {
    const [showMenu, setShowMenu] = useState(false);
    return (
        <>
            <Button variant={"outline-primary"} onClick={() => setShowMenu(!showMenu)}><List/></Button>
            <SideMenu show={showMenu} onClose={() => setShowMenu(false)}/>
        </>
    );
}


export default MenuButton;
