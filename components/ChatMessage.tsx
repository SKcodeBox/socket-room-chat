import React from 'react';

interface ChatMessageProps {
    sender: string;
    message: string;
    isOwnMessage: boolean;
}

export const ChatMessage = ({ sender, message, isOwnMessage }: ChatMessageProps) => {
    const isSystemMessage = sender === 'system';

    return (
        <div>
            <div>
                {!isSystemMessage && (
                    <p>{isOwnMessage ? 'you:' : `${sender}:`}</p>
                )}
                <p>{message}</p>
            </div>
        </div>
    );
};
