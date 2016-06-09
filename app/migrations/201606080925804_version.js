migration.up = function(migrator) {
    migrator.createTable({
        "columns":
        {
            "id"        :  "INTEGER PRIMARY KEY",
			"version"   :  "Text",
        }
    });
};

migration.down = function(migrator) {
    migrator.dropTable();
};
