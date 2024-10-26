interface IProps {
  title: string;
  description: string;
  imageURL: string;
  price: string | number;
}
export const Validation = (product: IProps) => {
  const Regex =
    /^(ftp|http|https)?:\/\/(?:[a-z0-9-]+\.)+[a-z]{2,6}(?:\/[^/#?]+)+\.(?:jpe?g|gif|png|bmp)$/i;
  const errors: {
    title: string;
    description: string;
    imageURL: string;
    price: string;
  } = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
  };

 
  
  if (
    !product.title.trim() ||
    product.title.length < 8 ||
    product.title.length > 80
  ) {
    errors.title = "Title must be between 8 and 80 characters!";
  }
  if (
    !product.description.trim() ||
    product.description.length < 10 ||
    product.description.length > 900
  ) {
    errors.description = "description must be between 10 and 900 characters!";
  }
  if (!product.imageURL || !Regex) {
    errors.imageURL = "imageURL must be a Valid imageURL Required";
  }
  if (!product.price || isNaN(Number(product.price))) {
    errors.price = "Price is Required And must be a number";
  }
  



  return errors;
};
