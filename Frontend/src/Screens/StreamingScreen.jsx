import { useState } from 'react';
import io from 'socket.io-client';
import VideoStream from '../Components/VideoStream';
import SocaialBox from '../Components/SocialBox'
import { toast } from 'react-toastify';

const App = () => {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const [platform, setplatform] = useState('');

  const connectSocket = () => {
    const token = localStorage.getItem("atoken");

    if (!token) {
      console.error("No authentication token found");
      return;
    }

    const newSocket = io('http://localhost:3000', {
      auth: {
        token
      },
      transports: ['websocket', 'polling'],
      withCredentials: true,
      reconnection: true,
      reconnectionAttempts: 3,
      reconnectionDelay: 1000
    });

    newSocket.on('connect', () => {
      console.log('Connected to server');
      toast("Connected to server")
      setConnected(true);
    });
    
    newSocket.on('disconnect', () => {
      console.log('Disconnected from server');
      toast("Disconnected from server")
      setConnected(false);
    });
    
    newSocket.on('streamError', (error) => {
      toast.error(error || "Something went wrong")
      console.error('Stream error:', error);
      setConnected(false)
    });
    
    newSocket.on('connect_error', (err) => {
      toast(err.message || "Something went Wrong")
      console.error(`Connection Error: ${err.message}`);
    });

    setSocket(newSocket);
  };

  const disconnectSocket = () => {
    if (socket) {
      socket.disconnect();
      setSocket(null);
      setConnected(false);
    }
  };

  console.log(platform)

  return (
    <div className="flex flex-col items-center h-[40rem] pt-20">
      {!connected ? (
        <>
        <h1 className="text-2xl font-bold pb-5">Choose Platform for stream</h1>
        <SocaialBox connect={connectSocket} selectplatform={setplatform} />
        </>
        // <button
        //   onClick={connectSocket}
        //   className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        // >
        //   Connect
        // </button>
      ) : (
        <>
        <h1 className="text-2xl font-bold pb-5">Click on turn on camera and start stream</h1>
        <button
          onClick={disconnectSocket}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
          Disconnect
        </button>
        </>
      )}
      {connected && socket && <VideoStream socket={socket} platform={platform} />}
    </div>
  );
};

export default App;
