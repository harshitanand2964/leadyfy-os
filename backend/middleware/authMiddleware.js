const jwt = require("jsonwebtoken");

exports.protect = (req, res, next) => {
	const header = req.headers.authorization;

	if (!header || !header.startsWith("Bearer ")) {
		return res.status(401).json({ message: "Not authorized" });
	}

	try {
		req.user = jwt.verify(header.split(" ")[1], process.env.JWT_SECRET);
		next();
	} catch {
		res.status(401).json({ message: "Invalid token" });
	}
};

exports.authorize = (...roles) => (req, res, next) =>
	roles.includes(req.user.role)
		? next()
		: res.status(403).json({ message: "Forbidden" });
