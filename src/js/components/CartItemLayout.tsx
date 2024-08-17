import removeIcon from "/assets/images/icon-remove-item.svg";
import FoodItem from "../models/FoodItem";

function CartItemLayout({
  cartItem,
  state,
}: {
  cartItem: FoodItem;
  state: [FoodItem[], React.Dispatch<React.SetStateAction<FoodItem[]>>]
}) {
  const removeFromCartBtnClicked = () => {
    state[1]((prevItems) =>
      prevItems.map((item) =>
        item.id === cartItem.id
          ? { ...item, noOfItems: 0 }
          : item
      )
    );
  };

  return (
    <div className="cart-item">
      <h2 className="cart-item-name">{cartItem.name}</h2>
      <h2 className="cart-item-no-of-items">{cartItem.noOfItems}</h2>
      <p className="cart-item-price">{cartItem.price.toFixed(2)}</p>
      <p className="cart-item-total-price">{(cartItem.price * cartItem.noOfItems).toFixed(2)}</p>
      <img
        className="cart-remove-item"
        src={removeIcon}
        alt="Remove Icon"
        onClick={removeFromCartBtnClicked}
      />
    </div>
  );
}

export default CartItemLayout;
