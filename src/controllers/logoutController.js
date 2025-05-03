const logoutController = (req, res) => {
    res.clearCookie("token");
    res.send({success: true, operationType: 'logout'})
}

export default logoutController;