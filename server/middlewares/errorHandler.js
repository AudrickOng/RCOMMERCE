const errHandler = (err, req, res, next) => {
  const { message, status, type, error } = err;
  if (message && status) {
    res.status(status).json({ message });
  } else {
    switch (true) {
      case error && error.name == "ValidationError":
        const errors = [];
        for (let key in error.errors) {
          errors.push(
            `${key[0].toUpperCase() + key.slice(1)} has already been taken`
          );
        }
        res.status(400).json({ errors });
        break;
      case error && error.name == "CastError":
        res.status(404).json({ message: "Current product does not exist" });
        break;
      case type == "register":
        res.status(500).json({ message: `Failed to register new customer` });
        break;
      case type == "login":
        res.status(500).json({ message: `Failed to login` });
        break;
      case type == "refresh":
        res.status(500).json({ message: "Failed to find current user" });
        break;
      case type == "JSONWEBTOKEN":
        res.status(400).json({ message: "Failed to verify token" });
        break;
      case type == "unauthenticated":
        res.status(400).json({ message: "User does not exist" });
        break;
      case type == "unauthorized":
        res.status(400).json({ message: "User has read-only access" });
        break;
      case type == "missing token":
        res.status(400).json({ message: "Invalid token input" });
        break;
      case type == "create":
        res.status(500).json({ message: "Failed to add new product" });
        break;
      case type == "missing id":
        res.status(400).json({ message: "Product ID must not be empty" });
        break;
      default:
        res.status(500).json({ message: "Internal Server Error" });
        break;
    }
  }
};

module.exports = errHandler;
