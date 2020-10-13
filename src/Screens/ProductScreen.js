import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import detailsProduct from "../Redux/Actions/productDetailAction";

function ProductScreen(props) {
  const [qty, setQty] = useState();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, product, error } = productDetails;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailsProduct(props.match.params.id));
    return () => {
      //
    };
  }, []);

  const handleAddToCart = () => {
    props.history.push("/cart/" + props.match.params.id + "?qty=" + qty);
  };

  return (
    <div>
      <div className="back_to_result">
        <Link to="/">Back to result</Link>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className="details">
          <div className="details_image">
            {/* <img src={products.image} alt="product" /> */}
            <img src="../images/d1.jpg" alt="product" />
          </div>
          <div className="details_info">
            <ul>
              <li>
                <h4>{product.name} </h4>
              </li>

              <li>
                {product.rating} Starts ({product.numReviews} Reviews)
              </li>

              <li>
                Price: <b>${product.price}</b>
              </li>

              <li>
                Description:
                <div>{product.description}</div>
              </li>
            </ul>
          </div>
          <div className="details_action">
            <ul>
              <li>Price : {product.price}</li>
              <li>
                Status : {product.countInStock > 0 ? "In Stock" : "Unavaiable"}
              </li>
              <li>
                Qty :{" "}
                <select
                  value={qty}
                  onChange={(e) => {
                    setQty(e.target.value);
                  }}
                >
                  {[...Array(product.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </li>
              <li>
                {product.countInStock > 0 && (
                  <button onClick={handleAddToCart} className="button">
                    Add To Cart
                  </button>
                )}
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductScreen;
