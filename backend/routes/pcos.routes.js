import express from "express";
import auth from "../middlewares/aut.middleware.js";
import upload from "../middlewares/multer.js";
import cloudinary from "../middlewares/cloudinary.js";
import Pcos from "../model/pcos.model.js";
import PcosAdvance from "../model/advancepcos.model.js";
import User from "../model/user.model.js";
const route = express.Router();

//http://localhost:8000/pcos-test/
route.get("/", auth, (req, res) => {
  res.send("User Route is working");
});

//http://localhost:6000/pcos-test/basic-text
route.post("/basic-text", async (req, res) => {
  const {
    age,
    weight,
    height,
    bmi,
    bloodGroup,
    pulseRate,
    breathPerMinute,
    heartRate,
    missingCycle,
    cycleLength,
    marriageStatus,
    pregnant,
    noOfAborption,
    hip,
    waist,
    hipWaistRatio,
    weightGain,
    hairGrowth,
    skinDarkening,
    hairLoss,
    pimple,
    fastFood,
    regularExercise,
    bpSystolic,
    bpPrastolic,
    userToken,
  } = req.body;

  const user = await User.findOne({ accessToken: userToken });

  const response = await fetch(
    `http://localhost:8000/check-pcos?age=${age}&weight=${weight}&height=${height}&bmi=${bmi}&bloodGroup=${bloodGroup}&pulseRate=${pulseRate}&breathPerMinute=${breathPerMinute}&heartRate=${heartRate}&missingCycle=${missingCycle}&cycleLength=${cycleLength}&marriageStatus=${marriageStatus}&pregnant=${pregnant}&noOfAborption=${noOfAborption}&hip=${hip}&waist=${waist}&hipWaistRatio=${hipWaistRatio}&weightGain=${weightGain}&hairGrowth=${hairGrowth}&skinDarkening=${skinDarkening}&hairLoss=${hairLoss}&pimples=${pimple}&fastFood=${fastFood}&regularExercise=${regularExercise}&bpSystolic=${bpSystolic}&bpPrastolic=${bpPrastolic}`
  );

  const result = await response.json();
  console.log(result.result);
  const pcosData = await Pcos.create({
    userId: user._id,
    age,
    weight,
    height,
    bmi,
    bloodGroup,
    pulseRate,
    breathPerMinute,
    heartRate,
    missingCycle,
    cycleLength,
    marriageStatus,
    pregnant,
    noOfAborption,
    hip,
    waist,
    hipWaistRatio,
    weightGain,
    hairGrowth,
    skinDarkening,
    hairLoss,
    pimple,
    fastFood,
    regularExercise,
    bpSystolic,
    bpPrastolic,
    pcosResult: result.result,
  });
  if (pcosData == null) {
    return res.status(500).json({ message: "Invalid pcos data" });
  }

  console.log(result);
  return res.status(200).json({ isOk: true, message: result });
});

//http://localhost:6000/pcos-test/advance-text
route.post("/advance-text", async (req, res) => {
  const { amh, tsh, fsh_lh, prl, hb, rbs, userToken } = req.body;
  const user = await User.findOne({ accessToken: userToken });
  const response = await fetch(
    `http://localhost:8000/checkadvance-pcos?amh=${amh}&tsh=${tsh}&fsh_lh=${fsh_lh}&prl=${prl}&hb=${hb}&rbs=${rbs}`
    // http://localhost:8000/checkadvance-pcos?tsh=2.0&amh=9.0&fsh_lh=15.0&prl=28.0&hb=10.0&rbs=150.0
  );

  const result = await response.json();
  //   console.log(result);
  //   console.log(user._id);
  let pcosData = await PcosAdvance.create({
    userId: user._id,
    amh,
    tsh,
    fsh_lh,
    prl,
    hb,
    rbs,
    pcosResult: result.result,
  });
  if (pcosData == null) {
    return res.status(500).json({ message: "Invalid pcos data" });
  }
  return res.status(200).json({ isOk: true, message: result });
});

route.post(
  "/upload-image",
  upload.single("sonography-image"),
  async (req, res) => {
    try {
      await cloudinary.uploader.upload(req.file.path, async (err, result) => {
        if (err) {
          return res
            .status(err)
            .json({ isOk: false, message: "error uploading image" });
        }
        const response = await fetch(
          "http://localhost:8000/check-sonography?image_url=" + result.url
        );
        const answer = await response.json();
        return res.status(200).json({
          isOk: true,
          message: "Sonography Tested successfully",
          data: answer,
        });
      });
    } catch (error) {
      return res.status(500).json({ isOk: false, message: error });
    }
  }
);

