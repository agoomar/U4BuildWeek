const bcrypt = require('bcryptjs');
const password = bcrypt.hashSync('password', 8);

exports.seed = function (knex) {
	return knex('users').insert([
		{
			userId: 101,
			username: 'diner1',
			password,
			email: 'diner1@gmail.com',
			type: 'diner',
		},
		{
			userId: 102,
			username: 'diner2',
			password,
			email: 'diner2@gmail.com',
			type: 'diner',
		},
		{
			userId: 103,
			username: 'operator1',
			password,
			email: 'operator1@gmail.com',
			type: 'operator',
		},
		{
			userId: 104,
			username: 'operator2',
			password,
			email: 'operator2@gmail.com',
			type: 'operator',
		},
	]);
};
