import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Tasks from "../Tasks/Tasks";
import CustomNavbar from "../CustomNavbar/CustomNavbar";

function App() {
    return (
        <div className="App">
            <CustomNavbar/>
            <Tasks/>
        </div>
    );
}

export default App;
