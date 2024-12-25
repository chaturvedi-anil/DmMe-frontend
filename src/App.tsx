import React, { useEffect, useRef, useState } from 'react';

import "./App.css";

const App = () => {
  const [socket, setSocket] = useState();
  const [messages, setMessages] = useState([1,2,3,4,5,6,7,7,8,8,9,9,9,7,6,5,4,3,45,6,7,8,7,6,5, 5,4,3,45,6,7,8,7,6,5]);
  const inputRef = useRef(null);

  const sendMessage = () => {
    if(!socket){
      return;
    }

    if (inputRef.current) {
      socket.send(inputRef?.current?.value);
    }
  };

  useEffect(() => {
    const ws =new WebSocket("ws://localhost:8080");
    setSocket(ws);

    ws.onopen = (ev) => {
      console.log("ev : ", ev.currentTarget);
    };

    ws.onmessage = (ev) => {
      const newMessageArray = [...messages, ev.data];
      setMessages(newMessageArray);
    };

  }, []);

  return (
    <div className=''>

      <header>
        <h1>Real Time Chat Application</h1>
      </header>

      <main>
        <input type="text" placeholder='write message...'  />
        <button onClick={sendMessage}>Send Message</button>

        <div className="message-container">
          {messages && messages.map((message) => (<p>{message}</p>))}
          <p>hello</p>
        </div>
      </main>

    </div>
  )
}

export default App