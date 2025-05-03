"use client"
import React, { useState } from "react";

export const ChatForm = ({
    onSendMessage,
    } : {
    onSendMessage: (message: string) => void;
    }) => {
    const [message, setMessage] = useState("");
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (message.trim() !== "") {
            onSendMessage(message);
            setMessage("");
        }
    };

  return (
    <form onSubmit={handleSubmit} className='chat-form' style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
        <input 
        type='text' 
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className='' 
        placeholder='メッセージを送信'
        style={{
            flex: 1,
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            background: "#fff",
            color: "#000"
          }}
        />
        <button type="submit" style={{ padding: "10px 16px", borderRadius: "8px", background: "#04abec", color: "#fff", border: "none" }}>
            送信
        </button>
    </form>
  );
};
