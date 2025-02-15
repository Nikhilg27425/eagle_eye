import torch.nn as nn
import torch
import cv2
import torch.nn as nn
import torch.nn.functional as F
from torch.autograd import Variable
import os
import numpy as np

class Conv2d(nn.Module):
    def __init__(self, in_channels, out_channels, kernel_size, stride=1, NL='relu', same_padding=False, bn=False):
        super(Conv2d, self).__init__()
        padding = int((kernel_size - 1) / 2) if same_padding else 0
        self.conv = nn.Conv2d(in_channels, out_channels, kernel_size, stride, padding=padding)
        self.bn = nn.BatchNorm2d(out_channels, eps=0.001, momentum=0, affine=True) if bn else None
        if NL == 'relu' :
            self.relu = nn.ReLU(inplace=True)
        elif NL == 'prelu':
            self.relu = nn.PReLU()
        else:
            self.relu = None

    def forward(self, x):
        x = self.conv(x)
        if self.bn is not None:
            x = self.bn(x)
        if self.relu is not None:
            x = self.relu(x)
        return x
    
class FC(nn.Module):
    def __init__(self, in_features, out_features, NL='relu'):
        super(FC, self).__init__()
        self.fc = nn.Linear(in_features, out_features)
        if NL == 'relu' :
            self.relu = nn.ReLU(inplace=True)
        elif NL == 'prelu':
            self.relu = nn.PReLU()
        else:
            self.relu = None

    def forward(self, x):
        x = self.fc(x)
        if self.relu is not None:
            x = self.relu(x)
        return x
    
class CMTL(nn.Module):
    '''
    Implementation of CNN-based Cascaded Multi-task Learning of High-level Prior and Density
    Estimation for Crowd Counting (Sindagi et al.)
    '''
    def __init__(self, bn=False, num_classes=10):
        super(CMTL, self).__init__()

        self.num_classes = num_classes
        self.base_layer = nn.Sequential(Conv2d( 1, 16, 9, same_padding=True, NL='prelu', bn=bn),
                                        Conv2d(16, 32, 7, same_padding=True, NL='prelu', bn=bn))

        self.hl_prior_1 = nn.Sequential(Conv2d( 32, 16, 9, same_padding=True, NL='prelu', bn=bn),
                                     nn.MaxPool2d(2),
                                     Conv2d(16, 32, 7, same_padding=True, NL='prelu', bn=bn),
                                     nn.MaxPool2d(2),
                                     Conv2d(32, 16, 7, same_padding=True, NL='prelu', bn=bn),
                                     Conv2d(16, 8,  7, same_padding=True, NL='prelu', bn=bn))

        self.hl_prior_2 = nn.Sequential(nn.AdaptiveMaxPool2d((32,32)),
                                        Conv2d( 8, 4, 1, same_padding=True, NL='prelu', bn=bn))

        self.hl_prior_fc1 = FC(4*1024,512, NL='prelu')
        self.hl_prior_fc2 = FC(512,256,    NL='prelu')
        self.hl_prior_fc3 = FC(256, self.num_classes,     NL='prelu')


        self.de_stage_1 = nn.Sequential(Conv2d( 32, 20, 7, same_padding=True, NL='prelu', bn=bn),
                                     nn.MaxPool2d(2),
                                     Conv2d(20, 40, 5, same_padding=True, NL='prelu', bn=bn),
                                     nn.MaxPool2d(2),
                                     Conv2d(40, 20, 5, same_padding=True, NL='prelu', bn=bn),
                                     Conv2d(20, 10, 5, same_padding=True, NL='prelu', bn=bn))

        self.de_stage_2 = nn.Sequential(Conv2d( 18, 24, 3, same_padding=True, NL='prelu', bn=bn),
                                        Conv2d( 24, 32, 3, same_padding=True, NL='prelu', bn=bn),
                                        nn.ConvTranspose2d(32,16,4,stride=2,padding=1,output_padding=0,bias=True),
                                        nn.PReLU(),
                                        nn.ConvTranspose2d(16,8,4,stride=2,padding=1,output_padding=0,bias=True),
                                        nn.PReLU(),
                                        Conv2d(8, 1, 1, same_padding=True, NL='relu', bn=bn))
    def forward(self, im_data):
            x_base = self.base_layer(im_data)
            x_hlp1 = self.hl_prior_1(x_base)
            x_hlp2 = self.hl_prior_2(x_hlp1)
            x_hlp2 = x_hlp2.view(x_hlp2.size()[0], -1)
            x_hlp = self.hl_prior_fc1(x_hlp2)
            x_hlp = F.dropout(x_hlp, training=self.training)
            x_hlp = self.hl_prior_fc2(x_hlp)
            x_hlp = F.dropout(x_hlp, training=self.training)
            x_cls = self.hl_prior_fc3(x_hlp)
            x_den = self.de_stage_1(x_base)
            x_den = torch.cat((x_hlp1,x_den),1)
            x_den = self.de_stage_2(x_den)
            return x_den, x_cls
    
