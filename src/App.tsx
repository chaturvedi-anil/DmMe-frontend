import  { useEffect, useRef, useState } from 'react';

import RoomJoinPage from "./pages/RoomJoinPage";
import ChatPage from './pages/ChatPage';

const App = () => {
  const [messages, setMessages] = useState([]);
  const [isLocalStorageNull, setIsLocalStorageNull] = useState(true);
  const wsRef = useRef();
  const roomIdRef = useRef(null);
  const inputRef = useRef(null);
  

  const sendMessage = () => {
    if (!inputRef.current.value.trim()) {
      return;
    }
    
    wsRef.current.send(
      JSON.stringify({
        type: "chat",
        payload: {
          message: inputRef.current?.value,
        },
      })
    );
    inputRef.current.value = "";
  };

  const joinChatRoom = () => {
    if (!roomIdRef.current.value.trim()) {
      return;
    }

    wsRef.current.send(
      JSON.stringify({
        type: "join",
        payload: {
          //@ts-ignore
          roomId: roomIdRef.current?.value,
        },
      })
    );

    localStorage.setItem("roomId", roomIdRef.current.value );
    setIsLocalStorageNull(false);

    roomIdRef.current.value = "";

  }
  
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
     //@ts-ignore
    wsRef.current = ws;

    // ws.onopen = () => {;
    //   alert("connected to server!");
    // };
    ws.onmessage = (ev) => {      
       //@ts-ignore
      setMessages((m) => [...m, ev.data]);
    };


    // return () => {
    //   ws.close(); // Clean up WebSocket connection on component unmount
    // };
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      {!isLocalStorageNull
        ? 
          <ChatPage messages={messages} sendMessage={sendMessage} inputRef={inputRef} />
        :
          <RoomJoinPage roomIdRef={roomIdRef} joinChatRoom={joinChatRoom} />
      }
    </div>
  );
};

export default App;