import requests
from PIL import Image
import numpy as np
import matplotlib.pyplot as plt
from io import BytesIO  # Import BytesIO from the io module

from keras.models import load_model
from keras.preprocessing import image
import tensorflow as tf

model = load_model("bestmodel.h5")
path = "https://prod-images-static.radiopaedia.org/images/4132109/a19995bfb2400dc7ff7939f3f4169f_big_gallery.jpg"

def load_image_from_url(url):
    try:
        response = requests.get(url)
        img = Image.open(BytesIO(response.content))
        return img
    except Exception as e:
        print("Error loading image from URL:", e)
        return None

def predict_image(img):
    if img is None:
        return

    img = img.resize((224, 224))  # Resize the image to match the input size of the model
    img_array = tf.keras.utils.img_to_array(img)
    img_array = img_array / 255.0  # Normalize the image

    # Expand dimensions to match model input requirements
    input_arr = np.expand_dims(img_array, axis=0)

    # Make prediction
    pred = model.predict(input_arr)

    # Classify the prediction
    if pred[0][0] > 0.5:
        print("Not Affected")
    else:
        print("Affected")

    # Display the image
    # plt.imshow(img)
    # plt.title("Input Image")
    # plt.show()

# Load image from URL
img = load_image_from_url(path)
predict_image(img)
