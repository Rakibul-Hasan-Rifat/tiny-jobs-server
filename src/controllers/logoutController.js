const logoutController = (req, res) => {
  res.clearCookie("token", {
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
  });
  res.send({ success: true, operationType: "logout" });
};

export default logoutController;
