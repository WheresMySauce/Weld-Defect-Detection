import cv2

class Webcam():
    def __init__(self):
        cv2.destroyAllWindows()
        self.vid = cv2.VideoCapture('/dev/video0')

    def get_frame(self):
        if not self.vid.isOpened():
            return
        while True:
            _, img = self.vid.read()
            yield img