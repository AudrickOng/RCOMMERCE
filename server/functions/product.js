const verifyCreateValidity = product => {
  const { name, image_url, price, stock } = product;
  let valid = true;
  let message = "Valid to create new product";
  switch (true) {
    case !name:
      valid = false;
      message = "Name must not be blank";
      break;
    case !image_url:
      valid = false;
      message = "Image URL must not be blank";
      break;
    case !price:
      valid = false;
      message = "Price must be greater than 0";
      break;
    case !stock:
      valid = false;
      message = "Stock must be greater than 0";
      break;
    default:
      break;
  }
  return { valid, message };
};

module.exports = { verifyCreateValidity };
