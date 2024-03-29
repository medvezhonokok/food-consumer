const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const mysql = require("mysql2");

require('dotenv').config();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: process.env.SOCKET_IO_ORIGIN,
        methods: ["GET", "POST"],
    },
});

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});


connection.connect((err) => {
    if (err) {
        console.error("Error connecting to db:", err);
        return;
    }
    console.log("Connected to db");
});

io.on("connection", (socket) => {
    socket.on("get_message_history", () => {
        connection.query("SELECT * FROM messages ORDER BY createdAt ASC", (err, results) => {
            if (err) {
                console.error("Error fetching message history:", err);
                return;
            }
            socket.emit("message_history", results);
        });
    });

    socket.on("send_message", (data) => {
        connection.query(
            "INSERT INTO messages (text, sender, createdAt) VALUES (?, ?, NOW())",
            [data.text, data.sender.name],
            (err, results) => {
                if (err) {
                    console.error("Error saving message:", err);
                    return;
                }

                io.emit("receive_message", {
                    text: data.text,
                    sender: data.sender,
                    createdAt: new Date()
                });
            }
        );
    });
});

server.listen(process.env.SERVER_PORT, () => {
    console.log(`Server is running on port ${process.env.SERVER_PORT}`);
});