// http://localhost:6000/pcos-test/dietplan
route.get("/dietplan", (req, res) => {
  const pcosDiet = [
    {
      id: 1,
      pcosType: "adernal",
      isVeg: [
        {
          day: "Monday",
          plan: {
            breakfast: ["Mixed Vegetable Upma", "350 Calories"],
            lunch: ["Brown Rice with Dal and fruits", "600 Calories"],
            snack: ["Whole Wheat Bread and Hummus", "250 Calories"],
            dinner: ["Chapati with Sprout Curry", "400 Calories"],
          },
        },
        {
          day: "Tuesday",
          plan: {
            breakfast: ["Veg Oat or Dalia", "200 Calories"],
            lunch: ["Brown Rice Palao with Raita", "500 Calories"],
            snack: ["Roasted Makhana with Tea", "250 Calories"],
            dinner: ["Chapati with Chana Curry", "400 Calories"],
          },
        },
        {
          day: "Wednesday",
          plan: {
            breakfast: ["Idli with Coconut Chutney", "250 Calories"],
            lunch: ["Vegetable and Cashew Fried Brown Rice", "600 Calories"],
            snack: ["Fruits", "200 Calories"],
            dinner: ["Chapati with Low Fat Paneer Curry", "450 Calories"],
          },
        },
        {
          day: "Thursday",
          plan: {
            breakfast: ["Broccoli Paratha", "300 Calories"],
            lunch: ["Brown Rice with Beetroot Poriyal Dal", "600 Calories"],
            snack: ["Baked Veg Cutlet with Tea/Coffee", "350 Calories"],
            dinner: ["Bajra Moong and Peas Kichdi", "450 Calories"],
          },
        },
        {
          day: "Friday",
          plan: {
            breakfast: ["Dosa with Coconut Chutney", "300 Calories"],
            lunch: ["Brown Rice with Dal and fruits", "600 Calories"],
            snack: ["Handful of Peanut and Chana", "300 Calories"],
            dinner: ["Chapati with Leafy Vegetable", "350 Calories"],
          },
        },
        {
          day: "Saturday",
          plan: {
            breakfast: ["Sabudana and Orange Juice", "300 Calories"],
            lunch: ["Brown Rice with Chana Dal", "600 Calories"],
            snack: ["Banana or Seasonal Fruit", "250 Calories"],
            dinner: ["Chapati with Bowl of Sprout Curry", "400 Calories"],
          },
        },
        {
          day: "Sunday",
          plan: {
            breakfast: ["Brown Bread with Peanut Butter", "400 Calories"],
            lunch: ["Khichdi", "400 Calories"],
            snack: ["Makhana with Tea/Coffee", "250 Calories"],
            dinner: ["Chapati with Sooya Curry", "400 Calories"],
          },
        },
      ],
      isNonVeg: [
        {
          day: "Monday",
          plan: {
            breakfast: ["Multigrain Chicken Sandwich", "400 Calories"],
            lunch: ["Grilled Chicken Salad with Mixed Greens", "600 Calories"],
            snack: ["Chicken Skewers", "300 Calories"],
            dinner: ["Baked Lemon Herb Chicken Breasts", "500 Calories"],
          },
        },
        {
          day: "Tuesday",
          plan: {
            breakfast: ["Egg with Brown Bread", "250 Calories"],
            lunch: ["Chicken Caesar Wrap with Romaine Lettuce", "450 Calories"],
            snack: ["Chicken and Vegetable Spring Rolls", "300 Calories"],
            dinner: ["Chicken Stir-Fry with Broccoli", "400 Calories"],
          },
        },
        {
          day: "Wednesday",
          plan: {
            breakfast: ["Chicken Chapati Roll", "350 Calories"],
            lunch: [
              "Chicken Avocado Wrap with Sliced Chicken Breast",
              "600 Calories",
            ],
            snack: [
              "Grilled Chicken Skewers with Barbecue Sauce",
              "400 Calories",
            ],
            dinner: ["Chicken and Vegetable Kebabs", "450 Calories"],
          },
        },
        {
          day: "Thursday",
          plan: {
            breakfast: ["Grilled Egg Sandwich", "400 Calories"],
            lunch: ["Chicken and Quinoa Salad", "600 Calories"],
            snack: ["Chicken Lettuce Wraps", "350 Calories"],
            dinner: ["Chicken and Vegetable Curry", "450 Calories"],
          },
        },
        {
          day: "Friday",
          plan: {
            breakfast: ["Egg Roll", "350 Calories"],
            lunch: [
              "Brown Rice Chicken and Black Bean Burrito",
              "600 Calories",
            ],
            snack: ["Chicken Dip with Celery Sticks", "300 Calories"],
            dinner: ["Chicken Piccata with Roasted Asparagus", "450 Calories"],
          },
        },
        {
          day: "Saturday",
          plan: {
            breakfast: ["Boiled Egg with Chicken", "300 Calories"],
            lunch: [
              "Chicken Caesar Salad with Grilled Chicken Breast",
              "600 Calories",
            ],
            snack: ["Chicken Quesadillas with Salsa", "250 Calories"],
            dinner: ["Grilled Lemon Garlic Chicken Thighs", "400 Calories"],
          },
        },
        {
          day: "Sunday",
          plan: {
            breakfast: ["Chicken Sandwich", "450 Calories"],
            lunch: ["Chicken and Vegetable Couscous Salad", "400 Calories"],
            snack: ["Chicken and Cheese Stuffed Mini Peppers", "250 Calories"],
            dinner: ["Chicken and Broccoli Alfredo", "400 Calories"],
          },
        },
      ],
    },
    {
      id: 2,
      pcosType: "pill-induced",
      isVeg: [
        {
          day: "Monday",
          plan: {
            breakfast: ["Brown Bread with Avocado", "350 Calories"],
            lunch: ["Quinoa Salad with peas", "550 Calories"],
            snack: ["Carrot Sticks with Hummus", "200 Calories"],
            dinner: ["Vegetable Stir-Fry with Tofu", "450 Calories"],
          },
        },
        {
          day: "Tuesday",
          plan: {
            breakfast: ["Quinoa Breakfast Bowl", "300 Calories"],
            lunch: ["Veggie Wrap with Guacamole", "500 Calories"],
            snack: ["Greek Yogurt with Berries", "150 Calories"],
            dinner: ["Leafy Plant Parmesan", "400 Calories"],
          },
        },
        {
          day: "Wednesday",
          plan: {
            breakfast: ["Greek Yogurt Parfait", "350 Calories"],
            lunch: ["Spinach and Mushroom Risotto", "600 Calories"],
            snack: ["Apple Slices with Almond Butter", "250 Calories"],
            dinner: ["Vegetable Curry with Brown Rice", "500 Calories"],
          },
        },
        {
          day: "Thursday",
          plan: {
            breakfast: ["Spinach and Mushroom Omelette", "350 Calories"],
            lunch: ["Vegetable Stir-Fry Noodles", "550 Calories"],
            snack: ["Roasted peas", "150 Calories"],
            dinner: ["Stuffed Bell Peppers", "450 Calories"],
          },
        },
        {
          day: "Friday",
          plan: {
            breakfast: ["Sweet Potato Hash", "300 Calories"],
            lunch: ["Quinoa Stuffed Bell Peppers", "550 Calories"],
            snack: ["Mixed Nuts", "200 Calories"],
            dinner: ["Vegetable Lasagna", "400 Calories"],
          },
        },
        {
          day: "Saturday",
          plan: {
            breakfast: ["Chia Seed Pudding", "300 Calories"],
            lunch: ["Mushroom and Spinach Quesadillas", "550 Calories"],
            snack: ["Cucumber Slices with Hummus", "150 Calories"],
            dinner: ["Vegetable Paella", "450 Calories"],
          },
        },
        {
          day: "Sunday",
          plan: {
            breakfast: ["Vegetable Frittata", "400 Calories"],
            lunch: ["Quinoa Salad with Roasted Vegetables", "450 Calories"],
            snack: ["Edamame Beans", "100 Calories"],
            dinner: ["Vegetable Stir-Fry with Rice Noodles", "500 Calories"],
          },
        },
      ],
      isNonVeg: [
        {
          day: "Monday",
          plan: {
            breakfast: ["Chicken and Spinach Omelette", "400 Calories"],
            lunch: ["Grilled Salmon with Quinoa", "650 Calories"],
            snack: ["Chicken Caesar Salad", "300 Calories"],
            dinner: ["Spicy Garlic Shrimp with Brown Rice", "500 Calories"],
          },
        },
        {
          day: "Tuesday",
          plan: {
            breakfast: ["Turkey Bacon and Avocado Toast", "350 Calories"],
            lunch: ["Teriyaki Chicken Rice Bowl", "600 Calories"],
            snack: ["Smoked Salmon on Whole Wheat Crackers", "250 Calories"],
            dinner: [
              "Honey Mustard Glazed Chicken with Roasted Vegetables",
              "450 Calories",
            ],
          },
        },
        {
          day: "Wednesday",
          plan: {
            breakfast: ["Sausage and Veggie Breakfast Skillet", "450 Calories"],
            lunch: ["Shrimp Stir-Fry with Cauliflower Rice", "550 Calories"],
            snack: ["Tuna Salad Lettuce Wraps", "200 Calories"],
            dinner: [
              "Lemon Herb Grilled Chicken with Asparagus",
              "500 Calories",
            ],
          },
        },
        {
          day: "Thursday",
          plan: {
            breakfast: ["Ham and Cheese Breakfast Sandwich", "400 Calories"],
            lunch: ["Beef and Broccoli Stir-Fry", "600 Calories"],
            snack: ["Chicken Wings with Hot Sauce", "350 Calories"],
            dinner: ["Salmon Fillet with Lemon Dill Sauce", "450 Calories"],
          },
        },
        {
          day: "Friday",
          plan: {
            breakfast: ["Egg and Sausage Breakfast Burrito", "450 Calories"],
            lunch: ["Tandoori Chicken with Vegetable Salad", "650 Calories"],
            snack: ["Beef Jerky", "200 Calories"],
            dinner: ["Baked Cod with Herbed Quinoa", "500 Calories"],
          },
        },
        {
          day: "Saturday",
          plan: {
            breakfast: ["Bacon and Cheese Stuffed Mushrooms", "400 Calories"],
            lunch: [
              "Grilled Steak Salad with Balsamic Vinaigrette",
              "650 Calories",
            ],
            snack: ["Shrimp Cocktail", "250 Calories"],
            dinner: ["Garlic Buttered Lobster Tails", "550 Calories"],
          },
        },
        {
          day: "Sunday",
          plan: {
            breakfast: ["Egg White and Veggie Scramble", "350 Calories"],
            lunch: ["Chicken Fajita Bowl with Guacamole", "600 Calories"],
            snack: ["Turkey and Cheese Roll-Ups", "200 Calories"],
            dinner: ["Grilled Swordfish with Mango Salsa", "500 Calories"],
          },
        },
      ],
    },
    {
      id: 3,
      pcosType: "inflamatory",
      isVeg: [
        {
          day: "Monday",
          plan: {
            breakfast: ["Spinach and Tomato Omelette", "350 Calories"],
            lunch: ["Quinoa and Vegetable Stir-Fry", "550 Calories"],
            snack: ["Cucumber and Tomato Salad", "150 Calories"],
            dinner: ["Vegetable Curry with Brown Rice", "450 Calories"],
          },
        },
        {
          day: "Tuesday",
          plan: {
            breakfast: ["Avocado and Spinach Breakfast Wrap", "300 Calories"],
            lunch: ["Mushroom and Chickpea Pasta", "500 Calories"],
            snack: ["Roasted Cauliflower Bites", "200 Calories"],
            dinner: ["Spaghetti Squash with Marinara Sauce", "400 Calories"],
          },
        },
        {
          day: "Wednesday",
          plan: {
            breakfast: ["Blueberry Banana Smoothie Bowl", "350 Calories"],
            lunch: ["Vegetable Lentil Soup", "600 Calories"],
            snack: ["Greek Yogurt with Honey", "200 Calories"],
            dinner: ["Stuffed Bell Peppers with Quinoa", "500 Calories"],
          },
        },
        {
          day: "Thursday",
          plan: {
            breakfast: ["Mixed Berry Chia Pudding", "350 Calories"],
            lunch: ["Broccoli and Cauliflower Salad", "550 Calories"],
            snack: ["Homemade Trail Mix", "150 Calories"],
            dinner: [
              "Eggplant Parmesan with Whole Wheat Pasta",
              "450 Calories",
            ],
          },
        },
        {
          day: "Friday",
          plan: {
            breakfast: ["Whole Grain Bagel with Cream Cheese", "300 Calories"],
            lunch: ["Veggie Burger with Sweet Potato Fries", "550 Calories"],
            snack: ["Apple Slices with Almond Butter", "200 Calories"],
            dinner: ["Vegetable Stir-Fry with Tofu", "400 Calories"],
          },
        },
        {
          day: "Saturday",
          plan: {
            breakfast: [
              "Quinoa Breakfast Bowl with Fresh Fruit",
              "350 Calories",
            ],
            lunch: ["Mediterranean Chickpea Salad", "600 Calories"],
            snack: ["Kale Chips", "250 Calories"],
            dinner: ["Vegetable Paella", "450 Calories"],
          },
        },
        {
          day: "Sunday",
          plan: {
            breakfast: ["Whole Wheat Pancakes with Berries", "400 Calories"],
            lunch: ["Brown Rice with Lentil Soup", "400 Calories"],
            snack: ["Mixed Nuts and Dried Fruits", "250 Calories"],
            dinner: ["Vegetable Stir-Fry with Tofu", "400 Calories"],
          },
        },
      ],
      isNonVeg: [
        {
          day: "Monday",
          plan: {
            breakfast: ["Sausage and Spinach Scramble", "400 Calories"],
            lunch: ["Grilled Chicken Caesar Salad", "650 Calories"],
            snack: ["Chicken Lettuce Wraps", "300 Calories"],
            dinner: ["Teriyaki Salmon with Quinoa", "500 Calories"],
          },
        },
        {
          day: "Tuesday",
          plan: {
            breakfast: [
              "Bacon and Cheese Breakfast Quesadilla",
              "350 Calories",
            ],
            lunch: ["Beef and Broccoli Stir-Fry", "600 Calories"],
            snack: ["Smoked Salmon on Whole Wheat Crackers", "250 Calories"],
            dinner: [
              "Honey Mustard Glazed Chicken with Roasted Vegetables",
              "450 Calories",
            ],
          },
        },
        {
          day: "Wednesday",
          plan: {
            breakfast: ["Ham and Cheese Breakfast Burrito", "450 Calories"],
            lunch: ["Shrimp and Vegetable Stir-Fry", "550 Calories"],
            snack: ["Tuna Salad Lettuce Wraps", "200 Calories"],
            dinner: [
              "Lemon Herb Grilled Chicken with Asparagus",
              "500 Calories",
            ],
          },
        },
        {
          day: "Thursday",
          plan: {
            breakfast: ["Egg and Sausage Breakfast Sandwich", "400 Calories"],
            lunch: ["Salmon and Quinoa Salad", "600 Calories"],
            snack: ["Buffalo Chicken Dip with Celery Sticks", "350 Calories"],
            dinner: ["Grilled Steak with Roasted Vegetables", "450 Calories"],
          },
        },
        {
          day: "Friday",
          plan: {
            breakfast: ["Turkey Sausage and Veggie Omelette", "450 Calories"],
            lunch: ["Barbecue Chicken Pizza with Mixed Greens", "650 Calories"],
            snack: ["Beef Jerky", "200 Calories"],
            dinner: ["Baked Cod with Herbed Quinoa", "500 Calories"],
          },
        },
        {
          day: "Saturday",
          plan: {
            breakfast: ["Bacon and Cheese Stuffed Mushrooms", "400 Calories"],
            lunch: [
              "Grilled Steak Salad with Balsamic Vinaigrette",
              "650 Calories",
            ],
            snack: ["Shrimp Cocktail", "250 Calories"],
            dinner: ["Garlic Buttered Lobster Tails", "550 Calories"],
          },
        },
        {
          day: "Sunday",
          plan: {
            breakfast: ["Egg White and Veggie Scramble", "350 Calories"],
            lunch: ["Chicken Fajita Bowl with Guacamole", "600 Calories"],
            snack: ["Turkey and Cheese Roll-Ups", "200 Calories"],
            dinner: ["Buttered Pompret Fry", "550 Calories"],
          },
        },
      ],
    },
    {
      id: 4,
      pcosType: "insulin",
      isVeg: [
        {
          day: "Monday",
          plan: {
            breakfast: ["Quinoa Breakfast Bowl with Avocado", "400 Calories"],
            lunch: ["Spinach and Chickpea Salad", "550 Calories"],
            snack: ["Cucumber and Carrot Sticks with Hummus", "200 Calories"],
            dinner: ["Vegetable Stir-Fry with Tofu", "450 Calories"],
          },
        },
        {
          day: "Tuesday",
          plan: {
            breakfast: ["Mango and Coconut Chia Pudding", "350 Calories"],
            lunch: ["Vegetable Stir-Fry Noodles", "500 Calories"],
            snack: ["Greek Yogurt with Mixed Berries", "250 Calories"],
            dinner: [
              "Stuffed Bell Peppers with Quinoa and Black Beans",
              "400 Calories",
            ],
          },
        },
        {
          day: "Wednesday",
          plan: {
            breakfast: [
              "Whole Wheat Pancakes with Blueberry Compote",
              "450 Calories",
            ],
            lunch: ["Roasted Vegetable Quinoa Salad", "600 Calories"],
            snack: ["Apple Slices with Almond Butter", "200 Calories"],
            dinner: ["Cauliflower Rice Stir-Fry with Tofu", "500 Calories"],
          },
        },
        {
          day: "Thursday",
          plan: {
            breakfast: ["Avocado Toast with Cherry Tomatoes", "300 Calories"],
            lunch: ["Sweet Potato and Black Bean Burrito Bowl", "600 Calories"],
            snack: ["Trail Mix with Dried Fruits and Nuts", "300 Calories"],
            dinner: ["Vegetable Curry with Coconut Milk", "450 Calories"],
          },
        },
        {
          day: "Friday",
          plan: {
            breakfast: ["Berry and Spinach Smoothie", "350 Calories"],
            lunch: ["Quinoa Salad with Roasted Vegetables", "600 Calories"],
            snack: ["Edamame with Sea Salt", "250 Calories"],
            dinner: ["Mushroom and Lentil Shepherd's Pie", "500 Calories"],
          },
        },
        {
          day: "Saturday",
          plan: {
            breakfast: [
              "Whole Grain Toast with Avocado and Tomato",
              "400 Calories",
            ],
            lunch: ["Greek Salad with Chickpeas", "600 Calories"],
            snack: [
              "Carrot and Celery Sticks with Peanut Butter",
              "300 Calories",
            ],
            dinner: [
              "Eggplant Parmesan with Whole Wheat Pasta",
              "450 Calories",
            ],
          },
        },
        {
          day: "Sunday",
          plan: {
            breakfast: ["Banana and Walnut Overnight Oats", "350 Calories"],
            lunch: ["Quinoa Stuffed Bell Peppers", "400 Calories"],
            snack: ["Popcorn with Herbs", "200 Calories"],
            dinner: ["Vegetable and Lentil Curry", "450 Calories"],
          },
        },
      ],
      isNonVeg: [
        {
          day: "Monday",
          plan: {
            breakfast: ["Turkey Bacon and Spinach Omelette", "450 Calories"],
            lunch: [
              "Salmon Salad with Avocado and Lemon Dressing",
              "650 Calories",
            ],
            snack: ["Shrimp Cocktail", "300 Calories"],
            dinner: ["Grilled Salmon with Asparagus", "500 Calories"],
          },
        },
        {
          day: "Tuesday",
          plan: {
            breakfast: ["Ham and Cheese Breakfast Burrito", "400 Calories"],
            lunch: ["Beef and Broccoli Stir-Fry", "600 Calories"],
            snack: ["Smoked Salmon on Whole Wheat Crackers", "250 Calories"],
            dinner: [
              "Honey Mustard Glazed Chicken with Quinoa",
              "450 Calories",
            ],
          },
        },
        {
          day: "Wednesday",
          plan: {
            breakfast: ["Chicken Sausage and Veggie Scramble", "450 Calories"],
            lunch: [
              "Shrimp and Quinoa Salad with Lemon Vinaigrette",
              "550 Calories",
            ],
            snack: ["Tuna Salad Lettuce Wraps", "200 Calories"],
            dinner: [
              "Lemon Herb Grilled Chicken with Steamed Vegetables",
              "500 Calories",
            ],
          },
        },
        {
          day: "Thursday",
          plan: {
            breakfast: ["Turkey Sausage and Veggie Omelette", "400 Calories"],
            lunch: ["Salmon and Avocado Sushi Rolls", "600 Calories"],
            snack: ["Buffalo Chicken Dip with Celery Sticks", "350 Calories"],
            dinner: [
              "Grilled Steak with Garlic Mashed Cauliflower",
              "450 Calories",
            ],
          },
        },
        {
          day: "Friday",
          plan: {
            breakfast: [
              "Chicken and Spinach Breakfast Quesadilla",
              "450 Calories",
            ],
            lunch: ["Teriyaki Chicken Rice Bowl", "650 Calories"],
            snack: ["Beef Jerky", "200 Calories"],
            dinner: ["Baked Cod with Roasted Vegetables", "500 Calories"],
          },
        },
        {
          day: "Saturday",
          plan: {
            breakfast: ["Smoked Salmon and Cream Cheese Bagel", "400 Calories"],
            lunch: ["Beef Tacos with Avocado Salsa", "600 Calories"],
            snack: ["Chicken Skewers with Peanut Sauce", "300 Calories"],
            dinner: ["Grilled Shrimp and Vegetable Kabobs", "450 Calories"],
          },
        },
        {
          day: "Sunday",
          plan: {
            breakfast: ["Bacon and Egg Breakfast Sandwich", "450 Calories"],
            lunch: [
              "Chicken and Spinach Pasta with Creamy Tomato Sauce",
              "500 Calories",
            ],
            snack: ["Deviled Eggs", "250 Calories"],
            dinner: ["Beef and Vegetable Stir-Fry", "500 Calories"],
          },
        },
      ],
    },
  ];

  res.status(200).json({
    isOk: true,
    pcosDiet,
  });
});

