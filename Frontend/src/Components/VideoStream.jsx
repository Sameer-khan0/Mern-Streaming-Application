import { useState, useRef, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FaVideo, FaVideoSlash } from 'react-icons/fa';

const VideoStream = ({ socket }) => {
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [mediaStream, setMediaStream] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const userCamVidRef = useRef(null);

  useEffect(() => {
    if (socket) {
      socket.on('connect', () => {
        toast.success("Conneted for Stream")
        console.log('VideoStream component connected to server');
      });
      
      socket.on('disconnect', () => {
        toast.success("Disconnected for Stream")
        console.log('VideoStream component disconnected from server');
        stopStream();
      });
      
      socket.on('connect_error', (err) => {
        toast.success(err.message || "Something Went Wrong")
        console.error("VideoStream connection error" || err.message);
      });

      return () => {
        if (socket) {
          socket.off('connect');
          socket.off('disconnect');
          socket.off('connect_error');
        }
      };
    }
  }, [socket]);

  const handleTestCamera = async () => {
    if (!isCameraOn) {
      try {
        const media = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: { aspectRatio: 16 / 9 },
        });
        setMediaStream(media);
        userCamVidRef.current.srcObject = media;
        setIsCameraOn(true);
      } catch (error) {
        console.error("Failed to access the camera:", error);
      }
    } else {
      stopStream();
    }
  };

  const handleStartLive = () => {
    toast.success("live video is Started")
    if (mediaStream) {
      if (!mediaRecorder) {
        const recorder = new MediaRecorder(mediaStream, {
          audioBitsPerSecond: 128000,
          videoBitsPerSecond: 2500000,
          framerate: 25,
        });

        recorder.ondataavailable = (ev) => {
          console.log("Binary Stream Available: ", ev.data);
          socket.emit("binarystream", ev.data);
        };
        recorder.start(100);
        setMediaRecorder(recorder);
      } else {
        if (mediaRecorder.state === "recording") {
          mediaRecorder.pause();
        } else if (mediaRecorder.state === "paused") {
          mediaRecorder.resume();
        }
      }
    } else {
      console.error("Media stream is not available.");
    }
  };
  
  const handleEndStream = () => {
    toast.success("live video is Ended")
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
      mediaRecorder.stop();
      setMediaRecorder(null);
    }
    stopStream();
    socket.emit("endStream");
  };

  const stopStream = () => {
    if (mediaStream) {
      toast.success("Stream is Stoped")
      mediaStream.getTracks().forEach((track) => track.stop());
      userCamVidRef.current.srcObject = null;
      setIsCameraOn(false);
      setMediaStream(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-8">
      {/* Video Stream Container */}
      <div className="relative w-full h-96 mb-4">
        <video ref={userCamVidRef} className="absolute inset-0 w-full h-full object-cover" muted autoPlay></video>
        {!isCameraOn && (
          <div className="absolute inset-0 flex items-center justify-center text-4xl text-gray-400">
            <FaVideoSlash />
          </div>
        )}
        {isCameraOn && (
          <div className="absolute inset-0 flex items-center justify-center text-4xl text-green-500">
            <FaVideo />
          </div>
        )}
      </div>
      
      {/* Controls Panel */}
      <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
        <button
          onClick={handleStartLive}
          className={`px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition ${!isCameraOn ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={!isCameraOn}
        >
          Start Live
        </button>
        <button
          onClick={handleTestCamera}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
        >
          {isCameraOn ? "Turn Off Camera" : "Turn On Camera"}
        </button>
        <button
          onClick={handleEndStream}
          className={`px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition ${!mediaRecorder || mediaRecorder.state === "inactive" ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={!mediaRecorder || mediaRecorder.state === "inactive"}
        >
          End Live Stream
        </button>
      </div>
    </div>
  );
};

export default VideoStream;
