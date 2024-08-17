// import food from "../../assets/images/image-tiramisu-thumbnail.jpg";
import { useEffect, useState } from "react";
import FoodItem from "../models/FoodItem";

function OrderCartItemLayout({ foodItem }: { foodItem: FoodItem }) {
  return (
    <div className="cart-item">
      <img
        className="cart-food-img"
        src={`/assets/${foodItem.image.thumbnail}`}
        alt=""
      />
      <h2 className="cart-item-name">{foodItem.name}</h2>
      <div className="cart-food-details">
        <h2 className="cart-item-no-of-items">{foodItem.noOfItems}</h2>
        <p className="cart-item-price">{foodItem.price.toFixed(2)}</p>
      </div>
      <p className="cart-item-total-price">
        {(foodItem.noOfItems * foodItem.price).toFixed(2)}
      </p>
    </div>
  );
}

export default OrderCartItemLayout;
