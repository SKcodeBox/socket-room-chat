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
    <form onSubmit={handleSubmit} className=''>
        <input 
        type='text' 
        onChange={(e) => setMessage(e.target.value)}
        className='' 
        placeholder='メッセージを送信'
        />
        <button type="submit" className="">
            送信
        </button>
    </form>
  );
};
