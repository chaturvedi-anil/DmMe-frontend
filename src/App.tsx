import  { useEffect, useRef, useState } from 'react';

const App = () => {
  const [messages, setMessages] = useState([]);
  const inputRef = useRef(null);
  const roomIdRef = useRef(null);
  const wsRef = useRef();

  const sendMessage = () => {
    if (!inputRef.current.value.trim()) {
      return;
    }

    wsRef.current.send(
      JSON.stringify({
        type: "chat",
        payload: {
          messages: inputRef.current?.value,
        },
      })
    );
    inputRef.current.value = ""; // Clear input field after sending
  };

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
     //@ts-ignore
    wsRef.current = ws;

    ws.onopen = () => {;
      ws.send(
        JSON.stringify({
          type: "join",
          payload: {
            //@ts-ignore
            roomId: roomIdRef.current.value,
          },
        })
      );
    };

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
      <header className="mb-4">
        <h1 className="text-2xl font-bold text-center">DmMe - Real Time Chat Application</h1>
      </header>
        <div className="w-full max-w-md">
          <input
            type="text"
            ref={roomIdRef}
            placeholder="Enter Room ID"
            className="w-full px-4 py-2 mb-4 border rounded-md"
          />
          <button
            onClick={() => {}}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Join Room
          </button>
        </div>
        <main className="w-full max-w-md">
          <div className="message-container h-64 bg-white border rounded-md overflow-y-scroll p-4 mb-4">
           

            <p> dsfd 
              {console.log("messages : ", messages)
              }
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="text"
              ref={inputRef}
              placeholder="Write message..."
              className="flex-1 px-4 py-2 border rounded-md"
            />
            <button
              onClick={sendMessage}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Send
            </button>
          </div>
        </main>
    </div>
  );
};

export default App;