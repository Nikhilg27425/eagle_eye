import time
import cv2
import requests
import numpy as np
from model import estimate_people_count

SERVER_URL = "http://127.0.0.1:8000"
CAMERA_ID = "cam_1"
VIDEO_PATH = "2881972-uhd_3840_2160_24fps.mp4"

def capture_and_send():
    cap = cv2.VideoCapture(VIDEO_PATH)

    while True:
        ret, frame = cap.read()
        
        if not ret:
            # Restart video when it reaches the end
            print("Restarting video...")
            cap.set(cv2.CAP_PROP_POS_FRAMES, 0)
            continue

        count = estimate_people_count(frame)

        # Convert count to float to avoid serialization errors
        payload = {"id": CAMERA_ID, "count": float(count)}

        try:
            response = requests.post(f"{SERVER_URL}/update_estimate", json=payload)
            print("Sent count:", payload, "Response:", response.status_code)
        except requests.exceptions.RequestException as e:
            print("Error sending count:", e)

        # ✅ If count > 400, send compressed WebP image
        if count > 1:  # Adjust threshold as needed
            print(f"High count detected ({count})! Sending compressed WebP image...")
            _, img_encoded = cv2.imencode(".webp", frame, [cv2.IMWRITE_WEBP_QUALITY, 80])
            files = {"file": ("alert.webp", img_encoded.tobytes(), "image/webp")}

            try:
                img_response = requests.post(f"{SERVER_URL}/upload_image/{CAMERA_ID}", files=files)
                print("Image Upload Response:", img_response.status_code, img_response.json())
            except requests.exceptions.RequestException as e:
                print("Error sending image:", e)

        time.sleep(60)  # ✅ Wait 60 seconds before processing next frame

    cap.release()

if __name__ == "_main_": 
    capture_and_send()
