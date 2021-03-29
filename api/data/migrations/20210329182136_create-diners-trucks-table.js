exports.up = function (knex) {
	return knex.schema.createTable('diners_trucks', (tbl) => {
		tbl
			.integer('dinerId')
			.unsigned()
			.notNullable()
			.references('diners.id')
			.onDelete('CASCADE')
			.onUpdate('CASCADE');
		tbl
			.integer('truckId')
			.unsigned()
			.notNullable()
			.references('trucks.id')
			.onDelete('CASCADE')
			.onUpdate('CASCADE');
		tbl.primary(['dinerId', 'truckId']);
	});
};

exports.down = function (knex) {
	return knex.schema.dropTableIfExists('diners_trucks');
};
