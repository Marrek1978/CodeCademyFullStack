import React, { useState, useEffect } from "react";
import { ColorRing } from "react-loader-spinner";
import { KeyedButton } from "./buttons/Buttons";
import { GetAllProductsAxios } from "../api/api";
import ProductGrid from "./products/ProductGrid";
import LoadingSpinner from "./LoadingSpinner";

const spinner = LoadingSpinner()

function Home() {
  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErroMessage] = useState();
  ///useEffect -> fetch from endpoint
  useEffect(() => {
    const getAllProducts = async () => {
      const allProductsLimit10 = await GetAllProductsAxios();
      if (allProductsLimit10.data) {
        setIsLoading(false);
        setAllProducts(allProductsLimit10.data);
      }

      if (allProductsLimit10.error) {
        setIsLoading(false);
        setErroMessage(allProductsLimit10.error.message);
      }
    };

    getAllProducts();
  }, []);

  return (
    <>
      <div className="">
        <section id="hero" className="">
          <div className="grid grid-rows[800px] ">
            <div
              className="hero"
              style={{
                backgroundImage: `url("/banner1.png")`,
              }}
            >
              <div className="hero-overlay bg-opacity-30"></div>
              <div className="hero-content text-center text-neutral-content p-12">
                <div className="max-w-md">
                  <h1 className="mb-5  font-bold text-paleKey text-8xl">
                    Ski Sale
                  </h1>
                  <p
                    className="mb-5
              text-redBrown text-4xl font-bold tracking-widest"
                  >
                    Always on Sale
                  </p>
                  <div className="mt-5">
                    <KeyedButton text="SHOP ALL" path="1" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <main className="">
          <section id="all-products" className="drop-shadow-2xl pg-12">
            <h2
              className=" text-5xl font-bold text-redBrown
                pt-6 pb-12  " >
              Sale Items
            </h2>
           
            {isLoading ? spinner : null}
            {errorMessage && (
              <h2 className="text-center  text-red-600  text-xl
              font-bold w-full ">
                {errorMessage}
              </h2>
            )}

            <ProductGrid products={allProducts} />
          </section>
        </main>
      </div>
    </>
  );
}

export default Home;
