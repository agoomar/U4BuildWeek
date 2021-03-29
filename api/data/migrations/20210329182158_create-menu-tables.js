exports.up = function (knex) {
	return knex.schema
		.createTable('menus', (tbl) => {
			tbl.increments();
			tbl
				.integer('truckId')
				.unique()
				.unsigned()
				.notNullable()
				.references('trucks.id')
				.onDelete('CASCADE')
				.onUpdate('CASCADE');
		})
		.createTable('menuItems', (tbl) => {
			tbl.increments();
			tbl
				.integer('menuId')
				.unsigned()
				.notNullable()
				.references('menus.id')
				.onDelete('CASCADE')
				.onUpdate('CASCADE');
			tbl.string('itemName', 256).notNullable();
			tbl.string('itemDescription', 256).notNullable();
			tbl.integer('itemPrice').unsigned().notNullable();
		})
		.createTable('itemPhotos', (tbl) => {
			tbl.increments();
			tbl
				.integer('menuItemId')
				.unsigned()
				.notNullable()
				.references('menuItems.id')
				.onDelete('CASCADE')
				.onUpdate('CASCADE');
			tbl.string('url', 256).unique().notNullable();
		});
};

exports.down = function (knex) {
	return knex.schema
		.dropTableIfExists('itemPhotos')
		.dropTableIfExists('menuItems')
		.dropTableIfExists('menus');
};
