import React, { useState, useEffect } from 'react';
import { Search, Send, MoreVertical, CheckCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Avatar from '../components/ui/Avatar';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { getConversations, getMessages, sendMessage } from '../api/messages';

const Chat = () => {
    const { user } = useAuth();
    const [conversations, setConversations] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchConversations = async () => {
            try {
                const data = await getConversations();
                setConversations(data);
            } catch (error) {
                console.error("Failed to fetch conversations", error);
            } finally {
                setLoading(false);
            }
        };
        fetchConversations();
    }, []);

    const handleChatSelect = async (chat) => {
        setSelectedChat(chat);
        try {
            const msgs = await getMessages(chat._id);
            setMessages(msgs);
        } catch (error) {
            console.error("Failed to fetch messages", error);
        }
    };

    const handleSend = async (e) => {
        e.preventDefault();
        if (message.trim() && selectedChat) {
            try {
                const newMsg = await sendMessage(selectedChat._id, message);
                setMessages([...messages, newMsg]);
                setMessage('');

                // Update last message in conversation list
                setConversations(prev => {
                    const updated = prev.map(c =>
                        c._id === selectedChat._id
                            ? { ...c, lastMessage: newMsg, lastMessageAt: newMsg.createdAt }
                            : c
                    );
                    return updated.sort((a, b) => new Date(b.lastMessageAt) - new Date(a.lastMessageAt));
                });

            } catch (error) {
                console.error("Failed to send message", error);
            }
        }
    };

    // Helper to get other participant
    const getOtherParticipant = (conversation) => {
        if (!conversation?.participants) return {};
        return conversation.participants.find(p => p._id !== user?._id) || {};
    };

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100vh-12rem)]">
                {/* Chat List */}
                <Card className="lg:col-span-1 overflow-hidden flex flex-col">
                    <div className="p-4 border-b">
                        <h2 className="text-xl font-bold mb-3">Messages</h2>
                        <div className="relative">
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Search conversations..." className="pl-9" />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        {loading ? (
                            <div className="p-4 text-center text-muted-foreground">Loading chats...</div>
                        ) : conversations.length === 0 ? (
                            <div className="p-4 text-center text-muted-foreground">No conversations yet</div>
                        ) : (
                            conversations.map((chat) => {
                                const otherUser = getOtherParticipant(chat);
                                return (
                                    <button
                                        key={chat._id}
                                        onClick={() => handleChatSelect(chat)}
                                        className={`w-full p-4 flex items-center gap-3 hover:bg-muted transition-colors border-b ${selectedChat?._id === chat._id ? 'bg-muted' : ''
                                            }`}
                                    >
                                        <div className="relative">
                                            <Avatar fallback={otherUser.name?.[0] || '?'} size="md" />
                                            {/* Online status logic could go here */}
                                        </div>
                                        <div className="flex-1 text-left">
                                            <div className="flex justify-between items-start mb-1">
                                                <span className="font-medium">{otherUser.name || 'User'}</span>
                                                <span className="text-xs text-muted-foreground">
                                                    {chat.lastMessageAt ? new Date(chat.lastMessageAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                                                </span>
                                            </div>
                                            <p className="text-sm text-muted-foreground truncate">
                                                {chat.lastMessage?.content || 'No messages yet'}
                                            </p>
                                        </div>
                                    </button>
                                );
                            })
                        )}
                    </div>
                </Card>

                {/* Chat Window */}
                <Card className="lg:col-span-2 overflow-hidden flex flex-col">
                    {selectedChat ? (
                        <>
                            {/* Chat Header */}
                            <div className="p-4 border-b flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <Avatar fallback={getOtherParticipant(selectedChat).name?.[0] || '?'} size="md" />
                                        {/* Online status stub */}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">{getOtherParticipant(selectedChat).name || 'User'}</h3>
                                    </div>
                                </div>
                                <Button variant="ghost" size="icon">
                                    <MoreVertical size={20} />
                                </Button>
                            </div>

                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                {messages.map((msg) => {
                                    const isMe = msg.sender === user?._id;
                                    return (
                                        <div
                                            key={msg._id}
                                            className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div
                                                className={`max-w-[70%] rounded-2xl px-4 py-2 ${isMe
                                                    ? 'bg-campus-blue text-white'
                                                    : 'bg-muted'
                                                    }`}
                                            >
                                                <p className="text-sm">{msg.content}</p>
                                                <div className="flex items-center gap-1 justify-end mt-1">
                                                    <span className={`text-xs ${isMe ? 'text-blue-100' : 'text-muted-foreground'}`}>
                                                        {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                    </span>
                                                    {isMe && (
                                                        <CheckCheck size={14} className="text-blue-100" />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Input */}
                            <form onSubmit={handleSend} className="p-4 border-t flex gap-2">
                                <Input
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Type a message..."
                                    className="flex-1"
                                />
                                <Button type="submit" size="icon">
                                    <Send size={18} />
                                </Button>
                            </form>
                        </>
                    ) : (
                        <div className="flex-1 flex items-center justify-center text-muted-foreground">
                            <div className="text-center">
                                <p className="text-lg font-medium mb-2">Select a conversation</p>
                                <p className="text-sm">Choose a chat from the list to start messaging</p>
                            </div>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default Chat;
