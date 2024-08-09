const { spawn } = require("child_process");
const YOUTUBE_RTMP_BASE = "rtmp://a.rtmp.youtube.com/live2";
const User = require('../modals/user.modal');

async function handleSocketIO(io) {
  io.on("connection", async (socket) => {
    if (!socket.request.user) {
      console.log("No user found");
      return;
    }

    try {
      const userId = socket.request.user._id;
      const updateStream = await User.findByIdAndUpdate(userId, { isStreaming: true });
      console.log(updateStream.youtube_api);

      if (!updateStream.youtube_api || updateStream.youtube_api.length !== 24 || !/^[a-zA-Z0-9_-]+$/.test(updateStream.youtube_api)) {
        console.log("YouTube API key is invalid or not found");
        socket.emit('streamError', 'YouTube API key is invalid or not found');
        return;
      }

      console.log("A user connected:", socket.request.user.username);

      let currentText = 'Score Updates will be here.';

      const startFfmpegProcess = () => {
        const ffmpegArgs = [
          "-i",
          "pipe:0",
          "-vf",
          "drawtext=text='Player Name: %{player_name}':x=10:y=10:fontsize=24:fontcolor=white:box=1:boxcolor=black@0.5," +
          "drawtext=text='Score: %{score}':x=10:y=50:fontsize=24:fontcolor=white:box=1:boxcolor=black@0.5," +
          "drawtext=text='Other Text: %{other_text}':x=10:y=90:fontsize=24:fontcolor=white:box=1:boxcolor=black@0.5",
          "-c:v",
          "libx264",
          "-preset",
          "veryfast",
          "-b:v",
          "750k",
          "-maxrate",
          "750k",
          "-bufsize",
          "1500k",
          "-pix_fmt",
          "yuv420p",
          "-g",
          "50",
          "-c:a",
          "aac",
          "-b:a",
          "128k",
          "-ar",
          "44100",
          "-f",
          "flv",
          `${YOUTUBE_RTMP_BASE}/${updateStream.youtube_api}`
        ];

        let ffmpegProcess = spawn("ffmpeg", ffmpegArgs);

        ffmpegProcess.stdin.on('error', (err) => {
          console.error('FFmpeg stdin error:', err);
          socket.emit('streamError', 'FFmpeg process error');
        });

        ffmpegProcess.on("exit", (code, signal) => {
          if (code === 0) {
            console.log("Stream successfully sent to YouTube");
          } else {
            console.error(`FFmpeg process exited with code ${code} and signal ${signal}`);
          }
        });

        ffmpegProcess.on("error", (error) => {
          console.error("FFmpeg process error:", error);
          socket.emit('streamError', 'FFmpeg process error');
        });

        return ffmpegProcess;
      };

      let ffmpegProcess = startFfmpegProcess();

      socket.on("binarystream", async (stream) => {
        try {
          console.log("Received binary stream");
          ffmpegProcess.stdin.write(stream);
        } catch (error) {
          console.error("Error writing to FFmpeg stdin:", error);
          ffmpegProcess.stdin.end();
          socket.emit('streamError', 'Error processing stream');
        }
      });

      const updateTextInterval = setInterval(() => {
        currentText = `Updated text at ${new Date().toLocaleTimeString()}`;
        console.log(`Updating text to: ${currentText}`);

        // Restart the ffmpeg process with updated text
        ffmpegProcess.stdin.end();
        ffmpegProcess.kill('SIGINT');
        ffmpegProcess = startFfmpegProcess();
      }, 30000);

      socket.on("endStream", async () => {
        try {
          console.log("Stream has been ended by client");
          await User.findByIdAndUpdate(userId, { isStreaming: false });
        } catch (error) {
          console.error("Error updating stream status:", error);
        } finally {
          ffmpegProcess.stdin.end();
          ffmpegProcess.kill('SIGINT');
          clearInterval(updateTextInterval);
        }
      });

      socket.on("disconnect", async () => {
        try {
          console.log("User disconnected");
          await User.findByIdAndUpdate(userId, { isStreaming: false });
        } catch (error) {
          console.error("Error updating stream status on disconnect:", error);
        } finally {
          ffmpegProcess.stdin.end();
          ffmpegProcess.kill('SIGINT');
          clearInterval(updateTextInterval);
        }
      });

    } catch (error) {
      console.error("Error in socket connection handler:", error);
      socket.emit('streamError', 'Internal server error');
    }
  });
}

module.exports = handleSocketIO;
