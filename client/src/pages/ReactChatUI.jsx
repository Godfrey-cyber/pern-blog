import React, { useState, useRef, useEffect } from 'react';
import { Send, Search, MoreVertical, Phone, Video, Smile, Paperclip, LogOut, User, Settings, Mic, ImagePlus, Trash2, Reply, ThumbsUp, Heart, Laugh, Clock } from 'lucide-react';

const ReactChatUI = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [loginInput, setLoginInput] = useState('');
  const [selectedChat, setSelectedChat] = useState(0);
  const [message, setMessage] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showMessageOptions, setShowMessageOptions] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [searchMessages, setSearchMessages] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [messages, setMessages] = useState({
    0: [
      { id: 1, text: "Hey! How are you doing?", sender: 'them', time: '10:30 AM', reactions: [] },
      { id: 2, text: "I'm doing great! Just finished that project we talked about.", sender: 'me', time: '10:32 AM', reactions: [] },
      { id: 3, text: "That's awesome! Want to grab coffee later?", sender: 'them', time: '10:33 AM', reactions: [{emoji: '👍', count: 1}] },
      { id: 4, text: "Definitely! How about 3pm at our usual spot?", sender: 'me', time: '10:35 AM', reactions: [] },
    ],
    1: [
      { id: 1, text: "Meeting at 2pm tomorrow?", sender: 'them', time: '9:15 AM', reactions: [] },
      { id: 2, text: "Sure, I'll be there!", sender: 'me', time: '9:20 AM', reactions: [] },
    ],
    2: [
      { id: 1, text: "Thanks for your help yesterday!", sender: 'them', time: 'Yesterday', reactions: [{emoji: '❤️', count: 1}] },
    ],
    3: [
      { id: 1, text: "Welcome to the team project!", sender: 'them', time: '2 days ago', reactions: [] },
    ]
  });
  
  const messagesEndRef = useRef(null);
  const recordingIntervalRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState('');

  const emojis = ['👍', '❤️', '😂', '😮', '😢', '🙏'];
  const emojiPickerEmojis = ['😀', '😂', '🥰', '😎', '🤔', '👍', '❤️', '🔥', '✨', '🎉', '👏', '🙌'];

  const contacts = [
    { id: 0, name: 'Sarah Johnson', avatar: '👩', lastMessage: 'That\'s awesome! Want to grab...', time: '10:33 AM', unread: 2, online: true },
    { id: 1, name: 'Mike Chen', avatar: '👨', lastMessage: 'Meeting at 2pm tomorrow?', time: '9:15 AM', unread: 0, online: true },
    { id: 2, name: 'Emily Davis', avatar: '👱‍♀️', lastMessage: 'Thanks for your help!', time: 'Yesterday', unread: 0, online: false },
    { id: 3, name: 'Team Project', avatar: '👥', lastMessage: 'John: Great work everyone!', time: 'Yesterday', unread: 5, online: false },
  ];

  const autoResponses = [
    "That sounds great!",
    "I totally agree with you.",
    "Let me think about it.",
    "Absolutely! Count me in.",
    "Thanks for letting me know!",
    "I'll get back to you on that.",
    "Perfect timing!",
    "That works for me.",
  ];
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, selectedChat]);

  useEffect(() => {
    if (isRecording) {
      recordingIntervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
      setRecordingTime(0);
    }
    return () => {
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
    };
  }, [isRecording]);

  const handleLogin = () => {
    if (loginInput.trim()) {
      setUsername(loginInput.trim());
      setIsLoggedIn(true);
      setLoginInput('');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setShowMenu(false);
  };

  const handleLoginKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleLogin();
    }
  };

  const simulateTyping = () => {
    setIsTyping(true);
    const typingDuration = Math.random() * 2000 + 1000;
    
    setTimeout(() => {
      setIsTyping(false);
      const randomResponse = autoResponses[Math.floor(Math.random() * autoResponses.length)];
      const newMessage = {
        id: Date.now(),
        text: randomResponse,
        sender: 'them',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        reactions: []
      };
      
      setMessages(prev => ({
        ...prev,
        [selectedChat]: [...(prev[selectedChat] || []), newMessage]
      }));
    }, typingDuration);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: Date.now(),
        text: message,
        sender: 'me',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        reactions: []
      };
      
      setMessages(prev => ({
        ...prev,
        [selectedChat]: [...(prev[selectedChat] || []), newMessage]
      }));
      
      setMessage('');
      
      if (Math.random() > 0.3) {
        setTimeout(() => {
          simulateTyping();
        }, 500);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleVoiceMessage = () => {
    if (!isRecording) {
      setIsRecording(true);
    } else {
      setIsRecording(false);
      const newMessage = {
        id: Date.now(),
        text: `🎤 Voice message (${recordingTime}s)`,
        sender: 'me',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        reactions: [],
        type: 'voice'
      };
      
      setMessages(prev => ({
        ...prev,
        [selectedChat]: [...(prev[selectedChat] || []), newMessage]
      }));
    }
  };

  const handleImageUpload = () => {
    const newMessage = {
      id: Date.now(),
      text: "📷 Shared an image",
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      reactions: [],
      type: 'image'
    };
    
    setMessages(prev => ({
      ...prev,
      [selectedChat]: [...(prev[selectedChat] || []), newMessage]
    }));
  };

  const addReaction = (messageId, emoji) => {
    setMessages(prev => ({
      ...prev,
      [selectedChat]: prev[selectedChat].map(msg => {
        if (msg.id === messageId) {
          const existingReaction = msg.reactions.find(r => r.emoji === emoji);
          if (existingReaction) {
            return {
              ...msg,
              reactions: msg.reactions.map(r => 
                r.emoji === emoji ? {...r, count: r.count + 1} : r
              )
            };
          } else {
            return {
              ...msg,
              reactions: [...msg.reactions, {emoji, count: 1}]
            };
          }
        }
        return msg;
      })
    }));
    setShowMessageOptions(null);
  };

  const deleteMessage = (messageId) => {
    setMessages(prev => ({
      ...prev,
      [selectedChat]: prev[selectedChat].filter(msg => msg.id !== messageId)
    }));
    setShowMessageOptions(null);
  };

  const formatRecordingTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentMessages = messages[selectedChat] || [];
  const currentContact = contacts[selectedChat];

  const filteredMessages = searchMessages 
    ? currentMessages.filter(msg => msg.text.toLowerCase().includes(searchMessages.toLowerCase()))
    : currentMessages;

  if (!isLoggedIn) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-purple-800">
        <div className="bg-white rounded-3xl shadow-2xl p-8 w-96 animate-[fadeIn_0.5s_ease-out]">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl shadow-lg">
              💬
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
            <p className="text-gray-600">Enter your name to start chatting</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
              <input
                type="text"
                value={loginInput}
                onChange={(e) => setLoginInput(e.target.value)}
                onKeyPress={handleLoginKeyPress}
                placeholder="Enter your name"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
            </div>
            
            <button
              onClick={handleLogin}
              disabled={!loginInput.trim()}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              Continue
            </button>
          </div>
          
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>Try names like: Alex, Jordan, or Sam</p>
          </div>
        </div>
        
        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col shadow-lg">
        <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-purple-600 to-blue-600">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-white">Messages</h1>
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-full transition-all"
              >
                <User className="w-5 h-5" />
              </button>
              
              {showMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-10 animate-[fadeIn_0.2s_ease-out]">
                  <div className="px-4 py-2 border-b border-gray-200">
                    <p className="font-semibold text-gray-800">{username}</p>
                    <p className="text-xs text-gray-500">Online</p>
                  </div>
                  <button className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center space-x-2 text-gray-700">
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center space-x-2 text-red-600"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-purple-300 transition-all"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {contacts.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase())).map((contact, idx) => (
            <div
              key={contact.id}
              onClick={() => setSelectedChat(contact.id)}
              className={`p-4 cursor-pointer transition-all duration-300 border-b border-gray-100 hover:bg-purple-50 ${
                selectedChat === contact.id ? 'bg-gradient-to-r from-purple-100 to-blue-100 border-l-4 border-l-purple-600' : ''
              } animate-[slideIn_0.3s_ease-out]`}
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center text-2xl shadow-md">
                    {contact.avatar}
                  </div>
                  {contact.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-semibold text-gray-900 truncate">{contact.name}</h3>
                    <span className="text-xs text-gray-500 ml-2">{contact.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">{contact.lastMessage}</p>
                </div>
                {contact.unread > 0 && (
                  <div className="w-6 h-6 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center animate-bounce">
                    <span className="text-xs text-white font-bold">{contact.unread}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-purple-600 to-blue-600 shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-xl shadow-md">
                  {currentContact.avatar}
                </div>
                {currentContact.online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
                )}
              </div>
              <div>
                <h2 className="font-semibold text-white">{currentContact.name}</h2>
                <p className="text-sm text-purple-100">
                  {isTyping ? 'typing...' : currentContact.online ? 'Active now' : 'Offline'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setShowSearch(!showSearch)}
                className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-full transition-all"
              >
                <Search className="w-5 h-5" />
              </button>
              <button className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-full transition-all">
                <Phone className="w-5 h-5" />
              </button>
              <button className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-full transition-all">
                <Video className="w-5 h-5" />
              </button>
              <button className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-full transition-all">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          {showSearch && (
            <div className="mt-3 animate-[fadeIn_0.3s_ease-out]">
              <input
                type="text"
                placeholder="Search messages..."
                value={searchMessages}
                onChange={(e) => setSearchMessages(e.target.value)}
                className="w-full px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-300 transition-all"
              />
            </div>
          )}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-gray-50 to-white">
          {filteredMessages.map((msg, idx) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'} animate-[fadeIn_0.3s_ease-out] group`}
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              <div className={`max-w-xs lg:max-w-md ${msg.sender === 'me' ? 'order-2' : 'order-1'} relative`}>
                <div
                  className={`rounded-2xl px-4 py-2 shadow-md transition-all hover:shadow-lg ${
                    msg.sender === 'me'
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-br-none'
                      : 'bg-white text-gray-800 rounded-bl-none border border-gray-200'
                  }`}
                  onClick={() => setShowMessageOptions(showMessageOptions === msg.id ? null : msg.id)}
                >
                  <p>{msg.text}</p>
                  
                  {msg.reactions && msg.reactions.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {msg.reactions.map((reaction, ridx) => (
                        <span
                          key={ridx}
                          className={`text-xs px-2 py-0.5 rounded-full ${
                            msg.sender === 'me' ? 'bg-white bg-opacity-20' : 'bg-gray-100'
                          }`}
                        >
                          {reaction.emoji} {reaction.count}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                
                <span className={`text-xs text-gray-500 mt-1 block ${msg.sender === 'me' ? 'text-right' : 'text-left'}`}>
                  {msg.time}
                </span>
                
                {showMessageOptions === msg.id && (
                  <div className="absolute bottom-full mb-2 bg-white rounded-lg shadow-xl p-2 z-10 animate-[fadeIn_0.2s_ease-out]">
                    <div className="flex space-x-1 mb-2 pb-2 border-b border-gray-200">
                      {emojis.map((emoji, eidx) => (
                        <button
                          key={eidx}
                          onClick={() => addReaction(msg.id, emoji)}
                          className="hover:scale-125 transition-transform text-lg"
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() => deleteMessage(msg.id)}
                      className="flex items-center space-x-2 text-red-600 hover:bg-red-50 px-3 py-1 rounded w-full text-left text-sm"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Delete</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start animate-[fadeIn_0.3s_ease-out]">
              <div className="bg-white text-gray-800 rounded-2xl rounded-bl-none px-4 py-3 shadow-md border border-gray-200">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-gray-200 bg-white">
          {isRecording && (
            <div className="mb-3 flex items-center justify-between bg-red-50 px-4 py-2 rounded-lg animate-pulse">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-red-600 font-medium">Recording...</span>
              </div>
              <span className="text-red-600 font-mono">{formatRecordingTime(recordingTime)}</span>
            </div>
          )}
          
          <div className="flex items-center space-x-3">
            <button
              onClick={handleImageUpload}
              className="text-gray-500 hover:text-purple-600 transition-colors p-2 hover:bg-purple-50 rounded-full"
            >
              <ImagePlus className="w-5 h-5" />
            </button>
            <button
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="text-gray-500 hover:text-purple-600 transition-colors p-2 hover:bg-purple-50 rounded-full relative"
            >
              <Smile className="w-5 h-5" />
              {showEmojiPicker && (
                <div className="absolute bottom-full mb-2 left-0 bg-white rounded-lg shadow-xl p-3 grid grid-cols-6 gap-2 z-10">
                  {emojiPickerEmojis.map((emoji, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => {
                        e.stopPropagation();
                        setMessage(message + emoji);
                      }}
                      className="text-2xl hover:scale-125 transition-transform"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              )}
            </button>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              disabled={isRecording}
              className="flex-1 px-4 py-3 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all disabled:opacity-50"
            />
            {message.trim() ? (
              <button
                onClick={handleSendMessage}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-3 rounded-full hover:shadow-lg transform hover:scale-110 transition-all"
              >
                <Send className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={handleVoiceMessage}
                className={`${
                  isRecording 
                    ? 'bg-red-500' 
                    : 'bg-gradient-to-r from-purple-600 to-blue-600'
                } text-white p-3 rounded-full hover:shadow-lg transform hover:scale-110 transition-all`}
              >
                <Mic className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReactChatUI;