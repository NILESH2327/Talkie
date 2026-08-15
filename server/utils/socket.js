import { Server } from "socket.io";

const userSocketMap = {}; // userId -> socketId
let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL || "https://talkie-two-amber.vercel.app",
      credentials: true,
      methods: ["GET", "POST"],
    },
    transports: ["websocket", "polling"], // ✅ Deployment handshakes stability ke liye
  });

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    const userId = socket.handshake.query.userId;

    if (userId) {
      userSocketMap[userId] = socket.id;
    }

    // send online users list to everyone
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);

      if (userId) delete userSocketMap[userId];

      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
  });
};

export const getReceiverSocketId = (userId) => {
  return userSocketMap[userId];
};

export { io };