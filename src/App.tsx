import "./App.css";
import Button from "./components/Button/Button";
import Card from "./components/Card/Card";
import Modal from "./components/Modal/Modal";
import { categories, productList } from "./data";
import { ChangeEvent, FormEvent, Fragment, useCallback, useState } from "react";
import { formInputsList } from "./data";
import InputModal from "./components/Input/InputModal";
import { IProduct } from "./Interface/Interfaces";
import { Validation } from "./Validation/Validation";
import Errors from "./Errors/Errors";
import { colors } from "./data";
import Colors from "./components/colors/Colors";
import SelectMenu from "./components/SelectMenu/SelectMenu";
import toast, { Toaster } from "react-hot-toast";

function App() {
  // ** -------------- Logic -------------------
  const productObj: IProduct = {
    id: "",
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: [],
    category: {
      name: "",
      imageURL: "",
    },
  };

  const productErrors = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
  };

  // ** --------------- State ------------
  const [products, setProducts] = useState<IProduct[]>(productList);
  const [product, setProduct] = useState<IProduct>(productObj);
  const [productToEdit, setProductToEdit] = useState<IProduct>(productObj);
  const [ProductToDelete, setProductToDelete] = useState<IProduct>(productObj);
  const [productToEditIdx, setProductToEditIdx] = useState<number>(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [errors, setErrors] = useState(productErrors);
  const [tempColor, setTempColor] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(categories[3]);
  const [confirmDelete, setConfirmDelete] = useState(false);

  // ** --------------- Handlers ------------
  // function handleInputs(e: ChangeEvent<HTMLInputElement>) {
  //   const { value, name } = e.target;
  //   setProduct({ ...product, [name]: value });

  //   setErrors({
  //     ...errors,
  //     [name]: "",
  //   });
  // }

  const handleInputs = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }, []);
  function handleToEditInputs(e: ChangeEvent<HTMLInputElement>) {
    const { value, name } = e.target;
    setProductToEdit({ ...productToEdit, [name]: value });

    setErrors({
      ...errors,
      [name]: "",
    });
  }

  function handleCancel() {
    setErrors(productErrors);
    close();
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const errors = Validation({
      title: product.title,
      description: product.description,
      imageURL: product.imageURL,
      price: product.price,
    });

    setErrors(errors);

    /*------------------ check if any value is empty &&  check if all values are empty --------------------*/
    const emptyValues =
      Object.values(errors).some((value) => value === "") &&
      Object.values(errors).every((value) => value === "");
    if (!emptyValues) {
      return;
    }

    setProducts((prev) => [
      { ...product, colors: tempColor, category: selectedCategory },
      ...prev,
    ]);
    setProduct(productObj);
    setTempColor([]);
    close();
    toast("item has been Added", {
      style: {
        backgroundColor: "green",
        color: "white",
        textTransform: "capitalize",
      },
    });
  }

  function handleToEdit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const errors = Validation({
      title: productToEdit.title,
      description: productToEdit.description,
      imageURL: productToEdit.imageURL,
      price: productToEdit.price,
    });

    setErrors(errors);

    /*------------------ Check if any value is empty &&  check if all values are empty --------------------*/
    const emptyValues =
      Object.values(errors).some((value) => value === "") &&
      Object.values(errors).every((value) => value === "");
    if (!emptyValues) {
      return;
    }

    const UpdatedProduct = [...products];
    UpdatedProduct[productToEditIdx] = {
      ...productToEdit,
      colors: tempColor.concat(productToEdit.colors),
    };
    setProducts(UpdatedProduct);

    setProductToEdit(productObj);
    setTempColor([]);
    closeEditModal();
    toast("item has been Updated", {
      style: {
        backgroundColor: "#3b82f6",
        color: "white",
        textTransform: "capitalize",
      },
    });
  }

  const handleDelete = () => {
    const filtered = products.filter(
      (product) => product.id !== ProductToDelete.id
    );
    setProducts(filtered);
    closeDeleteModal();
    toast("item has been deleted", {
      style: {
        backgroundColor: "red",
        color: "white",
        textTransform: "capitalize",
      },
    });
  };

  /*------------------ OPEN MODAL && CLOSE MODAL -------------------*/
  function open() {
    setIsOpen(true);
  }

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const openEditModal = useCallback(() => {
    setIsOpenEditModal(true);
  }, []);

  function closeEditModal() {
    setIsOpenEditModal(false);
  }

  const openDeleteModal = useCallback(() => {
    setConfirmDelete(true);
  }, []);

  function closeDeleteModal() {
    setConfirmDelete(false);
  }

  /* ------------------  RENDER -------------------*/
  const RenderProductList = products.map((product, idx) => (
    <Fragment key={product.id}>
      <Card
        product={product}
        key={product.id}
        productToEdit={productToEdit}
        setProductToEdit={setProductToEdit}
        openModal={openEditModal}
        idx={idx}
        setProductToEditIdx={setProductToEditIdx}
        openDeleteModal={openDeleteModal}
        setProductToDelete={setProductToDelete}
      />
    </Fragment>
  ));

  const RenderIFormInputs = formInputsList.map((input) => (
    <div className="flex flex-col mb-5" key={input.id}>
      <label htmlFor={input.name} className="text-sm/6 font-medium text-white">
        {input.label}
      </label>
      <InputModal
        type={input.type}
        name={input.name}
        id={input.id}
        value={product[input.name]}
        onChange={handleInputs}
      />
      <Errors msg={errors[input.name]} />
    </div>
  ));

  const RenderIFormInputsToEdit = formInputsList.map((input) => (
    <div className="flex flex-col mb-5" key={input.id}>
      <label htmlFor={input.name} className="text-sm/6 font-medium text-white">
        {input.label}
      </label>
      <InputModal
        type={input.type}
        name={input.name}
        id={input.id}
        value={productToEdit[input.name]}
        onChange={handleToEditInputs}
      />
      <Errors msg={errors[input.name]} />
    </div>
  ));

  const RenderProductColors = colors.map((color) => (
    <Colors
      color={color}
      key={color}
      onClick={() => {
        if (tempColor.includes(color)) {
          setTempColor((prev) => prev.filter((item) => item !== color));
          return;
        }
        if (productToEdit.colors.includes(color)) {
          setTempColor((prev) => prev.filter((item) => item !== color));
          return;
        }
        setTempColor((prev) => [...prev, color]);
      }}
    />
  ));

  return (
    <section id="latest_products" className="container mx-auto">
      <div className="latest_products">
        <div className="head_text flex justify-between items-center">
          <h1 className="text-blue-700 text-4xl font-bold capitalize">
            <span className="text-black">Latest</span> Products
          </h1>
          <Button className="bg-blue-500" onClick={open}>
            Add Product
          </Button>
        </div>

        <div className="products grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {RenderProductList}
        </div>
      </div>

      {/* ------------------ Add Product Modal ------------------- */}

      <Modal title="ADD PRODUCT" isOpen={isOpen} closeModal={close}>
        <form onSubmit={handleSubmit}>
          {RenderIFormInputs}

          <SelectMenu
            Selected={selectedCategory}
            setSelected={setSelectedCategory}
          />

          <div className="colors">
            <div className="flex items-center space-x-2 mb-3">
              {RenderProductColors}
            </div>
          </div>

          {tempColor.map((color) => (
            <span
              key={color}
              className="inline-block mr-1 mb-5 text-white/90 px-2 py-1 rounded-md"
              style={{ backgroundColor: color }}
            >
              {color}
            </span>
          ))}

          <div className="flex items-center justify-between space-x-2">
            <Button className="bg-blue-500 hover:bg-blue-600" width="w-full">
              add
            </Button>
            <Button
              className=" hover:bg-gray-800"
              width="w-full"
              onClick={handleCancel}
              type="button"
            >
              cancel
            </Button>
          </div>
        </form>
      </Modal>

      {/* ------------------ Edit Product Modal ------------------- */}
      <Modal
        title="EDIT THIS PRODUCT"
        isOpen={isOpenEditModal}
        closeModal={closeEditModal}
      >
        <form onSubmit={handleToEdit}>
          {RenderIFormInputsToEdit}

          <SelectMenu
            Selected={productToEdit.category}
            setSelected={(value) =>
              setProductToEdit({ ...productToEdit, category: value })
            }
          />

          <div className="colors">
            <div className="flex items-center space-x-2 mb-3">
              {RenderProductColors}
            </div>
          </div>

          {tempColor.concat(productToEdit.colors).map((color) => (
            <span
              key={color}
              className="inline-block mr-1 mb-5 text-white/90 px-2 py-1 rounded-md"
              style={{ backgroundColor: color }}
            >
              {color}
            </span>
          ))}

          <div className="flex items-center justify-between space-x-2">
            <Button className="bg-blue-500 hover:bg-blue-600" width="w-full">
              edit
            </Button>
            <Button
              className=" hover:bg-gray-800"
              width="w-full"
              onClick={closeEditModal}
              type="button"
            >
              cancel
            </Button>
          </div>
        </form>
      </Modal>

      {/* ------------------ Modal Delete ------------------- */}
      
      <Modal
        title="Are you Sure you want to delete this to product from your store ? "
        isOpen={confirmDelete}
        closeModal={closeDeleteModal}
      >
        <p className="mb-5 text-white/80 capitalize text-sm">
          deleting this product will remove it permanently from your inventory{" "}
        </p>
        <div className="flex items-center justify-between space-x-2">
          <Button
            className="bg-red-500 hover:bg-red-600"
            width="w-full"
            onClick={handleDelete}
          >
            delete
          </Button>
          <Button
            className=" hover:bg-gray-800"
            width="w-full"
            onClick={closeDeleteModal}
            type="button"
          >
            cancel
          </Button>
        </div>
      </Modal>

      <Toaster />
    </section>
  );
}

export default App;
