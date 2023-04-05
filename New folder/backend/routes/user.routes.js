const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/User.model");
const userController = Router();
userController.post("/signup", (req, res) => {
	console.log(req.body)
	const { email, password, age } = req.body;
	bcrypt.hash(password, 5, async function (err, hash) {
		if (err) {
			res.send("Something went wrong, plz try again later");
		}
		const user = new UserModel({
			email,
			password: hash,
			age,
		});
		try {
			await user.save();
			res.send({ msg: "Signup successfull" });
		} catch (err) {
			console.log(err);
			res.send("Something went wrong, plz try again");
		}
	});
});

userController.post("/login", async (req, res) => {
	const { email, password } = req.body;
	console.log(req.body)
	const user = await UserModel.findOne({ email });
	if (!user) {
		return res.send("First Signup")
	}
	const hash = user.password;
	bcrypt.compare(password, hash, function (err, result) {
		if (err) {
			res.send("Something went wrong, plz try again later");
		}
		if (result) {
			const token = jwt.sign({ userId: user._id }, "secret");
			res.send({ message: "Login successfull", token });
		} else {
			res.send("Invalid credentials, plz signup if you haven't");
		}
	});
});

module.exports = {
	userController,
};
