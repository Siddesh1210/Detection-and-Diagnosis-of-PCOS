import React, { useEffect, useState } from "react";

const DietPage = () => {
  let [specificDietPlan, setSpecificDietPlan] = useState(null);
  const [typeFood, setTypeFood] = useState("Veg");
  const [typePcos, setTypePcos] = useState("adernal");

  const handleTypeFoodChange = (event) => {
    setTypeFood(event.target.value);
  };

  const handleTypePCOSChange = (event) => {
    setTypePcos(event.target.value);
  };

  async function getDietPlan() {
    const data = await fetch("http://localhost:1234/pcos-test/dietplan", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await data.json();
    if (typePcos == "adernal") {
      setSpecificDietPlan(result.pcosDiet[0]);
    } else if (typePcos == "pill-induced") {
      setSpecificDietPlan(result.pcosDiet[1]);
    } else if (typePcos == "inflamatory") {
      setSpecificDietPlan(result.pcosDiet[2]);
    } else {
      setSpecificDietPlan(result.pcosDiet[3]);
    }
    console.log(result.pcosDiet[2].isNonVeg);
    // setSpecificDietPlan(result.pcosDiet[2]);
  }
  useEffect(() => {
    getDietPlan();
  }, [typePcos]);
  return (
    <>
      <div className="container-fluid">
        <div className="row my-3 justify-content-evenly">
          <div className="col-md-11 text-justify">
            <h2 className="fs-2 text-center fw-bold">Foods To Eat With PCOS</h2>
            <p>
              A PCOS-friendly diet includes a variety of whole foods from
              different food groups. This is an easy way to ensure that you’re
              hitting on a wide range of nutrients that are beneficial for PCOS.
              <br></br>
              Here are some of the best foods to incorporate as part of your
              PCOS-friendly diet:
            </p>
            <ul>
              <li>
                Lean Protein – Especially chicken, turkey, lean red meat (beef,
                pork), fish, seafood, tofu tempeh, edamame
              </li>
              <li>
                Omega 3 Fatty Acids – walnuts, chia seeds, flaxseeds, hemp
                hearts and fatty fish such as salmon, mackerel, and sardines
              </li>
              <li>
                Fruits: berries, kiwis, cherries, apples, bananas, pomegranate,
                peaches
              </li>
              <li>
                Vegetables – broccoli, cauliflower, cabbage, tomatoes, sweet
                potato, peppers, and leafy greens like spinach and kale
              </li>
              <li>Whole Grains: oats, quinoa, brown rice, whole grain bread</li>
            </ul>
          </div>
          <div className="col-md-11 text-justify">
            <h2 className="fs-2 text-center fw-bold">Foods To Avoid With PCOS</h2>
            <p>
              There aren’t any foods that everyone who has PCOS needs to avoid
              entirely. Balance is the key to an overall healthy diet that is
              sustainable. That said, it’s helpful to prioritize certain foods
              more frequently, such as those listed in the section above.
              <br></br>
              Limit the following foods:
            </p>
            <ul>
              <li>
                Highly processed foods and meats: fast food, potato chips,
                pretzels, sausage, hot dogs, bacon, highly processed deli meat
                such as salami
              </li>
              <li>
                Sugary drinks: soft drinks such as regular soda, sweetened tea,
                energy drinks, fruit juices
              </li>
              <li>
                Sugary foods or foods with high amounts of added sugars:
                pastries, cookies, cakes, pies, candy
              </li>
              <li>Refined grains: white flour, white bread, white rice </li>
              <li>Alcohol</li>
            </ul>
          </div>
          <div className="col-md-11 text-justify">
            <h2 className="fs-2 text-center fw-bold">Your 7-Day PCOS Diet Plan Chart</h2>
            <p>
              This 7-day meal plan includes recipes for 3 meals and 1 snack per
              day along with a calories intake.{" "}
            </p>
          </div>
        </div>
        <div className="row justify-content-evenly my-3">
          <div className="col-md-3">
            <p style={{borderBottom:"1px solid purple",padding:"3px 5px",borderRadius:"3px"}}>Select Diet Type : </p>
            <select
              className="form-select"
              aria-label="Default select example"
              onChange={handleTypeFoodChange}
              value={typeFood}
            >
              {/* <option disabled>Select the Diet Type:</option> */}
              <option value="Veg">Veg</option>
              <option value="Non-Veg">Non-Veg</option>
            </select>
          </div>
          <div className="col-md-3">
            <p style={{borderBottom:"1px solid grey",padding:"3px 5px",borderRadius:"3px"}}>Select PCOS Type:</p>
            <select
              className="form-select"
              aria-label="Default select example"
              onChange={handleTypePCOSChange}
              value={typePcos}
            >
              {/* <option disabled>Select the PCOS Type :</option> */}
              <option value="adernal">Adernal</option>
              <option value="pill-induced">Pill Induced</option>
              <option value="insulin">Insulin</option>
              <option value="inflamatory">Inflammatory</option>
            </select>
          </div>
        </div>
        <div className="row justify-content-center my-4">
          <div className="col-md-11">
            <table className="table table-success table-striped-columns">
              <thead>
                <tr>
                  <th scope="col">Day</th>
                  <th scope="col">BreakFast</th>
                  <th scope="col">Lunch</th>
                  <th scope="col">Snack</th>
                  <th scope="col">Dinner</th>
                </tr>
              </thead>
              <tbody>
                {typeFood == "Veg"
                  ? specificDietPlan?.isVeg?.map((item, index) => {
                      return (
                        <tr key={index}>
                          <th>{item.day}</th>
                          <td>
                            {item.plan.breakfast[0]}
                            <br></br>
                            {item.plan.breakfast[1]}
                          </td>
                          <td>
                            {item.plan.lunch[0]}
                            <br></br>
                            {item.plan.lunch[1]}
                          </td>
                          <td>
                            {item.plan.snack[0]}
                            <br></br>
                            {item.plan.snack[1]}
                          </td>
                          <td>
                            {item.plan.dinner[0]}
                            <br></br>
                            {item.plan.dinner[1]}
                          </td>
                        </tr>
                      );
                    })
                  : specificDietPlan?.isNonVeg?.map((item, index) => {
                      return (
                        <tr key={index}>
                          <th>{item.day}</th>
                          <td>
                            {item.plan.breakfast[0]}
                            <br></br>
                            {item.plan.breakfast[1]}
                          </td>
                          <td>
                            {item.plan.lunch[0]}
                            <br></br>
                            {item.plan.lunch[1]}
                          </td>
                          <td>
                            {item.plan.snack[0]}
                            <br></br>
                            {item.plan.snack[1]}
                          </td>
                          <td>
                            {item.plan.dinner[0]}
                            <br></br>
                            {item.plan.dinner[1]}
                          </td>
                        </tr>
                      );
                    })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default DietPage;
