const jwt = require("jsonwebtoken");
const { getUserById } = require("../models/User/manager");

const authenticateUser = async (req, res, next) => {
  try {
    // Excluez la vérification du jeton JWT pour la route 'user/login'
    if (req.path === "/login" && req.method === "POST") {
      return next(); // Passez à la prochaine middleware/route sans vérification
    }

    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "abc");

    const user = await getUserById(decoded.userId);

    if (!user) {
      throw new Error();
    }

    req.user = user;
    next();
  } catch (error) {
    res
      .status(401)
      .json({ error: "Vous devez être identifié pour réaliser cette action" });
  }
};

module.exports = authenticateUser;
