const { query } = require("./x-index.js");
const cartServices = require("./dbServices/cartServices.js");

const getCartId = async (req, res, next, id) => {
  var onlyNum = /^[0-9]+$/.test(id);

  if (onlyNum) {
    let cartId = Number(id);

    const getCartById = await cartServices.getCartById(cartId);
    if (getCartById) {
      req.results = getCartById;
      next();
    } else {
      let error = new Error("There was a problem retreiving the cart");
      error.status = 400;
      next(error);
    }
  } else {
    let error = new Error("ID must be a number");
    error.status = 400;
    next(error);
  }
};

const getCarts = async (req, res, next) => {
  const getAllCarts = await cartServices.getAllCarts();

  if (getAllCarts) {
    //return opb
    req.results = getAllCarts;
    next();
  } else {
    let error = new Error(
      "There was an error retrieving Carts.  Contact support"
    );
    next(error);
  }
};

const postProductToCart = async (req, res, next) => {
  const productId = req.params.productId;
  const validProduct = await cartServices.getProductDetails(productId);
  const userId = req.session.passport.user;

  if (!validProduct) {
    let error = new Error("Product id " + productId + " is not valid");
    error.status = 400;
    return next(error);
  }

  //*only returning variables when no error
  //? cart either  exists  or create it
  let customerCartId = await cartServices.customerCartExists(userId);
  if (!customerCartId) {
    const nextCartId = await cartServices.getNextCartId();
    customerCartId = await cartServices.createCustomerCart(userId, nextCartId);
  }

  //? update cart_item or create it
  let productAlreadyInCart = await cartServices.productAlreadyInCart(
    customerCartId,
    productId
  );

  if (!productAlreadyInCart) {
    const product_price = validProduct.price;
    const total = product_price;
    const quantity = 1;

    const productAdded = await cartServices.addProductToCart(
      customerCartId,
      productId,
      quantity,
      product_price,
      total
    );

    if (!productAdded) {
    }
    let error = new Error(
      "Something went wrong adding the product to the cart"
    );
    return next(error);
  } else {
    //update it
    const quantity = productAlreadyInCart.quantity + 1;
    const price = productAlreadyInCart.product_price;
    var priceNum = Number(price.replace(/[^0-9.-]+/g, ""));
    const totalCurr = Number(
      productAlreadyInCart.total.replace(/[^0-9.-]+/g, "")
    );
    const total = priceNum + totalCurr;

    const updatedCartQuantity = await cartServices.updateCartQuantity(
      customerCartId,
      productId,
      quantity,
      price,
      total
    );
    if (!updatedCartQuantity) {
    }
    let error = new Error(
      "Something went wrong updating the product quantity in the cart"
    );
    return next(error);
  }

  next();
};

const getProductsInCart = async (req, res, next) => {
  const cartId = req.results.id;

  let productsByCartId = await cartServices.productsByCartId(cartId);

  if (!productsByCartId) {
    let error = new Error(
      "There was a problem retrieving the products in the cart"
    );
    return next(error);
  }

  req.products = productsByCartId;

  next();
};

const payment = async (req, res, next) => {
  const validPersonalDetails = true;
  const validPaymentDetails = true;

  if (!validPersonalDetails || !validPaymentDetails) {
    let error = new Error("Personal or payment details are not valid");
    error.status = 400;
    return next(error);
  }

  const cartId = req.results.id;
  const getCartTotalCurr = await cartServices.getCartTotal(cartId);

  if(!getCartTotalCurr) {
    let error = new Error("There was a problem retrieving the cart total");
    error.status = 400;
    return next(error);
  }
  
  //post to payments table
  const paymentMethod = 'Visa';
  //post payment
  //get next id
  const getNextPaymentId = await cartServices.getNextPaymentId();
  const postToPayments = await cartServices.postToPayments(getNextPaymentId, cartId, getCartTotalCurr, paymentMethod)
  
  console.log('postToPayments', postToPayments)

  if(!postToPayments){
    let error = new Error("There was a problem with the payment. Please contact support");
    error.status = 400;
    return next(error);
  }
  
  //post to orders table
  //get next id
  const getNextOrderId = await cartServices.getNextOrderId();
  const paymentId  = postToPayments.id;
  const total = postToPayments.paid;
  const status = 'Paid';

  const postToOrders = await cartServices.postToOrders(getNextOrderId,paymentId, total, status);
  if(!postToOrders){
    let error = new Error("There was a problem with the payment. Please contact support");
    error.status = 400;
    return next(error);
  }

  next();

};

module.exports = {
  getCarts,
  getCartId,
  postProductToCart,
  getProductsInCart,
  payment,
};
