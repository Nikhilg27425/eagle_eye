

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import mainimg from "./image 1.png";
import Navbar from "./Navbar";
import "./App.css";
import Footer from "./Footer";
import burglary from "./burglary.png";
import './Model2.css'

function CrimePrevention() {
  const [uploadStatus, setUploadStatus] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(null);
  const wsRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [classResult, setClassResult] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    state: "",
    cameraNo: "",
  });

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:8001/video_feed");

    ws.current.onmessage = (event) => {
      const ctx = canvasRef.current.getContext("2d");
      const img = new Image();
      img.src = `data:image/jpeg;base64,${event.data}`;

      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height);
      };
    };

    ws.current.onclose = () => console.log("WebSocket closed");

    return () => ws.current.close();
  }, []);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Upload the video file to the backend
  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a video file!");
      return;
    }
    const formData = new FormData();
    formData.append("file", selectedFile);
    setUploadStatus("Uploading...");
    try {
      const response = await axios.post("http://localhost:8001/upload_video/", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      setUploadStatus("Upload successful. Starting stream...");
      startStream();
    } catch (error) {
      console.error("Upload error:", error);
      setUploadStatus("Upload failed.");
    }
  };

  // Open a WebSocket connection to receive processed frames
  const startStream = () => {
    wsRef.current = new WebSocket("ws://localhost:8001/ws/video_stream");
    wsRef.current.onmessage = (event) => {
      // Update the current frame using the base64 string received
      const frameData = event.data;
      setCurrentFrame(`data:image/jpeg;base64,${frameData}`);
    };
    wsRef.current.onclose = () => {
      console.log("WebSocket closed");
      setStreaming(false);
    };
    wsRef.current.onerror = (err) => {
      console.error("WebSocket error:", err);
      setStreaming(false);
    };
    setStreaming(true);
  };

  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     setSelectedFile(file);
  //   }
  // };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const startStreaming = () => {
    if (!selectedFile) {
      alert("Please select a video file first!");
      return;
    }

    const video = videoRef.current;
    video.src = URL.createObjectURL(selectedFile);
    video.play();
    setIsPlaying(true);

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    video.onloadeddata = () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvasRef.current.width = video.videoWidth;
      canvasRef.current.height = video.videoHeight;

      const sendFrame = () => {
        if (video.paused || video.ended) return;

        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const frameData = canvas.toDataURL("image/jpeg").split(",")[1];

        if (ws.current.readyState === WebSocket.OPEN) {
          ws.current.send(frameData);
        }

        requestAnimationFrame(sendFrame);
      };

      sendFrame();
    };
  };

  const togglePlayback = () => {
    const video = videoRef.current;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="App-wrapper">
      <div className="navbarbox">
        <Navbar />
      </div>
      <div className="mainbox">
       

        {/* Replacing only the image section with video + canvas */}
        <div className="video-container">
          <video ref={videoRef} style={{ width: "50vw", border: "1px solid #000" ,padding:"2px"}} className="video-stream" controls />
          <canvas ref={canvasRef} className="overlay-canvas" />
        </div>

        <div className="text-box" id="text-box-model2">
          <h1 style={ { textAlign: "right" }}>CRIME PREVENTION MODEL</h1>
          <div style={{ display: "flex" }}>
            <div className="boxes" id="box2">
              <h2 className="location-heading">Enter location</h2>
              <div className="label-box">
                <label className="labels">Address:</label>
                <input className="input-box" name="address" value={formData.address} onChange={handleInputChange} />
              </div>
              <div className="label-box">
                <label className="labels">City:</label>
                <input className="input-box" name="city" value={formData.city} onChange={handleInputChange} />
              </div>
              <div className="label-box">
                <label className="labels">State:</label>
                <input className="input-box" name="state" value={formData.state} onChange={handleInputChange} />
              </div>
              <div className="label-box">
                <label className="labels">Camera No.:</label>
                <input className="input-box" name="cameraNo" value={formData.cameraNo} onChange={handleInputChange} />
              </div>
              <div className="file-input">
                <input type="file" onChange={handleFileChange} accept="video/*" />
              </div>
              <button className="button"  id="start" onClick={startStreaming}>Start Detection</button>
              <button className="button" onClick={togglePlayback}>
                {isPlaying ? "Pause" : "Resume"}
              </button>
            </div>
          </div>
          <div className="prediction-box" id="model2-pbox">
          <input type="file" className="upload-btn" accept="video/*" onChange={handleFileChange} />
          <button className="button"id="uplaod" onClick={handleUpload}>Upload and Start Streaming</button>
          <p>{uploadStatus}</p>
          {streaming && currentFrame && (
            <div className="result">
              <h3>Processed Video Stream</h3>
              <img  src={currentFrame} alt="Processed Frame" style={{ width: "35vw", border: "1px solid #000",position:"absolute",bottom:"-30%",left:"120%" ,border:"2px solid"}} />
            </div>
          )}
           
            
          </div>
        </div>
       
      </div>
      <div className="footer-box">
        <Footer />
      </div>
    </div>
  );
}

export default CrimePrevention;
