import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000", {
    withCredentials: true,
});

const ConversationList = ({ setSelectedConversation }) => {
    const [conversations, setConversations] = useState([]);
    const [loading, setLoading] = useState(true);
    const { userid } = useSelector((state) => state.user);
    const fetchConversations = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:3000/api/messages/getconversation", {
                withCredentials: true,
            });
            setConversations(response.data.conversations);
        } catch (error) {
            console.error("Error fetching conversations:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchConversations();
    }, []);

    useEffect(() => {
        if (userid) {
            socket.emit("joinUser", userid);
        }
    }, [userid]);

    useEffect(() => {
        socket.on("userOnline", (userId) => {
            setConversations((prevConversations) =>
                prevConversations.map((conversation) =>
                    conversation.receiverId === userId
                        ? { ...conversation, isOnline: true }
                        : conversation
                )
            );
        });

        socket.on("userOffline", (userId) => {
            setConversations((prevConversations) =>
                prevConversations.map((conversation) =>
                    conversation.receiverId === userId
                        ? { ...conversation, isOnline: false }
                        : conversation
                )
            );
        });

        socket.on("updateLastMessage", (data) => {
            setConversations((prevConversations) =>
                prevConversations.map((conversation) =>
                    conversation._id === data.conversationId
                        ? { ...conversation, lastMessage: data.lastMessage }
                        : conversation
                )
            );
        });

        return () => {
            socket.off("userOnline");
            socket.off("userOffline");
            socket.off("updateLastMessage");
        };
    }, []);

    return (
        <div className="p-4 h-[88vh]">
            <h2 className="text-lg font-bold mb-4">Chats</h2>
            {loading ? (
                <div className="flex justify-center items-center h-full">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
                </div>
            ) : (
                <div className="flex flex-col gap-4">
                    {conversations.map((chat) => (
                        <div
                            key={chat._id}
                            className="flex items-center p-3 cursor-pointer hover:bg-gray-200 rounded-lg"
                            onClick={() => setSelectedConversation(chat)}
                        >
                            <img
                                src={chat.receiverImg}
                                alt={chat.receiverName}
                                className="w-12 h-12 rounded-full mr-3 object-cover"
                            />
                            <div>
                                <p className="font-semibold">{chat.receiverName}</p>
                                <p className="text-sm text-gray-600">
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ConversationList;