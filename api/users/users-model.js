const db = require('../data/db-config');

async function add(user, userType) {
	// eslint-disable-next-line no-useless-catch
	try {
		const [id] = await db('users').insert(
			{
				username: user.username,
				password: user.password,
				email: user.email,
				type: userType,
			},
			'id'
		);

		if (userType === 'diner') {
			await db('diners').insert({ userId: id });
		} else {
			await db('operators').insert({ userId: id });
		}

		return id;
	} catch (error) {
		throw error;
	}
}

function findBy(filter) {
	return db('users').where(filter).orderBy('id');
}

function find() {
	return db('users');
}

function findById(id) {
	return db('users').where({ id }).first();
}

module.exports = {
	add,
	find,
	findBy,
	findById,
};
