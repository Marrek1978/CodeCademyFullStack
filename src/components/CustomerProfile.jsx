import React, { useState, useEffect } from "react";
import { ColorRing } from "react-loader-spinner";
import { GetCustomerById } from "../api/api";
import ProductCard from "./ProductCard";
import { KeyedButton } from "./Buttons";
import { useParams } from "react-router-dom";

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

function CustomerProfile(){
  const { customerId } = useParams();
  const [currCustomer, setCurrCustomer] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthed, setIsAuthed] = useState(false);

  ///useEffect -> fetch from endpoint
  useEffect(() => {
    let customer;
    const getCustomerById = async () => {
      customer = await GetCustomerById();
      setIsLoading(false);
      console.log("customer is ", customer);
      setCurrCustomer(customer);
    };
    getCustomerById();
  }, []);

  return (
    <>
      <section id="hero" className="relative">
        <img src="/banner1.png" className="w-full " />
        <div
          id="hero-text"
          className="absolute top-1/2 left-2/3  -translate-x-1/2 -translate-y-1/2"
        >
          <div className="text-paleKey text-8xl font-bold ">Ski Sale</div>
          <h2 className="text-redBrown text-4xl font-bold tracking-widest">
            Always on Sale
          </h2>
          {/* <button className="bg-orange-600 text-white mt-5 d">SHOP ALL</button> */}
          <div className="mt-5">
            <KeyedButton text="SHOP ALL" path="1" />
          </div>
        </div>
      </section>
      <main className="bg-white">
        <section id="all-products" className="drop-shadow-2xl p-10">
          <h2
            className="
          text-5xl font-bold text-redBrown
          pt-10 pb-16
          "
          >
            All Sale Items
          </h2>
          <div
            id="homePage-grid"
            className="
              max-w-full
              grid gap-4
              grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
          "
          >
            {isLoading ? spinner : null}
            {/* all products is {allProducts} */}
            {allProducts?.map((product) => (
              <div key={product.id}>
                <ProductCard
                  category={product.category}
                  id={product.id}
                  name={product.name}
                  description={product.description}
                  imagePath={product.image_name}
                  price={product.price}
                  stock={product.stock}
                />
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

export default CustomerProfile;