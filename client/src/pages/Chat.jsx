import React, { useState } from 'react';
import { Search, Send, MoreVertical, CheckCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Avatar from '../components/ui/Avatar';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { Card } from '../components/ui/Card';

const Chat = () => {
    const { user } = useAuth();
    const [selectedChat, setSelectedChat] = useState(null);
    const [message, setMessage] = useState('');

    // Mock chat data
    const chats = [
        {
            id: 1,
            name: 'Priya Patel',
            avatar: 'P',
            lastMessage: 'Is the calculator still available?',
            time: '2m ago',
            unread: 2,
            online: true
        },
        {
            id: 2,
            name: 'Amit Kumar',
            avatar: 'A',
            lastMessage: 'Thanks for the quick response!',
            time: '1h ago',
            unread: 0,
            online: false
        },
        {
            id: 3,
            name: 'Neha Gupta',
            avatar: 'N',
            lastMessage: 'Can we meet tomorrow?',
            time: '3h ago',
            unread: 1,
            online: true
        }
    ];

    const messages = selectedChat ? [
        { id: 1, sender: 'them', text: 'Hi! Is this item still available?', time: '10:30 AM' },
        { id: 2, sender: 'me', text: 'Yes, it is! Are you interested?', time: '10:32 AM' },
        { id: 3, sender: 'them', text: 'Great! Can we meet today?', time: '10:35 AM' },
        { id: 4, sender: 'me', text: 'Sure, how about 4 PM at the library?', time: '10:36 AM' },
        { id: 5, sender: 'them', text: 'Perfect! See you there.', time: '10:37 AM' }
    ] : [];

    const handleSend = (e) => {
        e.preventDefault();
        if (message.trim()) {
            console.log('Sending:', message);
            setMessage('');
        }
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
                        {chats.map((chat) => (
                            <button
                                key={chat.id}
                                onClick={() => setSelectedChat(chat)}
                                className={`w-full p-4 flex items-center gap-3 hover:bg-muted transition-colors border-b ${selectedChat?.id === chat.id ? 'bg-muted' : ''
                                    }`}
                            >
                                <div className="relative">
                                    <Avatar fallback={chat.avatar} size="md" />
                                    {chat.online && (
                                        <div className="absolute bottom-0 right-0 h-3 w-3 bg-success-green rounded-full border-2 border-white" />
                                    )}
                                </div>
                                <div className="flex-1 text-left">
                                    <div className="flex justify-between items-start mb-1">
                                        <span className="font-medium">{chat.name}</span>
                                        <span className="text-xs text-muted-foreground">{chat.time}</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                                </div>
                                {chat.unread > 0 && (
                                    <div className="bg-campus-blue text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                        {chat.unread}
                                    </div>
                                )}
                            </button>
                        ))}
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
                                        <Avatar fallback={selectedChat.avatar} size="md" />
                                        {selectedChat.online && (
                                            <div className="absolute bottom-0 right-0 h-3 w-3 bg-success-green rounded-full border-2 border-white" />
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">{selectedChat.name}</h3>
                                        <p className="text-xs text-muted-foreground">
                                            {selectedChat.online ? 'Online' : 'Offline'}
                                        </p>
                                    </div>
                                </div>
                                <Button variant="ghost" size="icon">
                                    <MoreVertical size={20} />
                                </Button>
                            </div>

                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                {messages.map((msg) => (
                                    <div
                                        key={msg.id}
                                        className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div
                                            className={`max-w-[70%] rounded-2xl px-4 py-2 ${msg.sender === 'me'
                                                    ? 'bg-campus-blue text-white'
                                                    : 'bg-muted'
                                                }`}
                                        >
                                            <p className="text-sm">{msg.text}</p>
                                            <div className="flex items-center gap-1 justify-end mt-1">
                                                <span className={`text-xs ${msg.sender === 'me' ? 'text-blue-100' : 'text-muted-foreground'}`}>
                                                    {msg.time}
                                                </span>
                                                {msg.sender === 'me' && (
                                                    <CheckCheck size={14} className="text-blue-100" />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
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
