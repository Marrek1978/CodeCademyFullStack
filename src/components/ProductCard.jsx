import React from "react";
import { SmlButton } from "./Buttons";
import { Link } from "react-router-dom";

function ProductCard({
  category,
  id,
  name,
  description,
  imagePath,
  price,
  stock,
}) {
  return (
    <>
      <div className="card card-compact max-w-sm  shadow-xl p-0 bg-white">
        <figure>
          <img src={imagePath} alt="skis" className="" />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-redBrown font-bold">{name}!</h2>
          <p className="text-left text-zinc-500 font-bold">{description}</p>
          <div className="text-left text-xl text-brightRed font-bold">
            {price}
          </div>
          <div className="card-actions justify-end">
            <Link to={`/products/${id}`}>
              <SmlButton text="view" link="id" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductCard;
