// import { API_ENDPOINT } from ".";
export const API_ENDPOINT = "http://localhost:4000";
import axios from "axios";

//??????  CUSTOMERS - REGISTER, LOGIN, AUTH, LOGOUT,  ??????????

export async function loginUserAxios(username, password) {
  try {
    const response = await axios({
      method: "POST",
      data: { username: username, password: password },
      withCredentials: true,
      url: `${API_ENDPOINT}/login`,
    });

    return response;
  } catch (e) {
    return { error: e };
  }
}

export async function getCustomerProfileAxios(customerId) {
  try {
    const response = await axios({
      method: "POST",
      data: {
        customerId: customerId,
      },
      withCredentials: true,
      url: `http://localhost:4000/customer/${customerId}`,
    });

    return response;
  } catch (e) {
    return { error: e };
  }
}

export async function registerUserAxios(data) {
  try {
    const response = await axios({
      method: "POST",
      data: {
        username: data.username,
        password: data.password,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        phone: data.phone,
      },
      withCredentials: true,
      url: `${API_ENDPOINT}/register`,
    });

    return response;
  } catch (e) {
    return { error: e };
  }
}

//??????  GET PRODUCTS  ??????????

export const GetAllProductsAxios = async () => {
  try {
    const response = await axios({
      method: "GET",
      withCredentials: true,
      url: `${API_ENDPOINT}/products`,
    });

    return response;
  } catch (e) {
    return { error: e };
  }
};

export const GetProductsByCategoryAxios = async (category) => {
  try {
    const response = await axios({
      method: "GET",
      withCredentials: true,
      url: `${API_ENDPOINT}/${category}`,
    });

    return response;
  } catch (e) {
    return { error: e };
  }
};

export const GetProductByIdAxios = async (id) => {
  try {
    const response = await axios({
      method: "GET",
      withCredentials: true,
      url: `${API_ENDPOINT}/products/${id}`,
    });

    return response;
  } catch (e) {
    return { error: e };
  }
};

//??????  CARTS ??????????


export const addToCartAxios = async(userID, productID, price) => {
  try {
    const response = await axios({
      method: "POST",
      data: {
        userID: userID,
        productID: productID,
        price: price
      },
      withCredentials: true,
      url: `${API_ENDPOINT}/cart/add`,
    });

    return response;
  } catch (e) {
    console.log( "error in addToCartAxios", e)
    return { error: e };
  }
}
//??????  CHECKOUT  ??????????

// export const GetAllProducts = async () => {
//   //fetch
//   const response = await fetch(`${API_ENDPOINT}/products`);
//   const products = await response.json();
//   return products;
// };

export const GetProductById = async (id) => {
  //fetch
  const response = await fetch(`${API_ENDPOINT}/products/${id}`);
  const product = await response.json();
  return product;
};

export const RegisterUser = async (user) => {
  console.log("in api.js RegUser user and the user is ", user);

  const response = await fetch(`${API_ENDPOINT}/register`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  const newUser = await response.json();
  return newUser;
};

export const loginUser = async (credentials) => {
  console.log(" in loginUser api f", credentials);

  const response = await fetch(`${API_ENDPOINT}/login`, {
    method: "POST",
    // mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  const loggedIn = await response.json();
  console.log(" logged in", loggedIn);
  return loggedIn;
};

export const GetCustomerById = async (id) => {
  console.log("in get customer by id and the id is ", id);
  const response = await fetch(`${API_ENDPOINT}/customer/${id}`);
  const customer = await response.json();
  console.log("in get customer by id and the customer is ", customer);
  return customer;
};

export const gitAuth = async () => {
  window.location.assign(
    "https://github.com/login/oauth/authorize?client_id=fc259b8c6f0823eee759"
  );
  console.log("response from git auth is ", response.json());
};
