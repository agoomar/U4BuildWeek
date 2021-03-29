exports.up = function (knex) {
	return knex.schema
		.createTable('diners', (tbl) => {
			tbl.increments();
			tbl
				.integer('userId')
				.unique()
				.unsigned()
				.notNullable()
				.references('userId')
				.inTable('users')
				.onDelete('CASCADE')
				.onUpdate('CASCADE');
			tbl
				.string('currentLocation', 256)
				.notNullable()
				.defaultTo('41.881832, -87.623177');
		})
		.createTable('operators', (tbl) => {
			tbl.increments();
			tbl
				.integer('userId')
				.unique()
				.unsigned()
				.notNullable()
				.references('userId')
				.inTable('users')
				.onDelete('CASCADE')
				.onUpdate('CASCADE');
		});
};

exports.down = function (knex) {
	return knex.schema.dropTableIfExists('operators').dropTableIfExists('diners');
};
