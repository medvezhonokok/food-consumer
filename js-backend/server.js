const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const mysql = require("mysql2/promise");

require('dotenv').config();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: process.env.SOCKET_IO_ORIGIN,
        methods: ["GET", "POST"],
    },
});

async function connectToDatabase() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });
        console.log("Connected to maria-db");
        return connection;
    } catch (error) {
        console.error("Error connecting to db:", error);
        throw error;
    }
}

connectToDatabase().then(connection => {
    io.on("connection", (socket) => {
        socket.on("get_message_history", async () => {
            try {
                const results = await connection.query("SELECT * FROM messages ORDER BY createdAt ASC");
                socket.emit("message_history", results[0]);
            } catch (error) {
                console.error("Error fetching message history:", error);
            }
        });

        socket.on("send_message", async (data) => {
            try {
                await connection.query(
                    "INSERT INTO messages (text, sender, createdAt) VALUES (?, ?, NOW())",
                    [data.text, data.sender.name]
                );
                io.emit("receive_message", {
                    text: data.text,
                    sender: data.sender,
                    createdAt: new Date()
                });
            } catch (error) {
                console.error("Error saving message:", error);
            }
        });
    });

    server.listen(process.env.SERVER_PORT, () => {
        console.log(`Server is running.`);
    });
}).catch(error => {
    // Handle connection error
});
