import sys
import torch
from torchvision import models, transforms
import torch.nn.functional as F
import torch.nn as nn
import requests
from PIL import Image
from io import BytesIO

# 이미지 변환 정의
transformations = transforms.Compose([
    transforms.Resize((256, 256)),
    transforms.ToTensor()
])

# 클래스 라벨 직접 정의
class_labels = ['cardboard', 'glass', 'metal', 'paper', 'plastic', 'trash']

# ResNet 모델 클래스 정의


class ResNet(nn.Module):
    def __init__(self):
        super(ResNet, self).__init__()
        self.network = models.resnet50(pretrained=True)
        num_ftrs = self.network.fc.in_features
        self.network.fc = nn.Linear(num_ftrs, len(class_labels))

    def forward(self, xb):
        return self.network(xb)


# 모델 인스턴스 생성 및 로드
model = ResNet()
model.load_state_dict(torch.load(
    "D:\\gdsc\\solution-challenge\\T.T\\back\\TT\\src\\main\\java\\com\\Agari\\TT\\domain\\Trash\\Service\\model.pth"
))
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)
model.eval()

# 이미지 URL에서 예측 수행 함수


def predict_label_from_image_url(image_url, model, transformations, class_labels):
    response = requests.get(image_url)
    img = Image.open(BytesIO(response.content)).convert("RGB")
    img_transformed = transformations(img).unsqueeze(0).to(device)

    with torch.no_grad():
        outputs = model(img_transformed)
        probs = F.softmax(outputs, dim=1)  # 확률 계산
        max_prob, preds = torch.max(probs, dim=1)
        predicted_label = class_labels[preds[0].item()]
        predicted_probability = max_prob.item()  # 확률 값

    return predicted_label, predicted_probability


# 이미지 URL 예시
# image_url = "https://storage.googleapis.com/tt_solution_challenge/9b483f18-6465-4043-b0a7-56dcafa41fa9"

image_url = sys.argv[1]  # 커맨드 라인 인자로부터 이미지 URL을 받습니다.

# 예측 실행 및 결과 출력
predicted_label, predicted_probability = predict_label_from_image_url(
    image_url, model, transformations, class_labels)
print(
    f"Predicted Label: {predicted_label},Probability: {predicted_probability}")
