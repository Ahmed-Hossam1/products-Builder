export interface IProduct {
  id: string | number;
  title: string;
  description: string;
  imageURL: string;
  price: string | number;
  colors: string[];
  category: { name: string; imageURL: string };
}

export interface IFormInput {
  id: string;
  name: "title" | "description" | "imageURL" | "price";
  label: string;
  type: string;
}

export interface ICategory {
  id: number | string;
  name: string;
  imageURL: string;
}
