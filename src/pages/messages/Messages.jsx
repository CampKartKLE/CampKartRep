import React, { useState } from 'react';
import Icon from '../../components/AppIcon';
import Image from '../../components/AppImage';
import Header from '../../components/ui/Header';
import Footer from '../homepage/components/Footer';

const sampleChats = [
  {
    id: 1,
    name: 'Ritika Sharma',
    lastMessage: 'Thanks! I’ll pick it up tomorrow.',
    time: '2 min ago',
    unread: true,
    messages: [
      { fromSelf: false, text: 'Hey! Is the study lamp still available?', time: '10:30 AM' },
      { fromSelf: true, text: 'Yes, it is. Used for just 3 months.', time: '10:31 AM' },
      { fromSelf: false, text: 'Perfect! I’ll pick it up tomorrow.', time: '10:32 AM' }
    ]
  },
  {
    id: 2,
    name: 'Aarav Mehta',
    lastMessage: 'Can you drop it at hostel block A?',
    time: '1 hour ago',
    unread: false,
    messages: [
      { fromSelf: true, text: 'Sure, I’ll be around 5 PM.', time: '3:15 PM' },
      { fromSelf: false, text: 'Thanks! Can you drop it at hostel block A?', time: '3:17 PM' }
    ]
  }
];

const Messages = () => {
  const [activeChatId, setActiveChatId] = useState(sampleChats[0].id);
  const activeChat = sampleChats.find(chat => chat.id === activeChatId);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-16 max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Sidebar */}
          <div className="bg-white rounded-xl campus-shadow overflow-hidden md:col-span-1">
            <div className="px-4 py-3 border-b border-gray-200 font-semibold text-gray-900">
              Messages
            </div>
            <div className="divide-y">
              {sampleChats.map(chat => (
                <button
                  key={chat.id}
                  onClick={() => setActiveChatId(chat.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-100 focus:outline-none transition ${
                    activeChatId === chat.id ? 'bg-gray-100' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">

                    <div>
                      <div className="font-medium text-gray-900">{chat.name}</div>
                      <div className="text-sm text-gray-500 truncate w-40">{chat.lastMessage}</div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-400 text-right">
                    <div>{chat.time}</div>
                    {chat.unread && (
                      <span className="w-2 h-2 bg-campus-blue rounded-full inline-block mt-1" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="md:col-span-2 bg-white rounded-xl campus-shadow p-6 flex flex-col justify-between h-[70vh]">
            {/* Header */}
            <div className="flex items-center justify-between border-b pb-4 mb-4">
              <div className="flex items-center space-x-3">
                <Image src={activeChat.avatar} alt={activeChat.name} className="w-10 h-10 rounded-full" />
                <div>
                  <div className="font-semibold text-gray-900">{activeChat.name}</div>
                  <div className="text-xs text-gray-500">Active recently</div>
                </div>
              </div>
              <button className="text-gray-500 hover:text-gray-800 transition">
                <Icon name="MoreVertical" size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-2">
              {activeChat.messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.fromSelf ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
                      msg.fromSelf
                        ? 'bg-campus-blue text-white rounded-br-none'
                        : 'bg-gray-100 text-gray-900 rounded-bl-none'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <div className="text-xs text-gray-400 mt-1 text-right">{msg.time}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <form className="mt-4 flex items-center space-x-2">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 bg-gray-100 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-campus-blue"
              />
              <button
                type="submit"
                className="bg-campus-blue hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
              >
                <Icon name="Send" size={16} />
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Messages;
