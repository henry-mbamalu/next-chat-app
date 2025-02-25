// "use client";
// import { useState, useEffect, useRef } from "react";
// import { useSocket } from "../app/hooks/useSocket";
// import { useAuthContext } from "../app/context/AuthContext";
// import { BiLogOut } from "react-icons/bi";
// import Message from "./components/messages/Message";

// const Home = () => {
//   const room = "General";
//   const { setAuthUser, authUser } = useAuthContext()


//   const { messages, sendMessage } = useSocket(room, authUser?.username, authUser?.token);

//   const lastMessageRef = useRef();

//   useEffect(() => {
//     setTimeout(() => {
//       lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
//     }, 100);
//   }, [messages]);


//   const [message, setMessage] = useState("");

//   const logout = () => {
//     if (typeof window !== "undefined") {
//       localStorage.removeItem("user-info");
//       setAuthUser(null);
//     }
//   }

//   const handleSend = () => {
//     if (message.trim()) {
//       sendMessage(message);
//       setMessage("");
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-screen">
//       <h1 className="text-xl font-bold mb-4 text-[#fff]">Chat Room: {room}</h1>
//       <h2 className="text-xl font-bold mb-4 text-[#fff]">Hi {authUser?.username}</h2>
//       <div className="border p-4 w-96 h-64 overflow-y-auto">
//         {messages && messages.map((msg, index) => (
//           <div key={index} ref={lastMessageRef}>
//             <Message message={msg} />
//           </div>
//         ))}
//       </div>
//       <div className="mt-4 flex">
//         <input
//           type="text"
//           className="border p-2"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         />
//         <button className="bg-blue-500 text-white px-4 ml-2" onClick={handleSend}>
//           Send
//         </button>
//       </div>

//       <div onClick={logout} className="mt-4 flex items-center gap-2 bg-blue-500 text-white cursor-pointer px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
//         <button className="text-lg font-medium">Logout</button>
//         <BiLogOut className="w-6 h-6" />
//       </div>


//     </div>
//   );
// };
// export default Home;


"use client";
import { useState, useEffect, useRef } from "react";
import { useSocket } from "../app/hooks/useSocket";
import { useAuthContext } from "../app/context/AuthContext";
import { BiLogOut } from "react-icons/bi";
import Message from "./components/messages/Message";

const rooms = ["General", "Tech", "Gaming", "Sports", "Music"];

