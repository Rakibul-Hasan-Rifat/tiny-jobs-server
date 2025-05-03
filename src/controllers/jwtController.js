import jwt from "jsonwebtoken";

const jwtController = (req, res) => {
  const token = jwt.sign(req.body, process.env.SECRET_KEY);
  res
    .cookie("token", token, { secure: false })
    .send({ success: true });
};

export default jwtController;
