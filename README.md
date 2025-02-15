#  CCTV Surveillance with AI
##  Overview
CCTV Surveillance with AI is an advanced security and monitoring system that integrates deep learning models to enhance real-time surveillance capabilities. This project leverages AI to detect safety violations, identify weapons, and monitor locations through live video feeds, all integrated into a user-friendly web interface with Google Maps visualization.

## Table of Contents
1. [Introduction](#introduction)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
   - [Backend](#backend)
   - [AI Models](#ai-models)
4. [How It Works](#how-it-works)
   - [Standard API Usage](#standard-api-usage)
   - [Execution Flow](#execution-flow)
5. [Frontend](#frontend)
6. [Setup](#setup)
7. [Future Enhancements](#future-enhancements)
8. [Contributors](#contributors)
9. [License](#license)
10. [Contact](#contact)

##  Introduction
CCTV surveillance systems have traditionally been used for passive monitoring, requiring human operators to detect and respond to incidents. However, integrating Artificial Intelligence (AI) and Machine Learning (ML) with these networks transforms them into proactive security and monitoring systems capable of real-time analysis and automated decision-making.

This project enhances crowd management, crime prevention, and workplace monitoring by leveraging AI-powered video analysis. Instead of relying on manual observation, AI can analyze live footage, recognize patterns, detect threats, and trigger alerts, making security measures more efficient and responsive.




##  Features
- **Construction Site Safety Monitoring:** Identifies workers without safety gear such as helmets, vests, and masks.
- **Weapon Detection:** Instantly detects weapons in surveillance footage using a dedicated API.
- **Live CCTV Monitoring:** Captures frames from live video feeds, tracks camera status, and provides real-time updates.
- **Google Maps Integration:** Displays CCTV camera locations and marks red hotspots based on security alerts.
- **Fast API Integration:** Optimized API services for efficient processing and seamless frontend-backend communication.
- **Web-based Dashboard:** Provides an intuitive and interactive user interface for easy monitoring.

---

## Tech Stack

###  Backend
- **FastAPI:** For building robust and high-performance RESTful APIs.
- **Uvicorn:** ASGI server for running FastAPI applications.
- **OpenCV:** Image processing and real-time frame extraction.
- **Ultralytics YOLO:** Pretrained deep learning model for object detection.
- **WebSockets:** Enables real-time communication between backend and frontend.

###  AI Models
#### **Model 1: Weapon Detection**
- Uses a third-party API to detect weapons in live footage.
- Integrated directly with the frontend via JSON API requests.
- Top-priority alerts are triggered upon detection.

#### **Model 2: Worker Safety Violation Detection**
- Utilizes a **pretrained YOLO model** to identify workers violating safety protocols.
- Detects missing safety gear such as helmets, vests, and masks.
- **Technologies Used:** Ultralytics YOLO, OpenCV for frame extraction.
- Exposed via **FastAPI** with a dedicated WebSocket and POST request endpoint.
- Configurable to return either individual frames or full videos.
- Runs on **port 8001**, compiled using **Uvicorn**.

#### **Model 3: CCTV Monitoring & Camera Status Tracking**
- Tracks cameras by **ID, location, status, and threshold violations** on port 8001.
- Captures images from CCTV feeds every **1 minute** and displays them on the frontend.
- **Google Maps API integration:** Red hotspots indicate alert zones.
- **Backend API:** Uses `client.py` for video capture and `main.py` for processing.
- **FastAPI framework** handles model loading, predictions, and API requests.
- Uses **OpenCV for real-time video processing**.

---

##  How It Works
### Standard API Usage
- All models operate via **POST requests**.
- **Weapon Detection API** returns results instantly.
- **Safety Violation API** processes video frames and responds with annotated frames.
- **CCTV Monitoring API** updates are on website with camera feed snapshots every minute.

### Execution Flow
#### **Model 1 (Weapon Detection)**
1. Live API request from frontend.
2. API processes frame and detects weapons.
3. Alerts triggered on the web interface.

#### **Model 2 (Construction Worker Safety Monitoring)**
1. **FastAPI backend** loads the YOLO model.
2. WebSockets enable real-time communication.
3. OpenCV extracts frames from live video.
4. Annotated frames are returned to the frontend.
5. Optionally returns full videos.
6. Runs on **port 8001**.

#### **Model 3 (Crowd Monitoring & Tracking)**
1. **Terminal 1:** Start FastAPI server (`uvicorn` runs on **port 8000**).
2. **Terminal 2:** Run `client.py` (captures video frames and sends to `main.py`).
3. OpenCV processes frames and updates the frontend with recent images.
4. **Google Maps API** visualizes camera locations and hotspots.

---

##  Frontend
- **Fully customized and API-integrated** for a seamless experience.
- **Interactive dashboard** with real-time surveillance updates.
- **Google Maps embedded view** for geographical monitoring.
- **Easy-to-use interface** for security personnel and operators.

---

##  Installation & Setup

### Steps
1. **Clone the repository**
   ```bash
   git clone https://github.com/Nikhilg27425/eagle_eye.git
   cd eagle_eye.git
   ```
2. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```
3. **Change the directory to backend and run the backend for model_2 on port 8001**
   ```bash
   cd backend
   uvicorn main:app --host 0.0.0.0 --port 8001 --reload
   ```
3. **Open another terminal and Change the directory to backend_dh and run the backend for model_3 on port 8000**
   ```bash
   cd backend_dh
   uvicorn main:app --host 0.0.0.0 --port 8000 --reload
   ```
4. **Start the Client for Video Capture on another terminal**
   ```bash
   cd backend_dh
   python client.py
   ```
5. **Launch the Frontend**
   ```bash
   cd frontend
   npm run start
   ```
   
   - Ensure API endpoints are correctly configured.

---

## Future Enhancements
- **Facial Recognition**: Identify specific individuals from surveillance footage.
- **Enhanced-Anomaly Detection**: AI-based detection for more unusual behaviors.
- **Cloud Storage Integration**: Securely store and retrieve surveillance footage.

---

##  Contributors
- **Dhruv Sangal** - Integration, Deployment and Team Coordination
- **Nikhil Gupta** - Backend API Development & UI Design
- **Khushi Singhal** - Frontend Development
- **Dhyanesh Anchula** - AI Model Development for Crowd Management
- **Aditya Sharma** - AI Model Development For Construction Site

---

##  License
This project is licensed under the **MIT License** - see the [LICENSE](LICENSE.unknown) file for details.


---

##  Contact
For any inquiries or collaborations, reach out to:
📧 Email: 23UCS752@lnmiit.ac.com
📌 GitHub: [Nikhil Gupta](https://github.com/Nikhilg27425)

---

## Video for reference
[Video](https://drive.google.com/file/d/1AnQvnPNLBdUuEN7PmX_lZ-t64Qv0pSF6/view)


---

🔹 _Enhancing security with AI-powered surveillance!_ 🚀
