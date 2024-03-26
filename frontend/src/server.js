const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const mysql = require("mysql2");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://5.101.51.223:8000",
        methods: ["GET", "POST"],
    },
});

const connection = mysql.createConnection({
    host: 'maria-db',
    port: '3306',
    user: 'food-consumer',
    password: '67b7f471fa16819e',
    database: 'food-consumer'
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

server.listen(3001, () => {
    console.log("SERVER IS RUNNING");
});
