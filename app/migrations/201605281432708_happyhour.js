migration.up = function(migrator) {
    migrator.createTable({
        "columns":
        {
            "id"				:  "INTEGER PRIMARY KEY",
			"id_etablishment"	:  "INTEGER",
			"day"				:  "INTEGER",
			"text"				:  "Text",
			"hours"			    :  "INTEGER"
        }
    });
};

migration.down = function(migrator) {
    migrator.dropTable();
};
