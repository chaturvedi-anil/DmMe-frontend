import { useRef } from 'react'

//@ts-ignore
const ChatPage = ({sendMessage, messages, inputRef}) => {
  
  return (
    <main className="w-full max-w-md">
    <div className="message-container h-64 bg-white border rounded-md overflow-y-scroll p-4 mb-4">
      {messages && 
        messages.map((message:string, index:number) => <p key={index}>{message}</p>)
      }
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
  )
}

export default ChatPage