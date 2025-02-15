// import React from 'react'
// import mainimg from './image 1.png'
// import Navbar from './Navbar';
// import './App.css';
// import Footer from './Footer';
// import './Model1.css'
// import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
// import FACTORY from './burglary.png'

// const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";
// const GOOGLE_MAPS_API_KEY = "AIzaSyCTXX53Z7JgUVvMW4Cxy3wrpJt7rByKghg"; // 🔥 Replace with your API key
// const PEOPLE_THRESHOLD = 400;

// const Model3 = () => {
//   const [cameras, setCameras] = useState({});
//   const [images, setImages] = useState([]);
//   const [status, setStatus] = useState({});
//   const [loading, setLoading] = useState(true);

//   const hotspotLocation = { lat: 37.7749, lng: -122.4194 }; // San Francisco (Example)

//   return  (
//     <div className="App-wrapper ">
//       <div className="navbarbox">
//         <Navbar></Navbar>
      
//         </div>
//        <div className='mainbox'>
//           <div className='heading'><h2>Life Camera Footage</h2></div>
//           <img className='img-main' src={mainimg}></img>
          
//           <div className='text-box'>
//           <h1 style={{ textAlign: "center" }}>RISKY WORKPLACE MODEL</h1>
//           <div style={{display:'flex' } } >
//               <div className='boxes'>
//                 <img className='burglary' src={FACTORY}></img>
//               </div>
//               <div className='boxes' id='box2'>
//                 <div >
//                   <h2 className='location-heading'>
//                     Enter location
//                   </h2>
//                 </div>
//                 <div>
//                   <div className='label-box'>
//                     <label className='labels'>
//                       Address:
//                     </label>
//                     <input className='input-box'></input>
                   
//                   </div>
//                   </div>
                  
//                 <div>
//                   <div className='label-box'>
                    
//                     <label className='labels'>
//                       City:    
//                     </label>
                    
                    
                    
//                     <input className='input-box'></input>
//                   </div>
//                   </div>
                  
//                 <div>
//                   <div className='label-box'>
//                     <label className='labels'>
//                       State:
//                     </label>
                    
//                     <input className='input-box'></input>
//                   </div>
//                   </div>
                  
//                 <div>
//                   <div className='label-box'>
//                     <label className='labels'>
//                       Camera No.:
//                     </label>
                    
//                     <input className='input-box'></input>
//                   </div>
//                   </div>
                  
//                 <div >
//                   <button className='button'>
                   
//                     Enter
                      
//                       </button>
//                   </div>
                
//               </div>
//             </div>
//             <div className='prediction-box'>
//               <div className='prediction-head'><h2>Predicted Crime: </h2></div>
//               <div className='result-box'><input className='result-box'></input></div>
//             </div>
            
//             </div>
//             <button className='button' id='Report-button'>     Report
                     
//             </button>
          
//           </div>
        
//          <div className='footer-box'>
//           <Footer/>
//         </div>
//       </div>
    

   

//   )
// }

// export default Model3


// import React, { useState, useEffect } from 'react';
// import mainimg from './image 1.png';
// import Navbar from './Navbar';
// import './App.css';
// import Footer from './Footer';
// import './Model1.css';
// import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
// import FACTORY from './burglary.png';
// import axios from 'axios';

// const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";
// const GOOGLE_MAPS_API_KEY = "YOUR_GOOGLE_MAPS_API_KEY"; // Replace with your API key
// const PEOPLE_THRESHOLD = 400;

// const Model3 = () => {
//   const [cameras, setCameras] = useState({});
//   const [images, setImages] = useState([]);
//   const [status, setStatus] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [location, setLocation] = useState({ address: '', city: '', state: '', cameraNo: '' });

//   const hotspotLocation = { lat: 37.7749, lng: -122.4194 }; // San Francisco (Example)

//   useEffect(() => {
//     fetchData();
//     const interval = setInterval(fetchData, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   const fetchData = async () => {
//     try {
//       const [estimatesRes, statusRes] = await Promise.all([
//         axios.get(`${API_URL}/get_all_estimates`),
//         axios.get(`${API_URL}/status`),
//       ]);
      
//       setCameras(estimatesRes.data);
//       setStatus(statusRes.data);
//       fetchLatestImages();
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching data", error);
//       setLoading(false);
//     }
//   };

//   const fetchLatestImages = async () => {
//     try {
//       const res = await axios.get(`${API_URL}/images`);
//       if (Array.isArray(res.data.images)) {
//         setImages(res.data.images.slice(-5));
//       } else {
//         console.error("Invalid response format:", res.data);
//       }
//     } catch (error) {
//       console.error("Error fetching images", error);
//     }
//   };

//   return (
//     <div className="App-wrapper">
//       <div className="navbarbox">
//         <Navbar />
//       </div>
//       <div className='mainbox'>
//         <div className='heading'><h2>Live Camera Footage</h2></div>
//         <img className='img-main' src={mainimg} alt="Live Footage" />
        
