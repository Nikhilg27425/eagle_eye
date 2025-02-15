from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware  # ✅ Import CORS Middleware
from pydantic import BaseModel
from typing import Dict
import time
import os
import glob
from fastapi.responses import FileResponse
from fastapi.responses import FileResponse, JSONResponse

app = FastAPI()

# ✅ Enable CORS for frontend (React running on port 3000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this to specific domains in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

IMAGE_DIR = "./images"
os.makedirs(IMAGE_DIR, exist_ok=True)

estimates: Dict[str, float] = {}
last_heartbeat: Dict[str, float] = {}

HEARTBEAT_TIMEOUT = 120  # ✅ If no update in 10 min, mark as inactive

class Estimate(BaseModel):
    id: str
    count: float

@app.post("/update_estimate")
def update_estimate(data: Estimate):
    estimates[data.id] = data.count
    last_heartbeat[data.id] = time.time()  # ✅ Store last update time
    return {"message": "Updated successfully"}

@app.post("/upload_image/{id}")
async def upload_image(id: str, file: UploadFile = File(...)):
    filename = f"{id}_{int(time.time())}.webp"  # ✅ Use WebP instead of JPEG
    file_path = os.path.join(IMAGE_DIR, filename)

    with open(file_path, "wb") as img_file:
        img_file.write(file.file.read())

    return {"message": "Image uploaded successfully", "image_url": f"/images/{filename}"}


@app.get("/images")
def get_all_images():
    """Returns a list of all image filenames"""
    if not os.path.exists(IMAGE_DIR):
        return JSONResponse(content={"images": []}, status_code=200)
    
    image_files = [f for f in os.listdir(IMAGE_DIR) if f.endswith((".webp", ".jpg", ".png"))]
    
    return {"images": image_files}  # ✅ Ensure it returns {"images": [...]}

@app.get("/images/{filename}")
def get_image(filename: str):
    """Returns a specific image file"""
    file_path = os.path.join(IMAGE_DIR, filename)
    if os.path.exists(file_path):
        return FileResponse(file_path)
    return JSONResponse(content={"error": "File not found"}, status_code=404)


@app.get("/status")
def check_status():
    """ ✅ Returns the status of all connected cameras """
    current_time = time.time()
    status_report = {}

    for cam_id, last_time in last_heartbeat.items():
        status = "active" if (current_time - last_time) < HEARTBEAT_TIMEOUT else "inactive"
        status_report[cam_id] = {"status": status, "last_seen": int(last_time)}

    return status_report

def cleanup_old_images():
    now = time.time()
    for img_file in glob.glob(f"{IMAGE_DIR}/*.webp"):  # ✅ Cleanup only WebP images
        if now - os.path.getctime(img_file) > 1:#7 * 86400:  # 7 days
            os.remove(img_file)
            print(f"Deleted old image: {img_file}")

@app.get("/get_all_estimates")
def get_all_estimates():
    """ ✅ RESTORED: Get estimates for all cameras """
    return estimates

@app.on_event("startup")
async def startup_event():
    cleanup_old_images()


# from fastapi import FastAPI, UploadFile, File, WebSocket, WebSocketDisconnect
# from fastapi.middleware.cors import CORSMiddleware
# from fastapi.responses import FileResponse, JSONResponse
# from pydantic import BaseModel
# from typing import Dict
# import time
# import os
# import glob
# import cv2
# import base64
# from ultralytics import YOLO
# import uvicorn

# app = FastAPI()

# # ✅ Enable CORS for frontend (React running on port 3000)
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],  # Change this to specific domains in production
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # Directories
# IMAGE_DIR = "./images"
# os.makedirs(IMAGE_DIR, exist_ok=True)

# # YOLOv8 Model
# model = YOLO("ppe.pt")  # Ensure the model file exists
# filter_classes = ["NO-Hardhat", "NO-Safety Vest", "NO-Mask"]
# colors = {
#     "NO-Hardhat": (6, 131, 254),  # Red
#     "NO-Mask": (87, 254, 6),       # Green
#     "NO-Safety Vest": (250, 1, 182)  # Dark Pink
# }

# # Tracking Variables
# estimates: Dict[str, float] = {}
# last_heartbeat: Dict[str, float] = {}
# HEARTBEAT_TIMEOUT = 120  # Mark inactive after 2 min

# class Estimate(BaseModel):
#     id: str
#     count: float

# @app.post("/update_estimate")
# def update_estimate(data: Estimate):
#     estimates[data.id] = data.count
#     last_heartbeat[data.id] = time.time()
#     return {"message": "Updated successfully"}

# @app.post("/upload_image/{id}")
# async def upload_image(id: str, file: UploadFile = File(...)):
#     filename = f"{id}_{int(time.time())}.webp"
#     file_path = os.path.join(IMAGE_DIR, filename)
#     with open(file_path, "wb") as img_file:
#         img_file.write(file.file.read())
#     return {"message": "Image uploaded successfully", "image_url": f"/images/{filename}"}

# @app.get("/images")
# def get_all_images():
#     image_files = [f for f in os.listdir(IMAGE_DIR) if f.endswith((".webp", ".jpg", ".png"))]
#     return {"images": image_files}

# @app.get("/images/{filename}")
# def get_image(filename: str):
#     file_path = os.path.join(IMAGE_DIR, filename)
#     if os.path.exists(file_path):
#         return FileResponse(file_path)
#     return JSONResponse(content={"error": "File not found"}, status_code=404)

# @app.get("/status")
# def check_status():
#     current_time = time.time()
#     return {cam_id: {"status": "active" if (current_time - last_time) < HEARTBEAT_TIMEOUT else "inactive"} for cam_id, last_time in last_heartbeat.items()}

# @app.get("/get_all_estimates")
# def get_all_estimates():
#     return estimates

# @app.post("/upload_video/")
# async def upload_video(file: UploadFile = File(...)):
#     uploaded_video_path = "uploaded_video.mp4"
#     with open(uploaded_video_path, "wb") as f:
#         f.write(await file.read())
#     return {"message": "Video uploaded successfully"}

# @app.websocket("/ws/video_stream")
# async def video_stream(websocket: WebSocket):
#     await websocket.accept()
#     try:
#         cap = cv2.VideoCapture("uploaded_video.mp4")
#         if not cap.isOpened():
#             await websocket.send_text("Error: Cannot open video file")
#             return
#         while True:
#             ret, frame = cap.read()
#             if not ret:
#                 break
#             results = model(frame)
#             for result in results:
#                 for box in result.boxes:
#                     x1, y1, x2, y2 = map(int, box.xyxy[0])
#                     class_id = int(box.cls[0])
#                     class_name = model.names[class_id]
#                     if class_name in filter_classes:
#                         color = colors.get(class_name, (0, 255, 0))
#                         cv2.rectangle(frame, (x1, y1), (x2, y2), color, 2)
#                         cv2.putText(frame, class_name, (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, color, 2)
#             _, buffer = cv2.imencode('.jpg', frame)
#             frame_base64 = base64.b64encode(buffer).decode('utf-8')
#             await websocket.send_text(frame_base64)
#     except WebSocketDisconnect:
#         print("WebSocket disconnected")
#     finally:
#         cap.release()
#         await websocket.close()

# @app.on_event("startup")
# async def startup_event():
#     for img_file in glob.glob(f"{IMAGE_DIR}/*.webp"):
#         os.remove(img_file)

# if __name__ == "__main__":
#     uvicorn.run(app, host="0.0.0.0", port=8000)
