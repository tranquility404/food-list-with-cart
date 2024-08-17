interface Image {
  thumbnail: string;
  mobile: string;
  tablet: string;
  desktop: string;
}

export default interface FoodItem {
  id: number;
  name: string;
  category: string;
  price: number;
  image: Image;
  noOfItems: number;
}

//   constructor(
//     id: Number,
//     name: String,
//     category: String,
//     price: Number,
//     image: Image,
//     noOfItems: Number
//   ) {
//       this.id = id;
//       this.name = name;
//       this.category = category;
//       this.price = price;
//       this.image = image;
//       this.noOfItems = noOfItems;
//   }

//   updateNoOfItems(newNoOfItems: Number) {
//     this.noOfItems = newNoOfItems;
//   }
// }
