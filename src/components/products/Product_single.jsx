import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";
import { GetProductByIdAxios, addToCartAxios } from "../../api/api";
import { KeyedButton } from "../buttons/Buttons";
import AuthContext from "../authContext/AuthContext";
import LoadingSpinner from "../LoadingSpinner";

function Product() {
  const { isLoggedIn } = useContext(AuthContext);
  const { userID } = useContext(AuthContext);
  const [currProduct, setCurrProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [resultMessage, setResultMessage] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const { productId } = useParams();
  const spinner = LoadingSpinner();

  useEffect(() => {
    let productObj;
    const getProductById = async () => {
      productObj = await GetProductByIdAxios(productId);
      if (productObj.data) {
        setIsLoading(false);
        setCurrProduct(productObj.data);
      } else {
        setIsLoading(false);
        setErrorMessage(productObj.error.message);
      }
    };
    getProductById();
  }, []);

  let stockStatement;
  let stock = currProduct.stock;

  if (stock > 0) {
    stockStatement = (
      <>
        <h2>Still in Stock!</h2>
        <div>Only {stock} left.</div>
      </>
    );
  } else {
    stockStatement = (
      <>
        <h2>Out of Stock!</h2>
      </>
    );
  }

  const handleAddToCart = () => {
    console.log("in handleAddToCart");
    const addToCart = async () => {
      //! max axios call
      const response = await addToCartAxios(
        userID,
        productId,
        currProduct.price
      );

      if (response.error) {
        setIsLoading(false);
        setErrorMessage(response.error.message);
      } else if (response.data) {
        setResultMessage("This product was added to your Cart");
      }
    };
    addToCart();
  };

  return (
    <>
      {isLoading ? spinner : null}
      {errorMessage && (
        <p className="text-red-600  font-bold ">{errorMessage}</p>
      )}
      <div className="p-5 ">
        <div className="card lg:card-side bg-white shadow-xl grid grid-cols-1 md:grid-cols-2">
          <figure
            className="
          "
          >
            <img src={`/${currProduct.image_name}`} alt="product" />
          </figure>
          <div className="card-body text-left flex flex-col justify-between border">
            <div className="">
              <h1 className="card-title text-4xl text-backgroundClr">
                {currProduct.name}
              </h1>
              <div className="font-bold font-roboto text-red mt-3 ">
                "{currProduct.description}"
              </div>
              {stockStatement}
              <div
                id="price"
                className="font-bold text-2xl text-brightRed mt-5"
              >
                {currProduct.price}
              </div>
            </div>
            <div className="card-actions flex justify-between border w-full">
              <div className="text-red-600  font-bold ">
                {resultMessage}
              </div>
              {isLoggedIn ? (
                <button
                  className="bg-key text-white ml-auto self-end "
                  onClick={handleAddToCart}
                >
                  ADD TO CART
                </button>
              ) : (
                <Link to={`/login`}>
                  <KeyedButton text="LOGIN" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Product;
