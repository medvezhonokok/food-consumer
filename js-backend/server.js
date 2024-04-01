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
                const [results] = await connection.query("SELECT * FROM messages ORDER BY createdAt ASC");
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
                    "INSERT INTO messages (text, sender, createdAt) VALUES (?, ?, NOW())",
                    [data.text, data.sender.name]
                );
                connection.release();
                io.emit("receive_message", {
                    text: data.text,
                    sender: data.sender,
                    createdAt: new Date()
                });

                io.emit("send_push_notification", {
                    title: `new by ${data.sender.name}`,
                    message: `text is ${data.text}`
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
