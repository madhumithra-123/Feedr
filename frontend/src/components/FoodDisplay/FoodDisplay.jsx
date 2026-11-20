import React, { useContext } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";
import { ArrowRightIcon } from "../Icons/Icons";

const FoodDisplay = ({ category, setCategory }) => {
  const { food_list } = useContext(StoreContext);
  return (
    <div className="food-display" id="food-display">
      <div className="section-head">
        <h2>Popular dishes</h2>
        <a
          href="#food-display"
          className="view-all"
          onClick={() => setCategory && setCategory("All")}
        >
          View all <ArrowRightIcon />
        </a>
      </div>
      <div className="food-display-list">
        {food_list.map((item, index) => {
          if ((category === "All" || category === item.category))
            return (
              <FoodItem
                key={index}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
              />
            );
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
