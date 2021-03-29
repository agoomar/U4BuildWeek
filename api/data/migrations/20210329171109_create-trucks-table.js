exports.up = function (knex) {
	return knex.schema.createTable('trucks', (tbl) => {
		tbl.increments();
		tbl.string('name', 256).notNullable();
		tbl.string('imageOfTruck', 256).notNullable();
		tbl.string('cuisineType', 128).notNullable();
		tbl.string('currentLocation', 256).notNullable();
		tbl
			.bigInteger('departureTime')
			.unsigned()
			.notNullable()
			.defaultTo(new Date().getTime());
		tbl
			.integer('operatorId')
			.unsigned()
			.notNullable()
			.references('operators.id')
			.onDelete('CASCADE')
			.onUpdate('CASCADE');
	});
};

exports.down = function (knex) {
	return knex.schema.dropTableIfExists('trucks');
};
