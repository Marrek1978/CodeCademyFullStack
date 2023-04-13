import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { KeyedButton } from "../buttons/Buttons";
import { GetProductsByCategoryAxios } from "../../api/api";
import ProductGrid from "./ProductGrid";
import LoadingSpinner from "../LoadingSpinner";

function ShopAll() {
  const [activeTab, setActiveTab] = useState("skis");
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErroMessage] = useState();

  const spinner = LoadingSpinner();

  useEffect(() => {
    const getProductsByCategory = async () => {
      setIsLoading(true);
      const productsByCategory = await GetProductsByCategoryAxios(activeTab);
      if (productsByCategory.data) {
        setIsLoading(false);
        setProducts(productsByCategory.data);
        console.log(productsByCategory.data);
      }

      if (productsByCategory.error) {
        setIsLoading(false);
        setErroMessage(productsByCategory.error.message);
      }
    };

    getProductsByCategory();
  }, [activeTab]);

  return (
    <>
      <main className="mt-12">
        <div className="container mx-auto">
          <section>
            <div className="flex flex-wrap justify-center mb-4">
              <button
                className={`${
                  activeTab === "skis" ? "bg-key text-white" : "bg-gray-200"
                } px-4 py-2 rounded shadow mx-2`}
                onClick={() => setActiveTab("skis")}
              >
                Skis
              </button>
              <button
                className={`${
                  activeTab === "boots" ? "bg-key text-white" : "bg-gray-200"
                } px-4 py-2 rounded shadow mx-2`}
                onClick={() => setActiveTab("boots")}
              >
                Boots
              </button>
              <button
                className={`${
                  activeTab === "poles" ? "bg-key text-white" : "bg-gray-200"
                } px-4 py-2 rounded shadow mx-2`}
                onClick={() => setActiveTab("poles")}
              >
                Poles
              </button>
            </div>
          </section>
          {errorMessage && (
                <p className="text-red-600  font-bold col-span-2">
                  {errorMessage}
                </p>
              )}
            {isLoading ? spinner : null}
          <div className="mt-12">
            <ProductGrid products={products} />
            {/* {content.map((item, index) => (
            <div key={index} className="mb-4"> 
               Render your content here 
               <h2>{item.name}</h2> 
              </div> 
            ))}  */}
          </div>
        </div>
      </main>
    </>
  );
}

export default ShopAll;
