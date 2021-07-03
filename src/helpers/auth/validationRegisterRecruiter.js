module.exports = {
	name : {
		isLength: {
			errorMessage: "Name length must be greater than 6",
			options: {
				min: 6,
			},
		},

	},
	email: {
		isEmail: {
			bail: true,
			errorMessage: "Email is Required",
		},
	},
	company_name: {
		isLength: {
			errorMessage: "Company length must be greater than 6",
			options: {
				min: 6,
			},
		},
	},
	position: {
		isLength: {
			errorMessage: "Position length must be greater than 3",
			options: {
				min: 3,
			},
		},
	},
	password: {
		isLength: {
			errorMessage: "Pasword length must be greater than 6",
			options: {
				min: 6,
			},
		},
	},
	phone_number: {
		isLength: {
			errorMessage: " Format Phone number is wrong, number length must be greater than 10",
			options: {
				min: 10,
			},
		},
	},
};