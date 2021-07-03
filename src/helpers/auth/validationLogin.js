module.exports = {
	email: {
		isEmail: {
			bail: true,
			errorMessage: "Email is Required",
		},
	},
	password: {
		isLength: {
			errorMessage: "Pasword length must be greater than 6",
			options: {
				min: 6,
			},
		},
	}
};