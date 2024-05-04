import { useContext, useState } from "react";
import ChatRoom from "../../components/ChatRoom";
import GetUser from "../../components/GetUser";
import httpRequest from "../../httpRequest";
import userContext from "../../context/user-context";
import "./Home.css";

const Home = () => {
  const userCtx = useContext(userContext);
  const [chatRoomId, setChatRoomId] = useState(null);
  const [userId, setUserId] = useState(null);

  const startChat = async (userId) => {
    try {
      const resp = await httpRequest.post("http://localhost:5000/start_chat", {
        user_id_1: userCtx.userId,
        user_id_2: userId,
      });
      setUserId(userId)
      setChatRoomId(resp.data.chatroom_id);
    } catch (error) {
      console.error("Chyba při zahájení chatu:", error);
    }
  };

  return (
    <div className="black-background">
      <div className="gray-box">
      <ChatRoom chatRoomId={chatRoomId} userId={userId} />
        <GetUser onStartChat={startChat} />
        <ChatRoom />
      </div>
    </div>
  );
};

export default Home;
