import { useRef } from 'react'

//@ts-ignore
const RoomJoinPage = ({joinChatRoom, roomIdRef}) => {
  
  return (
    <div>
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
          onClick={joinChatRoom}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Join Room
        </button>
      </div>
    </div>
  )
}

export default RoomJoinPage