import { API_ENDPOINT } from ".";

export const GetAllProducts = async() => {
  //fetch
  const response = await fetch(`${API_ENDPOINT}/products` );
  const products = await response.json()
  return products;
}


export const GetProductById = async(id) => {
  //fetch
  const response = await fetch(`${API_ENDPOINT}/products/${id}` );
  const product = await response.json()
  return product;
}