migration.up = function(migrator) {
    migrator.createTable({
        "columns":
        {
            "id"			:  "INTEGER PRIMARY KEY",
			"name"			:  "Text",
			"adress"		:  "Text",
			"gps"			:  "Text",
			"yelp_id"		:  "Text",
			"city"			:  "Text",
			"haveHappy"		:  "Text",
			"now"			:  "Text"
        }
    });
};

migration.down = function(migrator) {
    migrator.dropTable();
};
