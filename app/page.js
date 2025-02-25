"use client";
import { useState, useEffect, useRef } from "react";
import { useSocket } from "../app/hooks/useSocket";
import { useAuthContext } from "../app/context/AuthContext";
import { BiLogOut } from "react-icons/bi";
import Message from "./components/messages/Message";

const Home = () => {
  const room = "General";
  const {setAuthUser,  authUser } = useAuthContext()


  const { messages, sendMessage } = useSocket(room, authUser?.username, authUser?.token);

  const lastMessageRef = useRef();

	useEffect(() => {
		setTimeout(() => {
			lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
		}, 100);
	}, [messages]);


  const [message, setMessage] = useState("");

  const logout = () =>{
    localStorage.removeItem("user-info")
    setAuthUser(null)
  }

  const handleSend = () => {
    if (message.trim()) {
      sendMessage(message);
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-xl font-bold mb-4 text-[#fff]">Chat Room: {room}</h1>
      <h2 className="text-xl font-bold mb-4 text-[#fff]">Hi {authUser?.username}</h2>
      <div className="border p-4 w-96 h-64 overflow-y-auto">
        {messages && messages.map((msg, index) => (
          <div key={index} ref={lastMessageRef}>
          <Message message={msg} />
        </div>
          // <p key={index} className="text-sm text-[#fff]">
          //   <strong>{msg.sender}:</strong> {msg.text} <small>({msg.createdAt})</small>
          // </p>

        ))}
      </div>
      <div className="mt-4 flex">
        <input
          type="text"
          className="border p-2"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="bg-blue-500 text-white px-4 ml-2" onClick={handleSend}>
          Send
        </button>
      </div>

      <div onClick={logout} className="mt-4 flex items-center gap-2 bg-blue-500 text-white cursor-pointer px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
        <button className="text-lg font-medium">Logout</button>
        <BiLogOut className="w-6 h-6" />
      </div>


    </div>
  );
};
export default Home;
