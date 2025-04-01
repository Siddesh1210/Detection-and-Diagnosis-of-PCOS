import numpy as np
from fastapi import FastAPI, Query
import joblib
import tensorflow as tf
import requests
from PIL import Image
from io import BytesIO
from keras.models import load_model
from keras.preprocessing import image

app = FastAPI()

# to run file
# Go on Python Model and than type : uvicorn pcos_detect:app --reload
# For sono image search Normal Sonography / PCOS in Download Folder
# for Login use payal@gmail.com, payal as password
@app.get("/")
def root_api():
    return {"message": "Server Reached"}

@app.get("/check-pcos")
def checkPCOS(age,weight,height,bmi,bloodGroup,pulseRate,breathPerMinute,heartRate,missingCycle,cycleLength,marriageStatus,pregnant,noOfAborption,hip,waist,hipWaistRatio,weightGain,hairGrowth,skinDarkening,hairLoss,pimples,fastFood,regularExercise,bpSystolic,bpPrastolic):
    try:
        with open('pcos_base_yn_model.pkl', 'rb') as file:
            loaded_model = joblib.load(file)
            # Pickled_LR_Model = pickle.load(file)

        def convert_to_numeric(value):
            try:
                return float(value)
            except ValueError:
                # Handle the case where the value is not valid
                # For now, we'll just return 0, but you might want to handle this differently based on your requirements
                return 0

        # Convert parameters to numeric format
        numeric_params = [int(age), int(weight), int(height), convert_to_numeric(bmi), int(bloodGroup), int(pulseRate), int(breathPerMinute), convert_to_numeric(heartRate), int(missingCycle), int(cycleLength), int(marriageStatus), int(pregnant), int(noOfAborption), int(hip), int(waist), convert_to_numeric(hipWaistRatio), int(weightGain), int(hairGrowth), int(skinDarkening), int(hairLoss), int(pimples), int(fastFood), int(regularExercise), int(bpSystolic), int(bpPrastolic)]

        # Convert to numpy array and reshape
        result = np.array(numeric_params).reshape(1, -1)

        # Convert to numpy array and reshape
        # result = np.array(numeric_params).reshape(1, -1)
    
        # result = np.array([25,64,156,26.3,11,70,18,11.2,2,6,6,0,0,39,34,0.07,0,0,0,0,0,0,0,110,80]).reshape(1, -1)
        resultt = loaded_model.predict(result)

        # Mapping prediction result to corresponding diagnosis
        diagnoses = {
            0: "No PCOS",
            1: "PCOS",
        }

        diagnosis = diagnoses.get(resultt[0], "Unknown")

        print(f"Result: {diagnosis}")  # Print diagnosis to console

        return {"result": diagnosis}
    except Exception as e:
        print(f"Error: {e}")  # Print error to console
        return {"error": str(e)}

@app.get("/checkadvance-pcos")
def checkPCOS(tsh: float = Query(..., description="TSH value"),
              amh: float = Query(..., description="AMH value"),
              fsh_lh: float = Query(..., description="FSH/LH value"),
              prl: float = Query(..., description="PRL value"),
              hb: float = Query(..., description="HB value"),
              rbs: float = Query(..., description="RBS value")):
    try:
        with open('pcos_advance_model.pkl', 'rb') as file:
            loaded_model = joblib.load(file)
            # Pickled_LR_Model = pickle.load(file)

        result = np.array([tsh, amh, fsh_lh, prl, hb, rbs]).reshape(1, -1)
        resultt = loaded_model.predict(result)

        # Mapping prediction result to corresponding diagnosis
        diagnoses = {
            0: "Insulin resistance",
            1: "Post pill",
            2: "Inflammatory",
            3: "Adernal"
        }

        diagnosis = diagnoses.get(resultt[0], "Unknown")

        print(f"Result: {diagnosis}")  # Print diagnosis to console

        return {"result": diagnosis}
    except Exception as e:
        print(f"Error: {e}")  # Print error to console
        return {"error": str(e)}

@app.get("/check-sonography")
def check_sonography(image_url):
    try:
        model = load_model("pcos_sonography_model.h5")
        # path = "https://prod-images-static.radiopaedia.org/images/4132109/a19995bfb2400dc7ff7939f3f4169f_big_gallery.jpg"
        response = requests.get(image_url)
        img = Image.open(BytesIO(response.content))
        # image="sono.jpeg"
        # # Load the model
        # with open('pcos_sonography_model.pkl', 'rb') as file:
        #     Pickled_LR_Model = joblib.load(file)
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
            return {"result":"Not Affected"}
        else:
            print("Affected")
            return {"result":"Affected"}
    except FileNotFoundError:
        return {"error": "Model file not found."}
    except Exception as e:
        return {"error": str(e)}