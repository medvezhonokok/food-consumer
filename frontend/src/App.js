import React from 'react';
import './App.css';
import * as index from "./index";
import {Button} from "react-bootstrap";
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
                        <h2 className="greetingsHeader">Hello, {user.name}</h2>
                        <div className="mainMenuButtons">
                            <Button className="animatedButton menuButton" href={"/stop_list"}>Stop list</Button>
                            <Button className="animatedButton menuButton" href={'/schedule'}>Schedule</Button>
                            <Button className="animatedButton menuButton" href={'/orders'}>Orders</Button>
                        </div>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio ducimus fuga minima,
                        molestiae repellat sit. Ab dolore harum libero quibusdam?
                        <div className="mainMenuButtons">
                            <Button className="animatedButton menuButton" href={"/check_list"}>Check list</Button>
                            <Button className="animatedButton menuButton" href={"/tasks"}>Tasks</Button>
                            <Button className="animatedButton menuButton" href={'/news'}>News</Button>
                        </div>

                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aliquid aperiam delectus ea earum
                        eligendi inventore iste nesciunt quis repellat reprehenderit temporibus totam, veritatis? Ab
                        accusamus adipisci aliquid animi aperiam consectetur consequuntur culpa deleniti dicta
                        distinctio dolor dolorem exercitationem facilis impedit labore libero magni maiores mollitia
                        natus numquam odit provident quas quibusdam quis quod quos reiciendis, repudiandae sit suscipit
                        voluptate. Ad adipisci amet blanditiis commodi consequatur cupiditate dignissimos dolorem, earum
                        enim expedita explicabo impedit inventore laborum modi molestiae, nesciunt non officiis
                        possimus, quaerat recusandae reiciendis reprehenderit vitae! Assumenda corporis dolorem fugiat
                        nostrum!
                    </div>
                    <Button onClick={() => index.logout()}>Log out</Button>
                    <BottomNavBar user={user}/>
                </div>
                :
                <LoginForm/>}
        </>
    );
}

export default App;
