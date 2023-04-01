import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";
import { GetProductById } from "../api/api";
import { KeyedButton } from "./Buttons";

function Product() {
  const [currProduct, setCurrProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthed, setIsAuthed] = useState(false);

  const { productId } = useParams();

  const spinner = (
    <ColorRing
      visible={true}
      height="80"
      width="80"
      ariaLabel="blocks-loading"
      wrapperStyle={{}}
      wrapperClass="blocks-wrapper"
      colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
    />
  );

  useEffect(() => {
    let productObj;
    const getProductById = async () => {
      productObj = await GetProductById(productId);
      setIsLoading(false);
      console.log("product is ", productObj);
      setCurrProduct(productObj);
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

  return (
    <>
      {isLoading ? spinner : null}

      <div className="p-5">
        <div className="card lg:card-side bg-white shadow-xl">
          <figure className="max-w-lg">
            <img src="/skis.png" alt="Album" />
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
              <div id="price" className="font-bold text-2xl text-brightRed mt-5">
                {currProduct.price}
              </div>
            </div>
            <div className="card-actions self-end">
              {isAuthed ?
              <KeyedButton text="ADD TO CART" path={currProduct.id} />
              :
              <KeyedButton text="LOGIN" path={currProduct.id} />
            }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Product;
