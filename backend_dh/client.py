import time
import cv2
import requests
import numpy as np
from model import estimate_people_count

SERVER_URL = "http://127.0.0.1:8000"
CAMERA_ID = "cam_1"



def capture_and_send():
    cap = cv2.VideoCapture(0)

    while True:
        ret, frame = cap.read()
        if not ret:
            print("Failed to capture frame")
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
        if count > 0:#400:
            print(f"High count detected ({count})! Sending compressed WebP image...")
            _, img_encoded = cv2.imencode(".webp", frame, [cv2.IMWRITE_WEBP_QUALITY, 80])
            files = {"file": ("alert.webp", img_encoded.tobytes(), "image/webp")}

            try:
                img_response = requests.post(f"{SERVER_URL}/upload_image/{CAMERA_ID}", files=files)
                print("Image Upload Response:", img_response.status_code, img_response.json())
            except requests.exceptions.RequestException as e:
                print("Error sending image:", e)

        time.sleep(60)  # ✅ Wait 5 minutes before next frame

    cap.release()

if __name__ == "__main__":
    capture_and_send()
