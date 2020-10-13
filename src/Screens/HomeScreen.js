import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import listProducts from "../Redux/Actions/productList";

function HomeScreen(props) {
  // const [products, setProduct] = useState([]);
  const productList = useSelector((state) => state.productList);

  const { loading, products, error } = productList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts());

    // const fetchData = async () => {
    //   const { data } = await axios.get("http://localhost:5000/api/products");
    //   console.log("d", data);
    //   setProduct(data);
    // };
    // fetchData();
  }, []);

  return loading ? (
    <div>Loading...</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <div>
      <ul className="products">
        {products.map((product) => (
          <li key={product._id}>
            <div className="product">
              <Link to={"/product/" + product._id}>
                {" "}
                <img
                  className="product_image"
                  src={product.image}
                  alt="product"
                />
              </Link>

              <div className="product_name">
                <Link to={"/product/" + product._id}>{product.name}</Link>
              </div>
              <div className="product_brand">{product.brand}</div>
              <div className="product_price">{product.price}</div>
              <div className="product_rating">
                {product.rating} Starts {product.numReviews}Reviews
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomeScreen;
