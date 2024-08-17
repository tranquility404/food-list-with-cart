import { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";
import data from "./data/data.json";
import FoodItemLayout from "./js/components/FoodItemLayout";
import FoodItem from "./js/models/FoodItem";
import CartItemLayout from "./js/components/CartItemLayout";
import cartEmpty from "/assets/images/illustration-empty-cart.svg";
import tree from "/assets/images/icon-carbon-neutral.svg";
import check from "/assets/images/icon-order-confirmed.svg";
import OrderCartItemLayout from "./js/components/OrderCartItemLayout";

const foodItemArray: FoodItem[] = [];

foodItemArray.push(
  ...data.map((foodData, idx) => {
    return {
      id: idx,
      name: foodData.name,
      category: foodData.category,
      price: foodData.price,
      image: foodData.image,
      noOfItems: 0
    } as FoodItem;
  })
);

function App() {
  const [foodItemList, setFoodItemList] = useState<FoodItem[]>(foodItemArray);
  const [cartList, setCartItems] = useState<FoodItem[]>([]);
  const dialogRef = useRef<HTMLDialogElement>(null);
  
  useEffect(() => {
    setCartItems(foodItemList.filter(foodItem => foodItem.noOfItems !== 0));
    console.log(cartList);
    
  }, foodItemList);

  const confirmOrderBtnClicked = () => {
    dialogRef.current!.showModal();
  }

  const handleClose = () => {
    dialogRef.current!.close();
    setFoodItemList(foodItemList.map((foodItem) => foodItem.noOfItems !== 0? {...foodItem, noOfItems: 0}: foodItem));
  };

  return (
    <section className="container">
      <div className="large-screen-cols">
        <article className="col--2-3">
          <h1 className="title-large">Desserts</h1>

          <div className="food-item-list">
            {foodItemList.map((foodItem, idx) => (
              <FoodItemLayout
                key={idx}
                foodItem={foodItem}
                state={[foodItemList, setFoodItemList]}
              />
            ))}
          </div>
        </article>

        <article
          className={
            "cart col--1-3 " + (cartList.length === 0 ? "is-cart-empty" : "")
          }
        >
          <h1>Your Cart ({cartList.reduce((a, b) => a + b.noOfItems, 0)})</h1>

          <div className="cart-empty-content">
            <img className="cart-empty-img" src={cartEmpty} alt="Empty Cart" />
            <p>Your added items will appear here</p>
          </div>

          <div className="cart-content">
            {cartList.map((it) => (
              <CartItemLayout
                key={it.id}
                cartItem={it}
                state={[foodItemList, setFoodItemList]}
              />
            ))}

            <div className="cart-bill">
              <p>Order Total</p>
              <h1>
                {`$${cartList
                  .reduce(
                    (sum, cartItem) =>
                      sum + cartItem.noOfItems * cartItem.price,
                    0
                  )
                  .toFixed(2)}`}
              </h1>
            </div>

            <div className="cart-ad">
              <img src={tree} alt="A Tree" />
              This is a <strong>carbon-neutral</strong> delivery
            </div>

            <button
              className="btn btn--secondary btn--long"
              onClick={confirmOrderBtnClicked}
            >
              Confirm Order
            </button>
          </div>
        </article>
      </div>

      <dialog className="order-confirm-dialog" ref={dialogRef}>
        <article className="container">
          <img src={check} />
          <h1 className="title-large">Order Confirmed</h1>

          <h2 className="sub-heading">We hope you enjoy your food!</h2>

          <div className="cart-content">
            <div className="cart-content-list">
              {cartList.map((foodItem, idx) => (
                <OrderCartItemLayout key={idx} foodItem={foodItem} />
              ))}
            </div>

            <div className="cart-bill">
              <p>Order Total</p>
              <h1>
                {`$${cartList
                  .reduce(
                    (sum, cartItem) =>
                      sum + cartItem.noOfItems * cartItem.price,
                    0
                  )
                  .toFixed(2)}`}
              </h1>
            </div>
          </div>
          <button
            className="btn btn--secondary btn--long"
            onClick={handleClose}
          >
            Start New Order
          </button>
        </article>
      </dialog>
      {/* <OrderConfirmDialog openState={[dialogOpen, setDialogOpen]}/> */}
    </section>
  );
}

export default App;