//http://localhost:1234/pcos-test/doctors
route.get("/doctors", (req, res) => {
  const doctors = [
    //Mumbai
    {
      name: "Dr. Hemlata Hardasani",
      location: "Mumbai",
      experience: "28 year",
      img: "https://imagesx.practo.com/providers/dr-hemlata-hardasani-gynecologist-mumbai-e56f0d24-1bea-498c-ba08-c328a02cf270.jpg?i_type=t_70x70-2x-webp",
      qualification: "Gynecologist/Obstetrician",
      fees: "RS 1700",
      link: "https://www.practo.com/mumbai/doctor/dr-hemlata-hardasani-gynecologist-obstetrician-1?practice_id=725333&specialization=PCOS&referrer=doctor_listing&page_uid=3bc6ca0f-217c-467b-b584-6b14270efe5f&category_name=symptom&category_id=35",
    },
    {
      name: "Dr. Shilpa Abhyankar",
      location: "Mumbai",
      experience: "30 year",
      img: "https://imagesx.practo.com/providers/dr-shilpa-abhyankar-gynecologist-mumbai-5ffc3a32-683d-4918-8f2e-e7acbc1f2a14.jpg?i_type=t_70x70-2x-webp",
      qualification: "Gynecologist/Obstetrician",
      fees: "RS 800",
      link: "https://www.practo.com/mumbai/doctor/dr-shilpa-abhyankar-gynecologist-obstetrician-1?practice_id=1009339&specialization=PCOS&referrer=doctor_listing&page_uid=3bc6ca0f-217c-467b-b584-6b14270efe5f&category_name=symptom&category_id=35",
    },
    {
      name: "Dr. Ankesh Sahetya",
      location: "Mumbai",
      experience: "16 year",
      img: "https://imagesx.practo.com/providers/dr-ankesh-sahetya-gynecologist-mumbai-6a437af8-65e1-42e2-982f-1d4a05d48e90.jpg?i_type=t_70x70-2x-webp",
      qualification: "Gynecologist/Obstetrician",
      fees: "RS 1500",
      link: "https://www.practo.com/mumbai/doctor/dr-ankesh-sahetya-gynecologist-obstetrician?practice_id=697500&specialization=PCOS&referrer=doctor_listing&page_uid=3bc6ca0f-217c-467b-b584-6b14270efe5f&category_name=symptom&category_id=35",
    },
    {
      name: "Dr. Pooja Shukla",
      experience: "16 year",
      location: "Mumbai",
      img: "https://imagesx.practo.com/providers/dr-pooja-shukla-gynecologist-mumbai-2f95fab5-5db1-44d0-be80-823e4422ca46.jpg?i_type=t_70x70-2x-webp",
      qualification: "Gynecologist/Obstetrician",
      fees: "RS 1100",
      link: "https://www.practo.com/mumbai/doctor/dr-pooja-shukla-gynecologist-obstetrician?practice_id=1053187&specialization=PCOS&referrer=doctor_listing&page_uid=3bc6ca0f-217c-467b-b584-6b14270efe5f&category_name=symptom&category_id=35",
    },
    {
      name: "Dr. Monika Agrawal",
      experience: "19 year",
      location: "Mumbai",
      img: "https://imagesx.practo.com/providers/dr-monika-agrawal-gynecologist-mumbai-bb24f044-03f1-42d3-a00d-495371dc56a8.jpg?i_type=t_70x70-2x-webp",
      qualification: "Gynecologist/Obstetrician",
      fees: "RS 1000",
      link: "https://www.practo.com/mumbai/doctor/dr-shruti-parikh?practice_id=1157287&specialization=PCOS&referrer=doctor_listing&page_uid=3bc6ca0f-217c-467b-b584-6b14270efe5f&category_name=symptom&category_id=35",
    },
    //Hyderabad
    {
      name: "Dr. Narmada Katakam",
      experience: "30 year",
      location: "Hyderabad",
      img: "https://imagesx.practo.com/providers/dr-narmada-katakam-infertility-specialist-hyderabad-8fc4753d-9c6b-4ae9-baaa-d94fab6442a1.jpg?i_type=t_70x70-2x-webp",
      qualification: "Gynecologist/Obstetrician",
      fees: "RS 1000",
      link: "https://www.practo.com/hyderabad/doctor/dr-r-narmada-katakam-gynecologist-obstetrician?practice_id=1161710&specialization=PCOS&referrer=doctor_listing&page_uid=f3bf69e5-0507-48d6-91da-f4fcbe0dbeae&category_name=symptom&category_id=35",
    },
    {
      name: "Dr. Janaki V",
      experience: "34 year",
      location: "Hyderabad",
      img: "https://imagesx.practo.com/providers/dr-janaki-v-obstetrician-hyderabad-f0d1501c-40e2-4882-9682-ad8ad8a179ca.jpg?i_type=t_70x70-2x-webp",
      qualification: "Gynecologist/Obstetrician",
      fees: "RS 600",
      link: "https://www.practo.com/hyderabad/doctor/dr-janaki-v?practice_id=1382035&specialization=PCOS&referrer=doctor_listing&page_uid=f3bf69e5-0507-48d6-91da-f4fcbe0dbeae&category_name=symptom&category_id=35",
    },
    {
      name: "Dr. Sridevi K",
      experience: "25 year",
      location: "Hyderabad",
      img: "https://imagesx.practo.com/providers/dr-sridevi-k-gynecologist-hyderabad-8957a388-e561-4d9a-b7e3-eaebc7e717a9.jpg?i_type=t_70x70-2x-webp",
      qualification: "Gynecologist/Obstetrician",
      fees: "RS 600",
      link: "https://www.practo.com/hyderabad/doctor/sridevi-k-gynecologist-obstetrician?practice_id=1382035&specialization=PCOS&referrer=doctor_listing&page_uid=f3bf69e5-0507-48d6-91da-f4fcbe0dbeae&category_name=symptom&category_id=35",
    },
    {
      name: "Dr. K. Suma",
      experience: "36 year",
      location: "Hyderabad",
      img: "https://imagesx.practo.com/providers/dr-k-suma-infertility-specialist-hyderabad-af5f762a-041c-4154-83d5-365e8ce6265c.jpg?i_type=t_70x70-2x-webp",
      qualification: "Gynecologist/Obstetrician",
      fees: "RS 700",
      link: "https://www.practo.com/hyderabad/doctor/dr-k-suma-prasad-gynecologic-oncologist?practice_id=1427692&specialization=PCOS&referrer=doctor_listing&page_uid=f3bf69e5-0507-48d6-91da-f4fcbe0dbeae&category_name=symptom&category_id=35",
    },
    //Banglore
    {
      name: "Dr. Harini P Shetty",
      experience: "34 year",
      location: "Banglore",
      img: "https://imagesx.practo.com/providers/dr-harini-p-shetty-obstetrician-bangalore-69514174-4aeb-40a9-a50a-7e1e23c01171.jpg?i_type=t_70x70-2x-webp",
      qualification: "Gynecologist/Obstetrician",
      fees: "RS 700",
      link: "https://www.practo.com/bangalore/doctor/dr-harini-p-shetty-1-gynecologist-obstetrician?practice_id=923159&specialization=PCOS&referrer=doctor_listing&page_uid=86bbd091-0e58-4118-9a3a-937923e2fdbe&category_name=symptom&category_id=35",
    },
    {
      name: "Dr. M. Gowri",
      experience: "34 year",
      location: "Banglore",
      img: "https://imagesx.practo.com/providers/dr-m-gowri-gynecologist-bangalore-12cccd27-ea32-4545-b950-897d29b214c7.jpg?i_type=t_70x70-2x-webp",
      qualification: "Gynecologist/Obstetrician",
      fees: "RS 700",
      link: "https://www.practo.com/bangalore/doctor/dr-m-gowri-gynecologist-obstetrician?practice_id=687635&specialization=PCOS&referrer=doctor_listing&page_uid=86bbd091-0e58-4118-9a3a-937923e2fdbe&category_name=symptom&category_id=35",
    },
    {
      name: "Dr. Swetha Vinjamuri",
      experience: "17 year",
      location: "Banglore",
      img: "https://imagesx.practo.com/providers/dr-swetha-vinjamuri-gynecologist-bangalore-635192bf-aa81-4ef5-912f-a1de42d91d22.jpg?i_type=t_70x70-2x-webp",
      qualification: "Gynecologist/Obstetrician",
      fees: "RS 800",
      link: "https://www.practo.com/bangalore/doctor/dr-swetha-vinjamuri-gynecologist-obstetrician?practice_id=923159&specialization=PCOS&referrer=doctor_listing&page_uid=86bbd091-0e58-4118-9a3a-937923e2fdbe&category_name=symptom&category_id=35",
    },
    {
      name: "Dr. Suman Singh",
      experience: "30 year",
      location: "Banglore",
      img: "https://imagesx.practo.com/providers/dr-suman-singh-gynecologist-bangalore-ee75715c-749f-42e9-9f72-2ebb7c0a8fca.jpg?i_type=t_70x70-2x-webp",
      qualification: "Gynecologist/Obstetrician",
      fees: "RS 750",
      link: "https://www.practo.com/bangalore/doctor/dr-suman-singh-gynecologist-obstetrician-2?practice_id=984622&specialization=PCOS&referrer=doctor_listing&page_uid=86bbd091-0e58-4118-9a3a-937923e2fdbe&category_name=symptom&category_id=35",
    },
    //Delhi
    {
      name: "Dr. Pratibha Gupta",
      experience: "23 year",
      location: "Delhi",
      img: "https://imagesx.practo.com/providers/dr-pratibha-gupta-gynecologist-delhi-8048a391-84d6-42cc-aed5-3aa2e971abb0.jpg?i_type=t_70x70-2x-webp",
      qualification: "Gynecologist/Obstetrician",
      fees: "RS 700",
      link: "https://www.practo.com/delhi/doctor/dr-pratibha-gupta-gynecologist-obstetrician?practice_id=712320&specialization=PCOS&referrer=doctor_listing&page_uid=7bf81a17-f53c-4525-b569-e5829a90f0bd&category_name=symptom&category_id=35",
    },
    {
      name: "Dr. Nivedita Raizada",
      experience: "19 year",
      location: "Delhi",
      img: "https://imagesx.practo.com/providers/dr-nivedita-raizada-gynecologist-delhi-999ef697-350d-4892-ad4d-2d47b0307415.jpg?i_type=t_70x70-2x-webp",
      qualification: "Gynecologist/Obstetrician",
      fees: "RS 900",
      link: "https://www.practo.com/delhi/doctor/dr-nivedita-raizada-gynecologist-obstetrician?practice_id=918746&specialization=PCOS&referrer=doctor_listing&page_uid=7bf81a17-f53c-4525-b569-e5829a90f0bd&category_name=symptom&category_id=35",
    },
    {
      name: "Dr. Pankila Mittal",
      experience: "12 year",
      location: "Delhi",
      img: "https://imagesx.practo.com/providers/dr-pankila-mittal-obstetrician-delhi-9f332813-6138-416f-8b77-2d0f08f33d7f.jpg?i_type=t_70x70-2x-webp",
      qualification: "Gynecologist/Obstetrician",
      fees: "RS 700",
      link: "https://www.practo.com/delhi/doctor/pankila-mittal-obstetrics-gynecology?practice_id=1210268&specialization=PCOS&referrer=doctor_listing&page_uid=7bf81a17-f53c-4525-b569-e5829a90f0bd&category_name=symptom&category_id=35",
    },
    {
      name: "Dr. Sutopa Banerjee",
      experience: "27 year",
      location: "Delhi",
      img: "https://imagesx.practo.com/providers/dr-sutopa-banerjee-laparoscopic-surgeon-obs-gyn-delhi-27c7500d-85c2-4b57-8f62-4e147ebab37b.jpg?i_type=t_70x70-2x-webp",
      qualification: "Gynecologist/Obstetrician",
      fees: "RS 1600",
      link: "https://www.practo.com/delhi/doctor/drsutopabanerjee-gynecologist-obstetrician?practice_id=712694&specialization=PCOS&referrer=doctor_listing&page_uid=7bf81a17-f53c-4525-b569-e5829a90f0bd&category_name=symptom&category_id=35",
    },
    {
      name: "Dr. Meenu Ahuja",
      experience: "23 year",
      location: "Delhi",
      img: "https://imagesx.practo.com/providers/dr-meenu-ahuja-infertility-specialist-delhi-ef6c46f6-4485-415e-9015-b0f860534309.jpg?i_type=t_70x70-2x-webp",
      qualification: "Gynecologist/Obstetrician",
      fees: "RS 500",
      link: "https://www.practo.com/delhi/doctor/meenu-ahuja-gynecologist-obstetrician?practice_id=1381474&specialization=PCOS&referrer=doctor_listing&page_uid=7bf81a17-f53c-4525-b569-e5829a90f0bd&category_name=symptom&category_id=35",
    },
  ];
  res.status(200).json({ isOk: true, doctors });
});

export default route;
