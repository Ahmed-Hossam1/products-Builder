// import Button from "../Button/Button";
import Colors from "../colors/Colors";
import { IProduct } from "../../Interface/Interfaces";
import Button from "../Button/Button";

interface IProps {
  product: IProduct;
  productToEdit: IProduct;
  setProductToEdit: (product: IProduct) => void;
  openModal: () => void;
  setProductToEditIdx : (value : number) => void
  idx : number
  openDeleteModal : () => void
  setProductToDelete :(product : IProduct)=> void
}
const Card = ({ product, setProductToEdit, openModal  ,idx, setProductToEditIdx , openDeleteModal , setProductToDelete}: IProps) => {
  // ------------ Logic -------------
  const { title, description, imageURL, price, category, colors } = product;

  /* ------------ Handlers -----------------*/
  const handleEdit = () => {
    openModal();
    setProductToEdit(product);
    setProductToEditIdx(idx)
  };
  const handleDelete = () => {
    openDeleteModal();
    setProductToDelete(product);
  };

  const RenderProductColors = colors.map((color) => (
        <Colors color={color} key={color} />
  ));

  return (
    <div className="product_card border-2 rounded-md p-2 max-w-sm  md:max-w-lg mx-auto md:mx-0 ">
      <div className="img">
        <img
          src={imageURL}
          alt="img"
          className="rounded-md max-h-[300px] w-full object-cover"
        />
      </div>

      <div className="content mt-4">
        <h2 className="title text-2xl font-semibold capitalize">{title}</h2>
        <p className="description leading-7 text-gray-500 capitalize">
          {description.slice(0, 100) + "..."}
        </p>

        <div className="colors">
          <div className="flex items-center space-x-2">
            {RenderProductColors}
          </div>
        </div>

        <div className="flex justify-between items-center mb-2">
          <div className="text-blue-800 font-bold">${price}</div>

          <span className="flex items-center gap-2">
            <div className="capitalize">{category.name}</div>
            <div>
              <img
                src={category.imageURL}
                alt={category.name}
                className="w-8 h-8 rounded-full object-cover"
              />
            </div>
          </span>
        </div>

        <div className="buttons flex items-center justify-between space-x-2">
          <Button className="bg-blue-500" width="w-full" onClick={handleEdit}>
            edit
          </Button>
          <Button className="bg-red-500" width="w-full" onClick={handleDelete}>
            delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Card;
