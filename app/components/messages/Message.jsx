import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import { FaUserCircle } from "react-icons/fa";

const Message = ({ message }) => {
	const { authUser } = useAuthContext();
	
	const fromMe = message.sender === authUser?.username;
	const formattedTime = extractTime(message.createdAt);
	const chatClassName = fromMe ? "chat-end" : "chat-start";


	const senderName = fromMe ?  'You'  : message.sender;
	const bubbleBgColor = fromMe ? "bg-blue-500" : "";

	const shakeClass = message?.shouldShake ? "shake" : "";


	return (
		<div className={`chat ${chatClassName}`}>
			<div className='chat-image avatar'>
				<div className='w-10 rounded-full'>
					<FaUserCircle className="w-10 h-10 text-white"/>
				</div>
			</div>
			<div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2 relative pt-4`}>
				<span className="absolute text-xs top-1 left-4 text-9px">{senderName}</span>
				{message.text}
				</div>
			<div className='chat-footer opacity-50 text-xs flex gap-1 items-center text-white'>{formattedTime}</div>
		</div>
	);
};
export default Message;
