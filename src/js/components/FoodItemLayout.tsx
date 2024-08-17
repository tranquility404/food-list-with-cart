import { useEffect, useState } from "react";
import FoodItem from "../models/FoodItem";
// import img from "../../assets/images/image-waffle-mobile.jpg"

function FoodItemLayout({
  foodItem,
  state,
}: {
  foodItem: FoodItem,
  state: [FoodItem[], React.Dispatch<React.SetStateAction<FoodItem[]>>];
}) {
  const[foodItemState, setFoodItemState] = useState<FoodItem>(foodItem);
  const [mobileImage, setMobileImage] = useState<string>();
  const [tabletImage, setTabletImage] = useState<string>();
  const [desktopImage, setDesktopImage] = useState<string>();
  const [isHovered, setIsHovered] = useState([false, false]);

  useEffect(() => {
    const loadImages = async () => {
      const mobile = await import(
        `../../assets/${foodItemState.image.mobile}`
      );
      const tablet = await import(
        `../../assets/${foodItemState.image.tablet}`
      );
      const desktop = await import(
        `../../assets/${foodItemState.image.desktop}`
      );

      setMobileImage(mobile.default);
      setTabletImage(tablet.default);
      setDesktopImage(desktop.default);
    };

    loadImages();
  }, [foodItemState.image]);

  useEffect(() => {
    const latestFoodItem: FoodItem = state[0].find(item => item.id == foodItemState.id) as FoodItem;
    if (latestFoodItem !== foodItemState)
      setFoodItemState(latestFoodItem);
  }, state[0]);

  const addToCartBtnClicked = (event: {
    currentTarget: any;
    clientX: number;
  }) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const clickX = event.clientX - rect.left;

      if (foodItemState.noOfItems === 0) {
        setFoodItemState({...foodItemState, noOfItems: 1})
        
        state[1]((prevItems) =>
          prevItems.map((foodItem) =>
            foodItem.id === foodItemState.id
              ? { ...foodItem, noOfItems: 1 }
              : foodItem
          )
        );
        console.log(state[0]);
      }

      else {

        if (clickX < 60) {
          setFoodItemState({ ...foodItemState, noOfItems: foodItemState.noOfItems - 1 });
          state[1]((prevItems) =>
            prevItems.map((foodItem) =>
              foodItem.id === foodItemState.id
                ? { ...foodItem, noOfItems: foodItemState.noOfItems - 1 }
                : foodItem
            )
          );
          console.log(state[0]);
        }
        else if (clickX > rect.width - 60) {
          setFoodItemState({
            ...foodItemState,
            noOfItems: foodItemState.noOfItems + 1,
          });
          state[1]((prevItems) =>
            prevItems.map((foodItem) =>
              foodItem.id === foodItemState.id
                ? { ...foodItem, noOfItems: foodItemState.noOfItems + 1 }
                : foodItem
            )
          );
          console.log(state[0]);
        }
        else
          console.log('Main button content clicked');
      }
  };

  const handleMouseOver = (event: {
    currentTarget: any;
    clientX: number;
  }) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const clickX = event.clientX - rect.left;

    console.log(clickX);
    
    if (clickX < 35) 
      setIsHovered([true, false])
    else if (clickX > rect.width - 40) 
      setIsHovered([false, true]);
    else
      setIsHovered([false, false]);
  };

  const handleMouseOut = () => {
    console.log("out");

    setIsHovered([false, false])
  };

  return (
    <div
      className={`food-item food-item${foodItemState.id} ${
        foodItemState.noOfItems === 0 ? "" : "food-item-selected"
      }`}
    >
      <picture>
        <source media="(min-width: 990px)" srcSet={desktopImage} />
        <source media="(min-width: 600px)" srcSet={tabletImage} />
        <source srcSet={mobileImage} />

        <img
          className="food-img"
          alt={foodItemState.name}
        />
      </picture>

      <button
        className={`add-to-cart btn btn--primary ${isHovered[0]? "before-hovered": ""} ${isHovered[1]? "after-hovered": ""}`}
        onClick={addToCartBtnClicked}
        onMouseMove={ handleMouseOver }
      >
        {foodItemState.noOfItems === 0
          ? "Add to Cart"
          : foodItemState.noOfItems}
      </button>

      <h3>{foodItemState.category}</h3>
      <h2>{foodItemState.name}</h2>
      <h2 className="price">{foodItemState.price.toFixed(2)}</h2>
    </div>
  );
}

export default FoodItemLayout;
