"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const SOCKET_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const useSocket = (room, username, token) => {
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (!username || !room || !token) return;


        const newSocket = io(SOCKET_URL, {
            auth: { token: `Bearer ${token}` },
            transports: ["websocket"],
        });

        setSocket(newSocket);

        newSocket.emit("joinRoom", { username, room });

        newSocket.emit("getMessages", { room });


        newSocket.on("message", (message) => {
            console.log(message)
             if (message.data?.sender && message.data?.text) {
                setMessages((prev) => [...prev, {...message.data, shouldShake: true}]); 
                if (message.data?.sender !== username) {
                    toast.success(`${message.data?.sender}: ${message.data.text}`);
                }   
            }

            if ( message.data?.message && message.data?.username) {
                if (message.data?.username != username) {
                    toast.success(message.data?.message); 
                }
                
            }
        });

        newSocket.on("messages", (response) => {
            setMessages(response);
        });

        return () => {
            newSocket.emit("leaveRoom", { username, room });
            newSocket.disconnect();
        };
    }, [room, username, token]);

    const sendMessage = (text) => {
        if (socket) {
            socket.emit("sendMessage", {
                sender: username,
                text,
                timestamp: new Date().toISOString(),
            });
            console.log(text)
        }
    };

    return { socket, messages, sendMessage };
};
