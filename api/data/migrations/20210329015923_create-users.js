exports.up = function (knex) {
	return knex.schema.createTable('users', (tbl) => {
		tbl.increments('userId');
		tbl.string('username', 128).notNullable().unique().index();
		tbl.string('password', 256).notNullable();
		tbl.string('email', 256).notNullable();
		tbl.string('type', 128).notNullable();
	});
};

exports.down = function (knex) {
	return knex.schema.dropTableIfExists('users');
};
