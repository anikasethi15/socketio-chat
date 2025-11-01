import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // allow all for simplicity
  },
});

io.on("connection", (socket) => {
  console.log("🟢 User connected:", socket.id);

  // Receive and broadcast message
  socket.on("chatMessage", (data) => {
    io.emit("chatMessage", data); // send to all clients
  });

  socket.on("disconnect", () => {
    console.log("🔴 User disconnected:", socket.id);
  });
});

const PORT = 5000;
server.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
