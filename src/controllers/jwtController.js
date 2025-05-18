import jwt from "jsonwebtoken";

const jwtController = (req, res) => {
  const token = jwt.sign(req.body, process.env.SECRET_KEY);
  console.log({ tokenFromJwt: token });
  res
    .cookie("token", token, {
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    })
    .send({ success: true });
};

export default jwtController;
