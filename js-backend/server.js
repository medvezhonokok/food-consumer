const express = require("express");
const app = express();
const http = require("http");
const {Server} = require("socket.io");
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
        const pool = await mysql.createPool({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });
        console.log("Connected to maria-db");
        return pool;
    } catch (error) {
        console.error("Error connecting to db:", error);
        throw error;
    }
}

connectToDatabase().then(pool => {
    io.on("connection", (socket) => {
        socket.on("get_message_history", async () => {
            try {
                const connection = await pool.getConnection();
                const [results] = await connection.query("SELECT message.*, sender.login AS sender_login, sender.name AS sender_name FROM message LEFT JOIN user AS sender ON message.user_id = sender.id ORDER BY message.creation_time ASC");
                connection.release();
                socket.emit("message_history", results);
            } catch (error) {
                console.error("Error fetching message history:", error);
            }
        });

        socket.on("send_message", async (data) => {
            try {
                const connection = await pool.getConnection();
                await connection.query(
                    "INSERT INTO message (text, user_id, creation_time) VALUES (?, ?, NOW())",
                    [data.text, data.authorId]
                );
                connection.release();
                io.emit("receive_message", {
                    text: data.text,
                    creation_time: new Date(),
                    sender_name: data.senderName,
                    sender_login: data.senderLogin
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
