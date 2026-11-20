import React, { useContext } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/frontend_assets/assets";
import { StoreContext } from "../../context/StoreContext";

const FoodItem = ({ id, name, price, description, image }) => {
  const {cartItems,addToCart,removeFromCart,url}=useContext(StoreContext); 

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img src={url+"/images/"+image} alt="" className="food-item-image" />
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="" />
        </div>
        <p className="food-item-desc">{description}</p>
        <div className="food-item-bottom">
          <p className="food-item-price">${price}</p>
          {!cartItems[id] ? (
            <button className="food-item-add" onClick={() => addToCart(id)}>
              Add +
            </button>
          ) : (
            <div className="food-item-counter">
              <button aria-label="Remove one" onClick={()=>removeFromCart(id)}>−</button>
              <p>{cartItems[id]}</p>
              <button aria-label="Add one" onClick={()=>addToCart(id)}>+</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
