const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
	let token;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		try {
			token = req.headers.authorization.split(" ")[1];

			const decode = jwt.verify(token, process.env.JWT_SECRET);
			// console.log("decode: ", decode);

			req.user = await User.findById(decode.id).select("-password");
			// console.log("user: ", req.user);
			next();
		} catch (error) {
			console.log(error);
			res.status(401);
			throw new Error("Not Authorized");
		}
	}

	if (!token) {
		res.status(401);
		throw new Error("Not Authorized, No Token");
	}
});

module.exports = { protect };
