import { API_ENDPOINT } from ".";

export const GetAllProducts = async () => {
  //fetch
  const response = await fetch(`${API_ENDPOINT}/products`);
  const products = await response.json();
  return products;
};

export const GetProductById = async (id) => {
  //fetch
  const response = await fetch(`${API_ENDPOINT}/products/${id}`);
  const product = await response.json();
  return product;
};

export const RegisterUser = async (user) => {
  console.log("in register user and the user is ", user);

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
  console.log(" in loginUser", credentials);

  const response = await fetch(`${API_ENDPOINT}/login`, {
    method: "POST",
    mode: "cors",
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
  const response = await fetch(`${API_ENDPOINT}/customer/${id}`);
  const customer = await response.json();
  return customer;
};

export const gitAuth = async () => {
  // const response = await fetch(`${API_ENDPOINT}/auth/github`);
  // const response = await fetch(`${API_ENDPOINT}/auth/github`);
  window.location.assign("https://github.com/login/oauth/authorize?client_id=fc259b8c6f0823eee759")
  // const response = await fetch(`https://github.com/login/oauth/authorize?client_id=fc259b8c6f0823eee759`)
  console.log('response from git auth is ', response.json());
  // const customer = await response.json();
  // return customer;
}
