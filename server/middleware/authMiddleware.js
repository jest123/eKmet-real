const jwt = require('jsonwebtoken');
function verifyToken(req, res, next) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).redirect("http://localhost:5173/");
    try {
        const decoded = jwt.verify(token, 'your-secret-key');
        req.KMGMID = decoded.KMGMID;
        next();
    } catch (error) {
        res.status(401).redirect("http://localhost:5173/");
    }
}
module.exports = verifyToken;