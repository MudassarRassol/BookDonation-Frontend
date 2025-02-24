import React, { useState } from "react";
import ConversationList from "./ConversationList";
import ChatWindow from "./ChatWindow";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

const ChatPage = () => {
    const [selectedConversation, setSelectedConversation] = useState(null);

    return (
        <div className="flex h-[87.4vh]  overflow-hidden">
            {/* Left Sidebar: Conversations */}
            <div className={`w-full md:w-1/4   border-r lg:block ${selectedConversation ? 'hidden' : 'block'} md:w-1/3 sm:w-full`}>
                <ConversationList setSelectedConversation={setSelectedConversation} />
            </div>

            {/* Right Side: Chat Window */}
            <div className={`flex-1 ${selectedConversation ? 'block' : 'hidden'} lg:block`}>
                {selectedConversation ? (
                    <div className="relative h-full ">
                        {/* Back Button for Small Screens */}
                        <button
                            onClick={() => setSelectedConversation(null)}
                            className="absolute top-4 right-4  p-2 rounded-full lg:hidden"
                        >
                            <ArrowLeftIcon className="w-6 h-6 " />
                        </button>
                        <ChatWindow conversation={selectedConversation} />
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-full">
                        Select a conversation to start chatting
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatPage;
