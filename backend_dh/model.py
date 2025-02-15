import utils
import cv2
import torch
import numpy as np
# def load_model(model_path):
#     net = utils.CrowdCounter()
#     utils.load_net(model_path, net)
#     device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
#     net.to(device)
#     net.eval()
#     return net, device

def load_model(model_path):
    net = utils.CrowdCounter()
    utils.load_net(model_path, net)
    
    device = torch.device("cpu")  # ✅ Force CPU instead of CUDA
    net.to(device)
    net.eval()
    
    return net, device  # Return the device as well


# def get_density_map(frame, net, device):
#     image = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)  # Convert to grayscale
#     image = np.array(image, dtype=np.float32)
#     image = cv2.resize(image, (image.shape[1] // 2, image.shape[0] // 2))  # Resize if needed
#     image = image[np.newaxis, :, :]  # Add channel dimension (C, H, W) → (1, H, W)
#     image = torch.tensor(image).unsqueeze(0).to(device)
    
#     # Ensure input is a NumPy array before passing to model
#     image = image.cpu().numpy()
    
#     # Predict density map
#     with torch.no_grad():
#         density_map = net(image, None)
#     density_map = density_map.data.cpu().numpy()
#     return density_map
def get_density_map(frame, net, device):
    image = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY).astype(np.float32)
    image = cv2.resize(image, (image.shape[1] // 2, image.shape[0] // 2))  # Resize if needed
    image = np.expand_dims(image, axis=(0, 1))  # Shape (1, 1, H, W) → Needed format
    image = torch.tensor(image, dtype=torch.float32).to(device)  # ✅ Convert correctly

    with torch.no_grad():
        density_map = net(image, None)  # Pass correct format

    return density_map.cpu().numpy()  # Ensure output is NumPy



torch.backends.cudnn.enabled = True
torch.backends.cudnn.benchmark = False
net, device = load_model('model_crowd.h5')

# def estimate_people_count(frame):
#     print("Processing frame for people count...")  # Debug print

#     density_map = get_density_map(frame, net, device)

#     if density_map is None:
#         print("Density map is None!")  # Check if it fails here
#         return 0
    
#     et_count = np.sum(density_map)  
#     print(f"Estimated count: {et_count}")  # Print count
#     return et_count

net, device = load_model('model_crowd.h5')  # Load model with CPU

def estimate_people_count(frame):
    print("Processing frame for people count...")
    density_map = get_density_map(frame, net, device)

    if density_map is None:
        print("Density map is None!")
        return 0

    et_count = np.sum(density_map)
    print(f"Estimated count: {et_count}")
    return et_count
