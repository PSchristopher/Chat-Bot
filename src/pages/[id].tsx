"use client";
import { getConversation, sendMessageToBot } from '@/api/routes';
import TypingAnimation from '@/components/TypingAnimation';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import '../styles/scrollbar.css'
import logo from '../../public/SIRIKA_FINAL_LOGO_PNG_300x300.png'
interface Message {
  id: string;
  senderId: string | undefined;
  text: string;
  createdAt: string;
}

function ChatPage() {
  const router = useRouter();
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const { id} = router.query;
  const senderId = id as string;
  const conversationId = localStorage.getItem('conversation_id');

  const [messages, setMessages] = useState<Message[]>([
    {
      id:'1',
      senderId: senderId,
      text: `Hi!👋 What can I help you with ?`,
      createdAt: new Date().toISOString(),
    }
  ]);
  const [newQuestion, setNewQuestion] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isRotating, setIsRotating] = useState(false);

  const scroll = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSend = async () => {
    try {
      if(newQuestion.length && !isTyping){
        const newMessageId = String(messages.length + 2);
        setIsTyping(true);
        const newMessageObj: Message = {
          id: String(messages.length + 1),
          senderId: conversationId  as string,
          text: newQuestion,
          createdAt: new Date().toISOString(),
        };
        setMessages((prevMessages) => [...prevMessages, newMessageObj]);
        setNewQuestion('');
        setIsLoading(true);

        const messagesBody = {
          conversation_id: conversationId,
          bot_id: id as string,
          query:newQuestion
        };
    
        const response = await sendMessageToBot(messagesBody);
    
        const botMessage: Message = {
          id: newMessageId,
          senderId: id as string,
          text: '',
          createdAt: new Date().toISOString(),
        };
    
        setMessages((prevMessages) => [...prevMessages, botMessage]);
        const typingEffectInterval = setInterval(() => {
          if (botMessage.text.length < response.answer.length) {
            botMessage.text += response.answer.charAt(botMessage.text.length);
            setMessages((prevMessages) => {
              const updatedMessages = [...prevMessages];
              updatedMessages.pop();
              return [...updatedMessages, { ...botMessage }];
            });
            scrollToBottom();
          } else {
            clearInterval(typingEffectInterval);
            setIsLoading(false);
            scrollToBottom();
            setIsTyping(false);
          }
        }, 0);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.error('Error sending message:', error);
    }
  };

  useEffect(() => {
    if (!conversationId) {
      if(id)
      getConversation(id as string);
    }
  }, [conversationId, id]);

  const scrollToBottom = () => {
    scroll.current?.scrollIntoView({ behavior: 'auto', block: 'end' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if(e.target.value.length > 300){
      e.preventDefault(); 
    } else {
      setNewQuestion(e.target.value); 
    }
  };
  const handleRefresh = () => {
    setMessages([{
      id:'1',
      senderId: senderId,
      text: `Hi!👋 What can I help you with ?`,
      createdAt: new Date().toISOString(),
    }]);
    setIsRotating(true);
    setTimeout(() => {
      setIsRotating(false);
    }, 1000);
  };
  useEffect(() => {
    const handleClick = () => {
      console.log('jnhjm');
      const element = document.querySelector('.scAI-chat-bubble');
      console.log(element);
      if (element) {
        element.classList.remove('open');
      }
    };
  
    // Ensure handleClick is called after DOM is ready
    if (document.readyState === 'complete') {
      handleClick();
    } else {
      window.addEventListener('load', handleClick);
    }
  
    return () => {
      window.removeEventListener('load', handleClick);
    };
  }, []);
  return (
    <>
      <div className="flex flex-col h-screen bg-white">
        {/* Header */}
        <div className="px-3 py-1 bg-opacity-40 border-b-[1px] border-[#cccccc] flex justify-between">
          <div className=" flex items-center gap-4 pl-4">
            <img src='/SIRIKA_FINAL_LOGO_PNG_300x300.png' alt="logo"  className='rounded-full object-contain w-16 ' ></img>
            {/* <h1 className="font-medium text-[20px] text-[#8f8622] font-poppins">Support</h1> */}
          </div>
          <div className='flex gap-4'>
             <button
               onClick={handleRefresh}
               className={`refresh-button ${isRotating ? 'animate-spin' : ''}`}
              >
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 30 30">
<path d="M 15 3 C 12.031398 3 9.3028202 4.0834384 7.2070312 5.875 A 1.0001 1.0001 0 1 0 8.5058594 7.3945312 C 10.25407 5.9000929 12.516602 5 15 5 C 20.19656 5 24.450989 8.9379267 24.951172 14 L 22 14 L 26 20 L 30 14 L 26.949219 14 C 26.437925 7.8516588 21.277839 3 15 3 z M 4 10 L 0 16 L 3.0507812 16 C 3.562075 22.148341 8.7221607 27 15 27 C 17.968602 27 20.69718 25.916562 22.792969 24.125 A 1.0001 1.0001 0 1 0 21.494141 22.605469 C 19.74593 24.099907 17.483398 25 15 25 C 9.80344 25 5.5490109 21.062074 5.0488281 16 L 8 16 L 4 10 z"></path>
          </svg>
      </button>
{/* 
      <button >
      <svg fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" 
	 width="14" height="14" viewBox="0 0 94.926 94.926">
<g>
	<path d="M55.931,47.463L94.306,9.09c0.826-0.827,0.826-2.167,0-2.994L88.833,0.62C88.436,0.224,87.896,0,87.335,0
		c-0.562,0-1.101,0.224-1.498,0.62L47.463,38.994L9.089,0.62c-0.795-0.795-2.202-0.794-2.995,0L0.622,6.096
		c-0.827,0.827-0.827,2.167,0,2.994l38.374,38.373L0.622,85.836c-0.827,0.827-0.827,2.167,0,2.994l5.473,5.476
		c0.397,0.396,0.936,0.62,1.498,0.62s1.1-0.224,1.497-0.62l38.374-38.374l38.374,38.374c0.397,0.396,0.937,0.62,1.498,0.62
		s1.101-0.224,1.498-0.62l5.473-5.476c0.826-0.827,0.826-2.167,0-2.994L55.931,47.463z"/>
</g>
</svg>
      </button> */}
      </div>
              </div>

        {/* Content */}
        <div className="flex-1 overflow-y-scroll journal-scroll">
          {messages.map((message) => (
            <div key={message.id} className="flex flex-col">
              {message?.senderId === conversationId ? (
                <div className="flex flex-row justify-end p-2 pr-6 w-11/12 ml-auto chat chat-end" ref={scroll}>
                  <div className="chat-bubble bg-[#663333] p-3 font-sans rounded-tl-xl rounded-tr-xl rounded-br-xl relative">
                    <p className="text-md flex text-white">{message.text}</p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-row p-2 pl-6 w-11/12 chat chat-start" ref={scroll}>
                  <div className="chat-bubble bg-[#f0f0f0] p-3 font-sans rounded-tl-xl rounded-tr-xl rounded-br-xl relative">
                    <p className="text-md text-black flex">{message.text}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex flex-row p-2 pl-6 w-11/12 chat " ref={scroll}>
              <div key={messages.length} className="flex justify-start chat-start">
                <div className="bg-[#f0f0f0] rounded-lg  text-white max-w-sm chat-bubble">
                  <TypingAnimation />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex flex-row justify-between items-center border-t-[1px] border-[#cccccc] min-h-[58px] h-auto p-2">
          <div className="flex justify-center flex-1  h-auto">
            <textarea
              ref={inputRef}
              className="w-full  bg-transparent text-[#000000] focus:outline-none resize-none h-auto place  "
              value={newQuestion}
              onChange={handleInputChange} // Changed the type of event handler
              placeholder="Type your message..."
              onKeyDown={handleKeyDown}
              maxLength={300}
              style={{ overflowY: 'scroll', scrollbarWidth: 'none',
              padding:'18px 24px 18px 12px',
              height:'58px'
             }}
            />
          </div>
          <div className="flex flex-row pr-4">
            <button
              type="button"
              disabled={!newQuestion || isTyping}
              onClick={handleSend}
            >
              <svg
                className={`w-6 h-6 ${!newQuestion || isTyping ? 'text-gray-400' : 'text-[#663333]'} origin-center transform`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M21.5951 1.4575C21.1993 1.32529 20.8308 1.4209 20.6476 1.47411C20.448 1.5321 20.2101 1.625 19.9714 1.7182L3.01429 8.3356C2.74746 8.43969 2.48901 8.54051 2.28953 8.63914C2.11718 8.72436 1.75084 8.91405 1.54635 9.30766C1.32085 9.74172 1.32115 10.2585 1.54717 10.6923C1.75212 11.0856 2.11868 11.2749 2.29113 11.3599C2.49072 11.4583 2.74924 11.5588 3.01619 11.6626L7.73621 13.4981C8.08833 13.6351 8.26439 13.7035 8.43954 13.7077C8.59436 13.7115 8.74793 13.6792 8.88814 13.6134C9.04676 13.539 9.18034 13.4054 9.44749 13.1383L14.2929 8.29289C14.6834 7.90237 15.3166 7.90237 15.7071 8.29289C16.0976 8.68342 16.0976 9.31658 15.7071 9.70711L10.8617 14.5525C10.5946 14.8197 10.461 14.9532 10.3866 15.1119C10.3208 15.2521 10.2885 15.4056 10.2923 15.5605C10.2965 15.7356 10.3649 15.9117 10.5019 16.2638L12.3374 20.9837C12.4412 21.2507 12.5417 21.5093 12.6401 21.7089C12.7251 21.8813 12.9144 22.2479 13.3077 22.4528C13.7415 22.6788 14.2583 22.6791 14.6923 22.4536C15.086 22.2492 15.2756 21.8828 15.3609 21.7105C15.4595 21.511 15.5603 21.2526 15.6644 20.9858L22.2818 4.02861C22.375 3.7899 22.4679 3.55198 22.5259 3.35235C22.5791 3.16916 22.6747 2.8007 22.5425 2.40493C22.3931 1.95779 22.0422 1.60688 21.5951 1.4575Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatPage;
