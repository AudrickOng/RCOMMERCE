const verifyRegisterValidity = user => {
  const { username, email, password } = user;
  let valid = true;
  let message = "Valid to register";
  switch (true) {
    case !username:
      valid = false;
      message = "Username cannot be blank";
      break;
    case !email:
      valid = false;
      message = "Email cannot be blank";
      break;
    case !password:
      valid = false;
      message = "Password cannot be blank";
      break;
    default:
      break;
  }
  return {
    valid,
    message
  };
};

const verifyLoginValidity = user => {
  const { email, password } = user;
  let valid = true;
  let message = "Valid to login";
  switch (true) {
    case !email:
      valid = false;
      message = "Email cannot be blank";
      break;
    case !password:
      valid = false;
      message = "Password cannot be blank";
      break;
    default:
      break;
  }
  return {
    valid,
    message
  };
};

module.exports = { verifyLoginValidity, verifyRegisterValidity };