# def np_to_variable(x, is_cuda=True, is_training=False, dtype=torch.FloatTensor):
#     if is_training:
#         v = Variable(torch.from_numpy(x).type(dtype))
#     else:
#         v = Variable(torch.from_numpy(x).type(dtype), requires_grad = False, volatile = True)
#     if is_cuda:
#         v = v.cuda()
#     return v


def np_to_variable(x, is_cuda=False, is_training=False):  # ✅ Force CPU mode
    if not isinstance(x, np.ndarray):  # ✅ Ensure input is a NumPy array
        x = x.cpu().numpy()  # Convert Tensor to NumPy if needed
    
    dtype = torch.FloatTensor
    v = Variable(torch.from_numpy(x).type(dtype), requires_grad=False)  # ✅ Removed volatile=True
    
    return v

class CrowdCounter(nn.Module):
    def __init__(self, ce_weights=None):
        super(CrowdCounter, self).__init__()
        self.CCN = CMTL()
        if ce_weights is not None:
            ce_weights = torch.Tensor(ce_weights)
            ce_weights = ce_weights.cuda()
        self.loss_mse_fn = nn.MSELoss()
        self.loss_bce_fn = nn.BCELoss(weight=ce_weights)

    @property
    def loss(self):
        return self.loss_mse + 0.0001*self.cross_entropy

    def forward(self,  im_data, gt_data=None, gt_cls_label=None, ce_weights=None):
        im_data = np_to_variable(im_data, is_cuda=True, is_training=self.training)
        density_map, density_cls_score = self.CCN(im_data)
        density_cls_prob = F.softmax(density_cls_score)

        if self.training:
            gt_data = np_to_variable(gt_data, is_cuda=True, is_training=self.training)
            gt_cls_label = np_to_variable(gt_cls_label, is_cuda=True, is_training=self.training,dtype=torch.FloatTensor)
            self.loss_mse, self.cross_entropy = self.build_loss(density_map, density_cls_prob, gt_data, gt_cls_label, ce_weights)


        return density_map
    def build_loss(self, density_map, density_cls_score, gt_data, gt_cls_label, ce_weights):
        loss_mse = self.loss_mse_fn(density_map, gt_data)
        ce_weights = torch.Tensor(ce_weights)
        ce_weights = ce_weights.cuda()
        cross_entropy = self.loss_bce_fn(density_cls_score, gt_cls_label)
        return loss_mse, cross_entropy
    
def load_net(fname, net):
    import h5py
    h5f = h5py.File(fname, mode='r')
    for k, v in net.state_dict().items():
        param = torch.from_numpy(np.asarray(h5f[k]))
        v.copy_(param)

def save_density_map(density_map,output_dir, fname='results.png'):
    density_map = 255*density_map/np.max(density_map)
    density_map= density_map[0][0]
    cv2.imwrite(os.path.join(output_dir,fname),density_map)

def display_results(input_img, gt_data,density_map):
    input_img = input_img[0][0]
    gt_data = 255*gt_data/np.max(gt_data)
    density_map = 255*density_map/np.max(density_map)
    gt_data = gt_data[0][0]
    density_map= density_map[0][0]
    if density_map.shape[1] != input_img.shape[1]:
         input_img = cv2.resize(input_img, (density_map.shape[1],density_map.shape[0]))
    result_img = np.hstack((input_img,gt_data,density_map))
    result_img  = result_img.astype(np.uint8, copy=False)
    cv2.imshow('Result', result_img)
    cv2.waitKey(0)

def load_model(model_path):
    net = CrowdCounter()
    load_net(model_path, net)
    net.cuda()
    net.eval()
    return net

def get_density_map(frame, net):
    image = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)  # Convert to grayscale
    image = np.array(image, dtype=np.float32)
    image = cv2.resize(image, (image.shape[1] // 2, image.shape[0] // 2))  # Resize if needed
    image = image[np.newaxis, :, :]  # Add channel dimension (C, H, W) → (1, H, W)
    image = torch.tensor(image).unsqueeze(0).cuda()
    
    # Ensure input is a NumPy array before passing to model
    image = image.cpu().numpy()
    
    # Predict density map
    density_map = net(image, None)
    density_map = density_map.data.cpu().numpy()
    return density_map


