
import React, { useEffect, useState } from "react";
import mainimg from "./image 1.png";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FACTORY from "./burglary.png";
import "./App.css";
import "./Model3.css"; // Updated CSS file
import axios from "axios";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";
const GOOGLE_MAPS_API_KEY = "AIzaSyCTXX53Z7JgUVvMW4Cxy3wrpJt7rByKghg"; // Replace with a secure method
const PEOPLE_THRESHOLD = 400;

const UpdatedModel3 = () => {
  const [cameras, setCameras] = useState({});
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState({});
  const [loading, setLoading] = useState(true);
  const hotspotLocation = { lat: 37.7749, lng: -122.4194 }; // Example location

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      const [estimatesRes, statusRes, imagesRes] = await Promise.all([
        axios.get(`${API_URL}/get_all_estimates`),
        axios.get(`${API_URL}/status`),
        axios.get(`${API_URL}/images`),
      ]);
      setCameras(estimatesRes.data);
      setStatus(statusRes.data);
      if (Array.isArray(imagesRes.data.images)) {
        setImages(imagesRes.data.images.slice(-5));
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data", error);
      setLoading(false);
    }
  };

  return (
    <div className="page">
    <div className="updated-app-wrapper">
      <div className="updated-navbarbox">
        <Navbar />
      </div>

      <div className="updated-mainbox">
        <div style={{ backgroundColor: "#3A5371" }} className="updated-text-box">
          <h1 style={{ textAlign: "center", color: "white" }}>
            CROWD PREDICTION MODEL
          </h1>
          {/* <div style={{ display: "flex" }}>
            <div className="updated-boxes" id="updated-box2">
              <h2 className="updated-location-heading">Enter location</h2>
              <div className="updated-label-box">
                <label className="updated-labels">Camera No.:</label>
                <input className="updated-input-box" />
              </div>
              <div className="updated-status">
                <p>Status: active</p>
              </div>
              <div className="updated-count">
                <p>Count: 0</p>
              </div>
              <button className="updated-button">Enter</button>
            </div>
          </div> */}
          <div className="boxes3" id="box2">
              <div className="label-box3">
                <label className="labels3">Camera No.:</label>
                <input
                  className="input-box3"
                  name="cameraNo"
                />
              </div>
              <div className="label-box3">
                <label className="labels3">Status:active</label>
              </div>
              <div className="label-box3">
                <label className="labels3">Count:0</label>
              </div>
              
              </div>
        </div>

        <div className="updated-rec-img" style={{ color: "white" }}>
          <h2 className="updated-subtitle">Recent Images</h2>
          <div className="updated-image-grid">
            {images.map((img, index) => (
              <img
                key={index}
                src={`${API_URL}/images/${img}`}
                alt="Crowd Snapshot"
                className="updated-image"
              />
            ))}
          </div>
        </div>

        <div className="updated-hotspot" style={{ color: "white" }}>
          <h2 className="updated-subtitle">Hotspot Location</h2>
          <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
            <GoogleMap
              mapContainerStyle={{ width: "100%", height: "400px" }}
              center={hotspotLocation}
              zoom={15}
            >
              <Marker
                position={hotspotLocation}
                icon={{
                  url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
                }}
              />
            </GoogleMap>
          </LoadScript>
        </div>
      </div>

      <div className="updated-footer-box">
        <Footer />
      </div>
    </div>
    </div>
  );
};

export default UpdatedModel3;
