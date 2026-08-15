import { io } from "socket.io-client";

let socket = null;

export const connectSocket = (userId) => {
  socket = io(
    import.meta.env.MODE === "development"
      ? "http://localhost:4000"
      : "https://talkie-yznx.onrender.com",
    {
      query: { userId },
      withCredentials: true,
      transports: ["websocket", "polling"], // ✅ Cross-domain WebSocket reliability fix
    }
  );

  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
// import { io } from "socket.io-client";

// let socket = null;

// export const connectSocket = (userId) => {
//   socket = io(
//     import.meta.env.MODE === "development"
//       ? "http://localhost:4000"
//       : import.meta.env.VITE_SOCKET_URL,
//     {
//       query: { userId },
//       withCredentials: true,
//     }
//   );

//   return socket;
// };

// export const getSocket = () => socket;

// export const disconnectSocket = () => {
//   if (socket) {
//     socket.disconnect();
//     socket = null;
//   }
// };