const Home = () => {
  const { setAuthUser, authUser } = useAuthContext();
  const [currentRoom, setCurrentRoom] = useState("");
  const { messages, sendMessage } = useSocket(currentRoom, authUser?.username, authUser?.token);
  const lastMessageRef = useRef();
  const [message, setMessage] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

   const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("user-info");
      setAuthUser(null);
    }
  };

  const handleSend = () => {
    if (message.trim()) {
      sendMessage(message);
      setMessage("");
    }
  };

  return (
    // <div className="flex h-screen">
    //   {/* Sidebar */}
    //   <div className="w-64 bg-gray-900 text-white p-4">
    //     <h2 className="text-xl font-bold mb-4">Chat Rooms</h2>
    //     <ul>
    //       {rooms.map((room) => (
    //         <li
    //           key={room}
    //           className={`cursor-pointer p-2 mb-2 rounded-lg hover:bg-gray-700 transition ${
    //             currentRoom === room ? "bg-gray-700" : ""
    //           }`}
    //           onClick={() => setCurrentRoom(room)}
    //         >
    //           {room}
    //         </li>
    //       ))}
    //     </ul>
    //     <div
    //       onClick={logout}
    //       className="mt-4 flex items-center gap-2 bg-blue-500 text-white cursor-pointer px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
    //     >
    //       <button className="text-lg font-medium">Logout</button>
    //       <BiLogOut className="w-6 h-6" />
    //     </div>
    //   </div>

    //   {/* Chat Area */}
    //   <div className="flex flex-col flex-1 items-center justify-center p-4">
    //     <h1 className="text-xl font-bold mb-4 text-white">Chat Room: {currentRoom}</h1>
    //     <h2 className="text-xl font-bold mb-4 text-white">Hi {authUser?.username}</h2>
    //     <div className="border p-4 w-96 h-64 overflow-y-auto bg-gray-800 text-white rounded-lg">
    //       {messages &&
    //         messages.map((msg, index) => (
    //           <div key={index} ref={lastMessageRef}>
    //             <Message message={msg} />
    //           </div>
    //         ))}
    //     </div>
    //     <div className="mt-4 flex">
    //       <input
    //         type="text"
    //         className="border p-2 w-72 rounded-lg"
    //         value={message}
    //         onChange={(e) => setMessage(e.target.value)}
    //       />
    //       <button className="bg-blue-500 text-white px-4 ml-2 rounded-lg" onClick={handleSend}>
    //         Send
    //       </button>
    //     </div>
    //   </div>
    // </div>

    <div className="flex h-screen">
      {/* Sidebar for larger screens */}
      <div className="hidden md:block w-64 bg-gray-900 text-white p-4">
        <h2 className="text-xl font-bold mb-4">Chat Rooms</h2>
        <ul>
          {rooms.map((room) => (
            <li
              key={room}
              className={`cursor-pointer p-2 mb-2 rounded-lg hover:bg-gray-700 transition ${currentRoom === room ? "bg-gray-700" : ""
                }`}
              onClick={() => setCurrentRoom(room)}
            >
              {room}
            </li>
          ))}
        </ul>
        <div
          onClick={logout}
          className="mt-4 flex items-center gap-2 bg-blue-500 text-white cursor-pointer px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          <button className="text-lg font-medium">Logout</button>
          <BiLogOut className="w-6 h-6" />
        </div>
      </div>

      {/* Sidebar for mobile */}
      <div className="md:hidden bg-gray-900 text-white p-4 w-full fixed top-0 left-0 flex justify-between items-center">
        <h2 className="text-lg font-bold">Chat Rooms</h2>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white">
          ☰
        </button>
      </div>

      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 flex z-50">
          <div className="w-64 bg-gray-900 text-white p-4 h-full">
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-white text-xl mb-4"
            >
              ✖
            </button>
            <ul>
              {rooms.map((room) => (
                <li
                  key={room}
                  className={`cursor-pointer p-2 mb-2 rounded-lg hover:bg-gray-700 transition ${currentRoom === room ? "bg-gray-700" : ""
                    }`}
                  onClick={() => {
                    setCurrentRoom(room);
                    setSidebarOpen(false);
                  }}
                >
                  {room}
                </li>
              ))}
            </ul>
          </div>

          <div
            onClick={() => {
              logout();
              setSidebarOpen(false);
            }}
            className="mt-4 flex items-center gap-2 bg-blue-500 text-white cursor-pointer px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            <button className="text-lg font-medium">Logout</button>
            <BiLogOut className="w-6 h-6" />
          </div>
        </div>
      )}

      {/* Chat Area */}
      <div className="flex flex-col flex-1 items-center justify-center p-4 mt-12 md:mt-0">
        {currentRoom === "" ? (
          <div className="border p-4 w-full md:w-96 h-64 overflow-y-auto bg-gray-800 text-white rounded-lg flex items-center justify-center text-center">
          <h1 className="text-lg md:text-xl font-bold mb-4">
            Select a chat room to start a conversation
          </h1>
        </div>
        
        ) : (
          <>
            <h1 className="text-lg md:text-xl font-bold mb-4 text-white">
              Chat Room: {currentRoom}
            </h1>
            <h2 className="text-lg md:text-xl font-bold mb-4 text-white">
              Hi {authUser?.username}
            </h2>
            <div className="border p-4 w-full md:w-96 h-64 overflow-y-auto bg-gray-800 text-white rounded-lg">
              {messages &&
                messages.map((msg, index) => (
                  <div key={index} ref={lastMessageRef}>
                    <Message message={msg} />
                  </div>
                ))}
            </div>
            <div className="mt-4 flex w-full md:w-auto">
              <input
                type="text"
                className="border p-2 w-full md:w-72 rounded-lg"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button className="bg-blue-500 text-white px-4 ml-2 rounded-lg" onClick={handleSend}>
                Send
              </button>
            </div>
          </>
        )}
      </div>

    </div>

  );
};

export default Home;
