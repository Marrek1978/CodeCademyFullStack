import React from "react";
import ProductCard from "./ProductCard";

function ProductGrid({ products }) {
  return (
    <>
      <div
        id="homePage-grid"
        className="
              max-w-full
              justify-center
              grid gap-y-6  gap-x-4
              grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5

          "
      >
        {products?.map((product) => (
          <div key={product.id} className=" justify-self-center">
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
    </>
  );
}

export default ProductGrid;
