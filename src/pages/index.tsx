"use client"
import getConversation from '@/api/routes';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';

interface Message {
  id: string;
  senderId: string;
  text: string;
  createdAt: string;
}

function ChatPage() {
  const router = useRouter();
  const { bot_id } = router.query;
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      senderId: 'user123',
      text: 'Hello!',
      createdAt: '2024-02-29T10:30:00',
    },
    {
      id: '2',
      senderId: 'otherUser',
      text: 'Hi there!',
      createdAt: '2024-02-29T10:35:00',
    },
  ]);
 
  const [newMessage, setNewMessage] = useState<string>(''); // Assuming you have a state for the new message
  const currentUser = 'user123'; // Replace with the actual current user ID
  const senderUser = 'sender123'; // Replace with the actual current user ID
  const scroll = useRef<HTMLDivElement>(null);
   
  

  const handleSend = () => {
    const newMessageObj: Message = {
      id: String(messages.length + 1),
      senderId: currentUser,
      text: newMessage,
      createdAt: new Date().toISOString(),
    };
    const responseMessageObj: Message = {
      id: String(messages.length + 2),
      senderId: senderUser, // Set to the other user's ID
      text: "I don't know, for more information contact Shloka Concepts  by christopher PS", // Set the response message
      createdAt: new Date().toISOString(),
    };

    const updatedMessages = [...messages, newMessageObj, responseMessageObj];
    setMessages(updatedMessages);
    localStorage.setItem('chatMessages', JSON.stringify(updatedMessages));

    setNewMessage(''); // Clear the input after sending
  };
  useEffect(()=>{
getConversation(bot_id)
  },[bot_id])
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  useEffect(() => {
    const storedMessages = localStorage.getItem('chatMessages');
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
    scroll.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  
  const handleKeyPress = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };
  return (
    <>
      {/* {chat ? ( */}
      <div className=" w-full bg-white h-[100vh] md:flex flex-col justify-start items-stretch ">
        {/* <!-- Header with name --> */}
        <div className="flex flex-row items-center justify-between px-3 py-2 h-[12%] bg-opacity-40 border-b-2 border-gray-100">
          <div className="">
            <div className=" py-2 flex  items-center gap-4">
              {/* {userData?.image ? ( */}

              <h1 className="   font-large font-bold text-Black italic">Chat AI {bot_id}</h1>
            </div>

            {/* <p className="text-xs text-gray-500">4 memebres</p> */}
          </div>
        </div>
        {/* <!-- Messages --> */}
        {/* <div className='w-full overflow-y-auto max-h-[60vh] scrollbar-hide'> */}
        <div className="w-full h-[76%] overflow-y-auto   border-b-2 ">
          {messages.map((message) => (
            <div
              key={message.id}
              className="flex-auto flex flex-col overflow-y-auto overflow-hidden scrollbar-hide messagelist"
            >
              <div className="flex flex-col">
                {message?.senderId === currentUser ? (
                  <div className="flex flex-row justify-end p-2 pr-6 w-11/12 ml-auto chat chat-end" ref={scroll}>
                      {' '}
                      {/* Removed ml-auto from here */}
  <div className="px-4 py-3 rounded-tl-xl rounded-tr-xl rounded-bl-xl bg-[#682960] chat-bubble font-serif text-white flex flex-row items-center ">
    <p className="text-sm flex">{message.text}</p> 
</div>
                  </div>
                ) : (

                        <div className="flex flex-row p-2 pl-6 w-11/12 chat chat-start" ref={scroll}>
                  
                    <div className="chat-bubble bg-gray-300  p-3  font-serif rounded-tl-xl  rounded-tr-xl rounded-br-xl  relative "><p className='text-sm  text-black flex'>{message.text}</p></div>
                  </div>
//                                       <div className="flex flex-row p-2 pl-6 w-11/12 chat chat-start " ref={scroll}>

//   <div className='flex space-x-2 justify-center items-cente h-screen dark:invert'>
//  	{/* <span className='sr-only'>Loading...</span> */}
//   	<div className='h-4 w-4 bg-black rounded-full animate-bounce [animation-delay:-0.3s]'></div>
// 	<div className='h-4 w-4 bg-black rounded-full animate-bounce [animation-delay:-0.15s]'></div>
// 	<div className='h-4 w-4 bg-black rounded-full animate-bounce'></div>
// </div>
// </div>
                   
                //         <div className="flex flex-row p-2 w-11/12" ref={scroll}>
                //      <div className=" ">
                //       <div className="bg-gray-300  p-3  font-serif rounded-tl-xl  rounded-tr-xl rounded-br-xl  relative">
                //         <p className="text-sm flex">{message.text}</p>
                //       </div>
                //     </div>
                //   </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* <!-- Input for writing a messages --> */}
        <div className="flex flex-row justify-between items-center border-gray-100 h-[12%] ">
          <div className="flex-1 px-3">
            <input
              className="w-full py-2 px-3 border border-gray-300 rounded focus:outline-none "
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
            />
          </div>
          <div className="flex flex-row pr-4">
          <button
      type="button"
      disabled={!newMessage}
      onClick={handleSend}
      onKeyPress={handleKeyPress}    >
      <svg
        className="w-5 h-5 text-black origin-center transform rotate-90"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
      </svg>
    </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatPage;
