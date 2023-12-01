const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

userSchema = mongoose.Schema({
	username: { type: String, required: true, unique: true, minLength: 3 },
	name: String,
	passwordHash: { type: String, required: true },
	blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: "blog" }],
});
userSchema.plugin(uniqueValidator);

userSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id;
		delete returnedObject._id;
		delete returnedObject.__v;
		delete returnedObject.passwordHash;
	},
});

const User = mongoose.model("User", userSchema);

module.exports = User;
