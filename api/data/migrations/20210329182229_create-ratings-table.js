exports.up = function (knex) {
	return knex.schema
		.createTable('truckRatings', (tbl) => {
			tbl.integer('customerRating').notNullable();
			tbl
				.integer('truckId')
				.unsigned()
				.notNullable()
				.references('trucks.id')
				.onDelete('CASCADE')
				.onUpdate('CASCADE');
			tbl
				.integer('dinerId')
				.unsigned()
				.notNullable()
				.references('diners.id')
				.onDelete('CASCADE')
				.onUpdate('CASCADE');
			tbl.primary(['truckId', 'dinerId']);
		})
		.createTable('menuItemRatings', (tbl) => {
			tbl.integer('customerRating').notNullable();
			tbl
				.integer('menuItemId')
				.unsigned()
				.notNullable()
				.references('menuItems.id')
				.onDelete('CASCADE')
				.onUpdate('CASCADE');
			tbl
				.integer('dinerId')
				.unsigned()
				.notNullable()
				.references('diners.id')
				.onDelete('CASCADE')
				.onUpdate('CASCADE');
			tbl.primary(['menuItemId', 'dinerId']);
		});
};

exports.down = function (knex) {
	return knex.schema
		.dropTableIfExists('menuItemRatings')
		.dropTableIfExists('truckRatings');
};
