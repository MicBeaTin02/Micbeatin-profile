import React from 'react';

interface ChatBotProps {
  messages: string[];
  setMessages: (messages: string[]) => void;
  inputMessage: string;
  setInputMessage: (message: string) => void;
  handleSendMessage: () => void;
  handleCloseChatBot: () => void;
}

const ChatBot: React.FC<ChatBotProps> = ({
  messages,
  setMessages,
  inputMessage,
  setInputMessage,
  handleSendMessage,
  handleCloseChatBot,
}) => {
  return (
    <div className="fixed bottom-4 right-4 w-80 bg-gray-800 bg-opacity-80 backdrop-blur-md text-white p-4 rounded-xl shadow-lg">
      <h2 className="text-xl font-bold mb-4">AI Chat</h2>
      <button
        className="absolute top-4 right-4 text-white"
        onClick={handleCloseChatBot}
      >
        &times;
      </button>
      <div className="mb-4 max-h-40 overflow-y-auto">
        {messages.map((message, index) => (
          <div key={index} className="mb-2">
            <p className="text-sm">{message}</p>
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          className="flex-1 px-3 py-2 border rounded-lg bg-gray-700 text-white"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <button
          className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
