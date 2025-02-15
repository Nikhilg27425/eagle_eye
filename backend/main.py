import cv2
import numpy as np
import base64
from fastapi import FastAPI, WebSocket, WebSocketDisconnect, File, UploadFile
from ultralytics import YOLO
import uvicorn
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change "*" to specific domains in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load YOLOv8 model
model = YOLO("ppe.pt")  # Ensure the model file exists

# Define filter classes and designated colors
filter_classes = ["NO-Hardhat", "NO-Safety Vest", "NO-Mask"]

colors = {
    "Hardhat": (0, 255, 0),        # Green
    "Mask": (0, 255, 255),         # Yellow-ish
    "NO-Hardhat": (6, 131, 254),   # Red
    "NO-Mask": (87, 254, 6),       # Green
    "NO-Safety Vest": (250, 1, 182),  # Dark Pink
    "Person": (255, 0, 0),         # Blue
    "Safety Cone": (255, 255, 0),  # Cyan
    "Safety Vest": (0, 255, 0),    # Green
    "machinery": (255, 0, 255),    # Magenta
    "vehicle": (255, 0, 255)       # Magenta
}

# Endpoint to upload the video file and save it
@app.post("/upload_video/")
async def upload_video(file: UploadFile = File(...)):
    try:
        uploaded_video_path = "uploaded_video.mp4"
        with open(uploaded_video_path, "wb") as f:
            f.write(await file.read())
        return {"message": "Video uploaded successfully"}
    except Exception as e:
        return {"error": str(e)}

# WebSocket endpoint to stream processed frames as soon as they're ready
@app.websocket("/ws/video_stream")
async def video_stream(websocket: WebSocket):
    await websocket.accept()
    try:
        # Open the uploaded video file
        cap = cv2.VideoCapture("uploaded_video.mp4")
        if not cap.isOpened():
            await websocket.send_text("Error: Cannot open video file")
            return

        while True:
            ret, frame = cap.read()
            if not ret:
                break

            # Run YOLO inference on the frame
            results = model(frame)
            for result in results:
                for box in result.boxes:
                    x1, y1, x2, y2 = map(int, box.xyxy[0])
                    conf = float(box.conf[0])
                    class_id = int(box.cls[0])
                    class_name = model.names[class_id]

                    # Only draw bounding box if the class is in our filter list and confidence >= 0.3
                    if class_name in filter_classes and conf >= 0.3:
                        color = colors.get(class_name, (0, 255, 0))
                        cv2.rectangle(frame, (x1, y1), (x2, y2), color, 2)
                        cv2.putText(frame, class_name, (x1, y1 - 10),
                                    cv2.FONT_HERSHEY_SIMPLEX, 0.5, color, 2)

            # Encode the processed frame to JPEG and then to base64
            _, buffer = cv2.imencode('.jpg', frame)
            frame_base64 = base64.b64encode(buffer).decode('utf-8')

            # Send the processed frame immediately
            await websocket.send_text(frame_base64)

    except WebSocketDisconnect:
        print("WebSocket disconnected")
    except Exception as e:
        print("Error:", e)
    finally:
        cap.release()
        await websocket.close()

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
