# Server things....
from flask import Flask, Response, render_template, request
from webcam import Webcam

# Image processing
import os
from random import random
import cv2
import shutil
import base64
import numpy as np
from ultralytics import YOLO

yolov8_model = YOLO('weights/yolov8n.pt')
class_list = list(yolov8_model.names.values())

# Initiate Flask
app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = "static"
# Camera variables
webcam = Webcam()
# Function to plot bbox to each frame
def plot_bboxes(frame, result, class_list):
    for box in result.boxes:
        x1,y1,x2,y2 = box.xyxy[0]
        x1,y1,x2,y2=int(x1), int(y1), int(x2), int(y2)
        conf = round(float(box.conf),2)
        cls=int(box.cls)
        class_name=class_list[cls]
        label=f'{class_name}{conf}'
        # cv2.rectangle(frame, (int(xyxy[0]), int(xyxy[1])), (int(xyxy[2]), int(xyxy[3])), (0,255,0), 3)
        cv2.rectangle(frame, (x1,y1), (x2,y2), color=(0,255,0), thickness=2)
        cv2.putText(frame, label, (x1, y1-2), 0, 1, color=(0,255,0), thickness=1)
    return frame
    # for xyxy in xyxys:
    #     cv2.rectangle(frame, (int(xyxy[0]), int(xyxy[1])), (int(xyxy[2]), int(xyxy[3])), (0,255,0), 3)

# Function to send each frame to webpage


# Processing request
@app.route("/", methods=['GET', 'POST'])

def home_page():
    # IF POST (SENDING FILE TO SERVER)
    if request.method == "POST":
         try:
            # Take the sent file
            image = request.files['file']
            if image:
                # Save file
                path_to_save = os.path.join(app.config['UPLOAD_FOLDER'], image.filename)
                print("Save = ", path_to_save)
                image.save(path_to_save)

                # Detect
                results = yolov8_model.predict(path_to_save, save=True)


                detect_path = os.path.join(results[0].save_dir, image.filename)
                shutil.copyfile(detect_path, path_to_save)

                print("Save folder:", detect_path)
                # Get the name of objects in image
                cls_name = []
                for c in results[0].boxes.cls:
                    cls_name.append(c)
                ndet = len(cls_name)

                if ndet != 0:
                    return render_template("index.html", user_image = image.filename, rand = str(random()),
                                           msg="Upload file sucessfully", ndet = ndet)
                else:
                    return render_template('index.html', msg='No defect detected')
            else:
                # If not any files
                return render_template('index.html', msg='Hãy chọn file để tải lên')

         except Exception as ex:
            # If error
            print(ex)
            return render_template('index.html', msg='No defect detected')

    else:
        # If GET
        return render_template('index.html')

def read_from_webcam():
    while True:
        # Read the image from webcam
        image = next(webcam.get_frame())
        # Detection
        detect_image = yolov8_model.predict(image, device='0')
        # Return cv2 image result
        image = detect_image[0].plot()
        image = cv2.imencode('.jpg', image)[1].tobytes()#frame
        # Return the image to web
        yield b'Content-Type: image/jpeg\r\n\r\n' + image + b'\r\n--frame\r\n'

@app.route('/image_feed')
def image_feed():
    return Response(read_from_webcam(), mimetype="multipart/x-mixed-replace; boundary=frame")

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=False)