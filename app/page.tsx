"use client"
import { ChatForm } from "@/components/ChatForm";
import { ChatMessage } from "@/components/ChatMessage";
import { useEffect, useState } from "react";
import { socket } from "@/lib/socketClient";
import "./page.css";

export default function Home() {
  const [room, setRoom] = useState("");
  const [joined, setJoined] = useState(false);
  const [messages, setMessages] = useState<{ sender: string; message: string }[]>([]);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    socket.on("message", (data: { sender: string; message: string }) => {
      setMessages((prev) => [...prev, data]);
    });

    socket.on("user_joined", (message: string) => {
      setMessages((prev) => [...prev, { sender: "system", message }]);
    });

  return () => {
    socket.off("user_joined");
    socket.off("message");
  };
  }, []);

  const handleJoinRoom = () => {
    if(room && userName) {
      socket.emit("join-room", { room, username: userName });
    setJoined(true);
    }
  };

  const handleSendMessage = (message: string) => {
    const data = { room, message, sender: userName };
    setMessages((prev) => [...prev, { sender: userName, message }]);
    socket.emit("message", data);
  };
  
  return (
    <div className="container">
       <i style={{ "--clr": "#11d5db" }}></i>
       <i style={{ "--clr": "#d51ae6" }}></i>
       <i style={{ "--clr": "#0ce289" }}></i>
       
      {!joined ? (
        <div className="box">
          <h2 className="h1">チャットルーム</h2>
          <div className="inputBx">
          <input
            type="text"
            placeholder="ユーザー名を入力"
            value={userName}
            onChange={(e) => setUserName(e.target.value)} 
          />
          </div>
          <div className="inputBx">
          <input 
            type="text"
            placeholder="部屋番号を入力"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
          </div>
          <div className="inputBx">
          <input
            type="submit"
            value="join"
            onClick={handleJoinRoom}
          />
        </div>
        </div>
      ) : (
        <div className="chat-room">
          <h1 className="h1">Room: {room}</h1>
          <div className="message">
            {messages.map((msg, index) => (
              <ChatMessage
                key={index}
                sender={msg.sender}
                message={msg.message}
                isOwnMessage={msg.sender === userName}
              />
            ))}
          </div>
          <ChatForm onSendMessage={handleSendMessage} />
        </div>
      )}
    </div>
  );
}