//         <div className='text-box'>
//           <h1 style={{ textAlign: "center" }}>RISKY WORKPLACE MODEL</h1>
//           <div style={{ display: 'flex' }}>
//             <div className='boxes'>
//               <img className='burglary' src={FACTORY} alt="Factory Risk" />
//             </div>
//             <div className='boxes' id='box2'>
//               <h2 className='location-heading'>Enter location</h2>
//               {['Address', 'City', 'State', 'Camera No.'].map((field, index) => (
//                 <div key={index} className='label-box'>
//                   <label className='labels'>{field}:</label>
//                   <input className='input-box' value={location[field.toLowerCase().replace(' ', '')]} onChange={(e) => setLocation({ ...location, [field.toLowerCase().replace(' ', '')]: e.target.value })} />
//                 </div>
//               ))}
//               <button className='button'>Enter</button>
//             </div>
//           </div>
//           <div className='prediction-box'>
//             <h2 className='prediction-head'>Predicted Crime:</h2>
//             <input className='result-box' readOnly />
//           </div>
//         </div>
//         <button className='button' id='Report-button'>Report</button>
        
//         {/* Crowd Monitoring Data */}
//         <h2 className="subtitle">Crowd Monitoring Data</h2>
//         {loading ? (
//           <p>Loading data...</p>
//         ) : (
//           <div className="grid">
//             {Object.entries(cameras).map(([id, count]) => (
//               <div key={id} className="card">
//                 <h2 className="card-title">Camera: {id}</h2>
//                 <p className="card-text">People Count: {count}</p>
//                 <p className={`status ${status[id]?.status === "active" ? "active" : "inactive"}`}>
//                   Status: {status[id]?.status || "Unknown"}
//                 </p>
//                 <span className={`badge ${count > PEOPLE_THRESHOLD ? "destructive" : "default"}`}>
//                   {count > PEOPLE_THRESHOLD ? "High Alert" : "Normal"}
//                 </span>
//               </div>
//             ))}
//           </div>
//         )}
        
//         {/* Recent Images */}
//         <h2 className="subtitle">Recent Images</h2>
//         <div className="image-grid">
//           {images.map((img, index) => (
//             <img key={index} src={`${API_URL}/images/${img}`} alt="Crowd Snapshot" className="image" />
//           ))}
//         </div>
        
//         {/* Google Maps Integration */}
//         <h2 className="subtitle">Hotspot Location</h2>
//         <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
//           <GoogleMap mapContainerStyle={{ width: "100%", height: "400px" }} center={hotspotLocation} zoom={15}>
//             <Marker position={hotspotLocation} icon={{ url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png" }} />
//           </GoogleMap>
//         </LoadScript>
//       </div>
//       <div className='footer-box'>
//         <Footer />
//       </div>
//     </div>
//   );
// }

// export default Model3;



import React, { useEffect, useState } from "react";
import mainimg from "./image 1.png";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FACTORY from "./burglary.png";
import "./App.css";
import "./Model1.css";
import axios from "axios";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";
const GOOGLE_MAPS_API_KEY = "AIzaSyCTXX53Z7JgUVvMW4Cxy3wrpJt7rByKghg"; // Replace with a secure method
const PEOPLE_THRESHOLD = 400;

const Model3 = () => {
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
    <div className="App-wrapper">
      <div className="navbarbox">
        <Navbar />
      </div>

      <div className="mainbox">
        <div className="heading"><h2>Live Camera Footage</h2></div>
        <img className="img-main" src={mainimg} alt="Live Feed" />

        <div className="text-box">
          <h1 style={{ textAlign: "center" }}>RISKY WORKPLACE MODEL</h1>
          <div style={{ display: "flex" }}>
            <div className="boxes">
              <img className="burglary" src={FACTORY} alt="Factory" />
            </div>
            <div className="boxes" id="box2">
              <h2 className="location-heading">Enter location</h2>
              <div className="label-box">
                <label className="labels">Address:</label>
                <input className="input-box" />
              </div>
              <div className="label-box">
                <label className="labels">City:</label>
                <input className="input-box" />
              </div>
              <div className="label-box">
                <label className="labels">State:</label>
                <input className="input-box" />
              </div>
              <div className="label-box">
                <label className="labels">Camera No.:</label>
                <input className="input-box" />
              </div>
              <button className="button">Enter</button>
            </div>
          </div>

          <div className="prediction-box">
            <h2 className="prediction-head">Predicted Crime:</h2>
            <input className="result-box" readOnly />
          </div>
        </div>
        
        <button className="button" id="Report-button">Report</button>
        
        <h2 className="subtitle">Recent Images</h2>
        <div className="image-grid">
          {images.map((img, index) => (
            <img key={index} src={`${API_URL}/images/${img}`} alt="Crowd Snapshot" className="image" />
          ))}
        </div>

        <h2 className="subtitle">Hotspot Location</h2>
        <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "400px" }}
            center={hotspotLocation}
            zoom={15}
          >
            <Marker position={hotspotLocation} icon={{ url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png" }} />
          </GoogleMap>
        </LoadScript>
      </div>

      <div className="footer-box">
        <Footer />
      </div>
    </div>
  );
};

export default Model3;
