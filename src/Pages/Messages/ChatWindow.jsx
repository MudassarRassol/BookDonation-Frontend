import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { ChevronDownIcon, FaceSmileIcon, MapPinIcon } from "@heroicons/react/24/outline";
import EmojiPicker from "emoji-picker-react";
import { useGeolocated } from "react-geolocated";
import { LucideSendHorizonal } from 'lucide-react'
const socket = io("http://localhost:3000", {
    withCredentials: true,
});


const ChatWindow = ({ conversation }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [showGoDown, setShowGoDown] = useState(false);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const { userid, theme } = useSelector((state) => state.user);
    const [onlineUsers, setOnlineUsers] = useState(new Set());

    const messagesEndRef = useRef(null);
    const chatContainerRef = useRef(null);

    const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated({
        positionOptions: { enableHighAccuracy: true },
        userDecisionTimeout: 5000,
    });

    useEffect(() => {
        if (conversation) {
            fetchMessages();
            socket.emit("joinConversation", conversation._id);
        }

        socket.on("receiveMessage", (message) => {
            setMessages((prevMessages) => {
                if (!prevMessages.some((msg) => msg._id === message._id)) {
                    scrollToBottom();
                    return [...prevMessages, message];
                }
                return prevMessages;
            });

            setTimeout(() => {
                if (isNearBottom()) {
                    scrollToBottom();
                } else {
                    setShowGoDown(true);
                }
            }, 100);
        });

        socket.on("userOnline", (userId) => {
            setOnlineUsers((prev) => new Set([...prev, userId]));
        });

        socket.on("userOffline", (userId) => {
            setOnlineUsers((prev) => {
                const newSet = new Set(prev);
                newSet.delete(userId);
                return newSet;
            });
        });

        return () => {
            socket.off("receiveMessage");
            socket.off("userOnline");
            socket.off("userOffline");
        };
    }, [conversation]);

    const fetchMessages = async () => {
        try {
            const response = await axios.get(
                `http://localhost:3000/api/messages/getmessage/${conversation._id}`,
                { withCredentials: true }
            );
            setMessages(response.data.messages);
            setTimeout(scrollToBottom, 100);
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

    const sendMessage = async () => {
        if (!newMessage.trim()) return;
        let receiverId = conversation.receiverId;

        let messageData = {
            conversationId: conversation._id,
            senderId: userid,
            text: newMessage,
            receiverId: receiverId,
        };

        socket.emit("sendMessage", messageData);
        setNewMessage("");
        setTimeout(scrollToBottom, 100);
    };

    const sendLocation = () => {
        if (!isGeolocationAvailable) {
            alert("Geolocation is not available in this browser.");
            return;
        }
        if (!isGeolocationEnabled) {
            alert("Geolocation is disabled.");
            return;
        }
        if (coords) {
            let { latitude, longitude } = coords;
            const locationMessage = {
                conversationId: conversation._id,
                senderId: userid,
                receiverId: conversation.receiverId,
                text: "📍 Shared a location",
                URL: `https://www.google.com/maps?q=${latitude},${longitude}`,
                location: { lat: latitude, lon: longitude },
            };

            socket.emit("sendMessage", locationMessage);
        }
        setTimeout(scrollToBottom, 100);
    };

    const isNearBottom = () => {
        if (!chatContainerRef.current) return false;
        const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
        return scrollHeight - scrollTop - clientHeight < 150;
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        setShowGoDown(false);
    };

    const handleScroll = () => {
        if (isNearBottom()) {
            setShowGoDown(false);
        } else {
            setShowGoDown(true);
        }
    };

    const handleEmojiClick = (emojiObject) => {
        setNewMessage((prev) => prev + emojiObject.emoji);
    };

    const handleLocationClick = () => {
        sendLocation();
        scrollToBottom();
    };

    const isReceiverOnline = onlineUsers.has(conversation.receiverId);

    return (
        <div className="flex flex-col h-[88vh]">
            <div className="p-4 border-b flex items-center">
                <img
                    src={conversation.receiverImg || "https://via.placeholder.com/50"}
                    alt={conversation.receiverName}
                    className="w-12 h-12 rounded-full object-cover mr-3"
                />
                <h2 className="text-lg font-bold">{conversation.receiverName}</h2>
                {isReceiverOnline && (
                    <span className="w-3 h-3 rounded-full ml-2 bg-green-500"></span>
                )}
            </div>

            <div
                className="flex-1 overflow-y-auto p-4 relative"
                ref={chatContainerRef}
                onScroll={handleScroll}
            >
                {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.sender === userid ? "justify-end" : "justify-start"}`}>
                        <div
                            className={`p-3 rounded-lg max-w-xs mt-2 ${msg.sender === userid ? "dark shadow-lg" : "light"} ${theme === "dark" ? "light" : "dark shadow-lg"}`}
                        >
                            <div className="transition-all duration-300 ease-in">
                                {msg.text}
                            </div>
                            {msg.location && (
                                <a
                                    href={`https://www.google.com/maps?q=${msg.location.lat},${msg.location.lon}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:underline mt-2 block"
                                >
                                    View on map
                                </a>
                            )}
                            {msg.location && (
                                <iframe
                                    src={`https://www.google.com/maps?q=${msg.location.lat},${msg.location.lon}&output=embed`}
                                    width="100%"
                                    height="250"
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="rounded-lg mt-2"
                                ></iframe>
                            )}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef}></div>
            </div>

            {showGoDown && (
                <button
                    onClick={scrollToBottom}
                    className="absolute bottom-20 right-5 p-2 rounded-full shadow-lg transition-opacity"
                >
                    <ChevronDownIcon className="w-6 h-6" />
                </button>
            )}

            <div className="p-4 border-t flex items-center relative">
                <button
                    className="mr-2 p-2 rounded-full"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                >
                    <FaceSmileIcon className="w-6 h-6" />
                </button>

                {showEmojiPicker && (
                    <div className="absolute bottom-16 left-5 shadow-lg rounded-lg">
                        <EmojiPicker onEmojiClick={handleEmojiClick} />
                    </div>
                )}

                <button
                    onClick={handleLocationClick}
                    className="mr-2 p-2 rounded-full"
                >
                    <MapPinIcon className="w-6 h-6" />
                </button>

                <input
                    type="text"
                    placeholder="Type a message..."
                    className="flex-1 p-2 border rounded-lg outline-none"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                />
                <button onClick={sendMessage} className="ml-2 p-2 rounded-lg">
                    <LucideSendHorizonal className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
};

export default ChatWindow;