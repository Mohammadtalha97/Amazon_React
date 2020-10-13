import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import deleteProduct from "../Redux/Actions/productDelete.js";
import listProducts from "../Redux/Actions/productList.js";
import saveProducts from "../Redux/Actions/productsSave.js";

function ProductsScreen(props) {
  const [modelVisiable, setmodelVisiable] = useState(false);

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [desciption, setDesciption] = useState("");

  //productSave
  const productSave = useSelector((state) => state.productSave);
  const {
    loading: loadingSave,
    success: successSave,
    error: errorSave,
  } = productSave;

  //productDelete
  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = productDelete;

  //productList
  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;

  const dispatch = useDispatch();

  useEffect(() => {
    if (successSave) {
      setmodelVisiable(false);
    }
    dispatch(listProducts());
    return () => {
      //
    };
  }, [successSave, successDelete]);

  const openModel = (products) => {
    setmodelVisiable(true);
    setId(products._id);
    setName(products.name);
    setPrice(products.price);
    setCategory(products.category);
    setImage(products.image);
    setBrand(products.brand);
    setCountInStock(products.countInStock);
    setDesciption(products.desciption);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveProducts({
        _id: id,
        name,
        price,
        image,
        brand,
        desciption,
        countInStock,
        category,
      })
    );
  };

  const deleteHandle = (product) => {
    dispatch(deleteProduct(product._id));
  };

  return (
    <div>
      <div className="content content-margined">
        <div className="product_header">
          <h3>Products</h3>
          <button className="button primary" onClick={() => openModel({})}>
            Create
          </button>
        </div>
        {modelVisiable && (
          <div className="form">
            <form onSubmit={submitHandler}>
              <ul className="form__container">
                <li>
                  <h2>Create Product</h2>
                </li>
                <li>
                  {loadingSave && <div>Loading...</div>}
                  {errorSave && <div>{errorSave}</div>}
                </li>
                <li>
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </li>
                <li>
                  <label htmlFor="price">Price</label>
                  <input
                    type="text"
                    name="price"
                    id="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </li>
                <li>
                  <label htmlFor="image">Image</label>
                  <input
                    type="text"
                    name="image"
                    id="image"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                  />
                </li>
                <li>
                  <label htmlFor="brand">Brand</label>
                  <input
                    type="text"
                    name="brand"
                    id="brand"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                  />
                </li>
                <li>
                  <label htmlFor="category">Category</label>
                  <input
                    type="text"
                    name="category"
                    value={category}
                    id="category"
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </li>

                <li>
                  <label htmlFor="countInStock">Count In Stock</label>
                  <input
                    type="text"
                    name="countInStock"
                    value={countInStock}
                    id="countInStock"
                    onChange={(e) => setCountInStock(e.target.value)}
                  />
                </li>

                <li>
                  <label htmlFor="desciption">Description</label>
                  <textarea
                    name="desciption"
                    id="desciption"
                    value={desciption}
                    onChange={(e) => setDesciption(e.target.value)}
                  />
                </li>

                <li>
                  <button type="submit" className="button primary">
                    {id ? "Update" : "Create"}
                  </button>
                  <button
                    onClick={() => {
                      setmodelVisiable(false);
                    }}
                    type="submit"
                    className="button secondary"
                  >
                    Back
                  </button>
                </li>
              </ul>
            </form>
          </div>
        )}
        <div className="product_list">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Brand</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((x) => (
                <tr>
                  <td>{x._id}</td>
                  <td>{x.name}</td>
                  <td>{x.price}</td>
                  <td>{x.category}</td>
                  <td>{x.brand}</td>
                  <td>
                    <button className="button" onClick={() => openModel(x)}>
                      {" "}
                      Edit
                    </button>{" "}
                    <button className="button" onClick={() => deleteHandle(x)}>
                      {" "}
                      Delete{" "}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ProductsScreen;
