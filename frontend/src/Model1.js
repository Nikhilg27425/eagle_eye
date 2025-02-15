import React, { useState } from 'react';
import axios from 'axios';
import mainimg from './image 1.png'
import Navbar from './Navbar';
import './App.css';
import Footer from './Footer';
import './Model1.css'
import burglary from './burglary.png'


function CrimePrevention() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [response, setResponse] = useState(null);
  const [classResult, setClassResult] = useState('');
  const [previewImage, setPreviewImage] = useState(null) ;
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    state: '',
    cameraNo: '',
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file)); // Generate a preview URL only if the file exists
    } else {
      setPreviewImage(null); // Reset the preview if no file is selected
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onload = async () => {
      const base64Image = reader.result.split(",")[1];
      try {
        const response = await axios({
          method: "POST",
          url: "https://detect.roboflow.com/weapon-detection-m7qso/1",
          params: { api_key: "rQkKc7I3KjqXp4nLgvN8" },
          data: base64Image,
          headers: { "Content-Type": "application/x-www-form-urlencoded" }
        });
        const resultClass = response.data.predictions?.[0]?.class || 'No crime detected';
        setClassResult(resultClass);
        setResponse(response.data);
      } catch (error) {
        console.error("Error uploading file:", error);
        setClassResult('Error in detection');
      }
    };
  };

  return (
    <div className="App-wrapper">
      <div className="navbarbox">
        <Navbar />
      </div>
      <div className="mainbox">
        <div className="heading">
          <h2>Life Camera Footage</h2>
        </div>
        
       <img className="img-main" src={mainimg} alt="Main" />
      

        <div className="text-box">
          <h1 style={{ textAlign: "center" }}>CRIME PREVENTION MODEL</h1>
          <div style={{ display: 'flex' }}>
            <div className="boxes">
            <img className="burglary" src={previewImage || burglary} alt="Burglary" />
              {/* <img className="burglary" src={burglary} alt="Burglary" /> */}
            </div>
            <div className="boxes" id="box22">
              {/* <h2 className="location-heading">Enter location</h2>
              <div className="label-box">
                <label className="labels">Address:</label>
                <input
                  className="input-box"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>
              <div className="label-box">
                <label className="labels">City:</label>
                <input
                  className="input-box"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                />
              </div>
              <div className="label-box">
                <label className="labels">State:</label>
                <input
                  className="input-box"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                />
              </div> */}
              {/* <div className="label-box">
                <label className="labels">Camera No.:</label>
                <input
                  className="input-box"
                  name="cameraNo"
                  value={formData.cameraNo}
                  onChange={handleInputChange}
                />
              </div> */}
              <div className="file-input">
                <input type="file" onChange={handleFileChange} accept="image/*" />
              </div>
              <button className="button" onClick={handleUpload}>Enter</button>
            </div>
          </div>
          <div className="prediction-box">
            <div className="prediction-head">
              <h2>Predicted Crime:</h2>
            </div>
            {/* {response && (
              <div className="mt-4 p-4 bg-gray-100 rounded">
                <h3 className="text-lg font-bold">Detection Result:</h3>
                <pre>{JSON.stringify(response, null, 2)}</pre>
              </div>
            )} */}
            <div className="result-box">
            <input className="result-box" id="result_one" value={classResult} readOnly />
            </div>
          </div>
        </div>
        {/* <button className="button" id="Report-button">Report</button> */}
      </div>
      <div className="footer-box">
        <Footer />
      </div>
    </div>
  );
}

export default CrimePrevention;