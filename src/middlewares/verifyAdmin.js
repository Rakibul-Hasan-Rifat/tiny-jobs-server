const verifyAdmin = (req, res, next) => {
    console.log('from verify admin');
    next();
};

export default verifyAdmin;