const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");

// Generate JWT
const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// @desc Register New User
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;

	// Empty Checking
	if (!name || !email || !password) {
		res.status(400);
		throw new Error("Please Add All Fields");
	}

	// User Exist Checking
	const userExists = await User.findOne({ email });

	if (userExists) {
		res.status(400);
		throw new Error("User Already Exists");
	}

	const salt = await bcrypt.genSalt(10);
	const hashedPassweord = await bcrypt.hash(password, salt);

	const user = await User.create({ name, email, password: hashedPassweord });

	if (user) {
		res.status(201).json({
			_id: user.id,
			name: user.name,
			email: user.email,
			token: generateToken(user._id),
		});
	} else {
		res.status(400);
		throw new Error("Invalid User Data");
	}
});

// @desc Authenticate a User
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });

	if (user && (await bcrypt.compare(password, user.password))) {
		res.json({
			_id: user.id,
			name: user.name,
			email: user.email,
			token: generateToken(user._id),
		});
	} else {
		res.status(400);
		throw new Error("Invalid Credentials");
	}
});

// @desc Get User Data
// @route GET /api/users/me
// @access Private
const getMe = asyncHandler(async (req, res) => {
	/* const { _id, name, email } = await User.findById(req.user.id);

	res.status(200).json({
		id: _id,
		name,
		email,
	}); */
	// console.log("getMe: ", req.user);
	res.status(200).json(req.user);
});

module.exports = { registerUser, loginUser, getMe };
