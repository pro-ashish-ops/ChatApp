import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import { connectDB } from "./lib/db.js";
import userRouter from "./routes/userRoutes.js";
import messageRouter from "./routes/messageRoutes.js";
import { Server } from "socket.io";


// Create Express app and HTTP server
const app = express();
const server = http.createServer(app); // we are using http.createServer as socket.io is http server

// initialize socket.io server

export const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

// store online users
export const userSocketMap = {}; // { userId: socketId }

// socket.io connection handler
io.on("connection", (socket) => {
    // const userId  = socket.handshake.query;
    const userId  = socket.handshake.query.userId;// changed for error
    console.log("User Connected:", userId);
    console.log("User Connected:", socket.handshake.query);// changed for error

    // if(userId)userSocketMap[userId] = socket.id; 
    if (userId) userSocketMap[String(userId)] = socket.id;// changed for error



    // emit online users to all connected client
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        console.log("User Disconnected:", userId);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

//  Middleware setup 
app.use(express.json({limit: "4mb"}));
app.use(cors());
app.use(express.urlencoded({ extended: true }));


// // app.use("/",(req,res)=> res.send("Home Page"));

// route setup
app.use("/api/status",(req, res) => res.send("Server is Live"));
app.use("/api/auth", userRouter, (req, res) => {
    res.send("User Router is working");
    console.log("User Router is working");
});
app.use("/api/messages", messageRouter, (req, res) => {
    res.send("Message Router is working");
    console.log("Message Router is working");
});

// connect to mongodb

await connectDB();

const PORT = process.env.PORT || 5000;
server.listen(PORT, ()=> console.log(`server is running on PORT : ${PORT}`));